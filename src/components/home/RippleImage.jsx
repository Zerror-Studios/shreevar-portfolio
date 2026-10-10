"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ==========================================
// 1. Water simulation shaders (Ping-Pong FBO)
// Extracted from fromanother.love featured work
// ==========================================
const simVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const simFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uDissipation;
  uniform float uBrushRadius;
  uniform float uVelocity;
  varying vec2 vUv;

  void main() {
    vec2 texelSize = vec2(1.0 / 64.0);
    vec2 current = texture2D(uTexture, vUv).xy;

    float left   = texture2D(uTexture, vUv + vec2(-texelSize.x, 0.0)).r;
    float right  = texture2D(uTexture, vUv + vec2(texelSize.x, 0.0)).r;
    float top    = texture2D(uTexture, vUv + vec2(0.0, -texelSize.y)).r;
    float bottom = texture2D(uTexture, vUv + vec2(0.0, texelSize.y)).r;

    float average = (left + right + top + bottom) * 0.25;
    current.y += (average - current.r) * 0.5;
    current.y *= uDissipation;
    current.r += current.y;

    float distMouse = distance(vUv, uMouse);
    float brushMouse = smoothstep(uBrushRadius, 0.0, distMouse);
    current.r += brushMouse * uVelocity;

    current.r *= 0.98;
    current.y *= 0.98;

    gl_FragColor = vec4(clamp(current.r, -5.0, 5.0), clamp(current.y, -5.0, 5.0), 0.0, 1.0);
  }
`;

// ==========================================
// 2. Main mesh shaders (3D Ripple & Liquid)
// Extracted from fromanother.love featured work
// ==========================================
const mainVertexShader = /* glsl */ `
  uniform sampler2D uDisplacementMap;
  uniform float uVertexStrength;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 center = vec2(0.5);

    float mouseDisp = texture2D(uDisplacementMap, uv).r;
    pos.z += mouseDisp * uVertexStrength;

    if (uProgress > 0.001 && uProgress < 0.999) {
      float dist = distance(uv, center);
      float waveProgress = smoothstep(0.0, 1.0, uProgress);
      float rippleRadius = waveProgress;
      float rippleThickness = 0.15;
      float wave = smoothstep(rippleRadius, rippleRadius - rippleThickness, dist) *
                   smoothstep(rippleRadius - rippleThickness * 2.0, rippleRadius - rippleThickness, dist);
      float waveIntensity = smoothstep(0.0, 0.2, uProgress) * smoothstep(1.0, 0.6, uProgress);
      pos.z += wave * uVertexStrength * 1.5 * waveIntensity;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const mainFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform sampler2D uTextureNext;
  uniform sampler2D uDisplacementMap;
  uniform float uDistortionStrength;
  uniform float uProgress;
  uniform float uOpacity;
  uniform vec2 uMeshSize;
  uniform vec2 uImageSize;
  varying vec2 vUv;

  vec2 backgroundCoverUv(vec2 meshSize, vec2 imageSize, vec2 uv) {
    if (imageSize.x <= 0.0 || imageSize.y <= 0.0 || meshSize.x <= 0.0 || meshSize.y <= 0.0) return uv;
    float meshRatio = meshSize.x / meshSize.y;
    float imageRatio = imageSize.x / imageSize.y;
    if (meshRatio > imageRatio) {
      return vec2(uv.x, (uv.y - 0.5) * (imageRatio / meshRatio) + 0.5);
    } else {
      return vec2((uv.x - 0.5) * (meshRatio / imageRatio) + 0.5, uv.y);
    }
  }

  void main() {
    vec2 uv = vUv;
    vec2 texUv = backgroundCoverUv(uMeshSize, uImageSize, uv);
    vec2 center = vec2(0.5);
    float dist = distance(uv, center);

    vec2 texelSize = vec2(1.0 / 64.0);
    float hL = texture2D(uDisplacementMap, uv - vec2(texelSize.x, 0.0)).r;
    float hR = texture2D(uDisplacementMap, uv + vec2(texelSize.x, 0.0)).r;
    float hT = texture2D(uDisplacementMap, uv - vec2(0.0, texelSize.y)).r;
    float hB = texture2D(uDisplacementMap, uv + vec2(0.0, texelSize.y)).r;
    vec2 mouseNormalOffset = vec2(hL - hR, hT - hB);

    float waveProgress = smoothstep(0.0, 1.0, uProgress);
    float rippleRadius = waveProgress;
    float waveIntensity = smoothstep(0.0, 0.2, uProgress) * smoothstep(1.0, 0.6, uProgress);

    float wavePattern = sin((dist - rippleRadius) * 8.0) * waveIntensity * 0.15;
    vec2 waveDir = uv - center;
    float waveLen = length(waveDir);
    vec2 waveNormalOffset = (waveLen > 0.0001 ? waveDir / waveLen : vec2(0.0)) * wavePattern;

    vec2 distortion = (mouseNormalOffset + waveNormalOffset) * uDistortionStrength;

    float rippleThickness = 0.15;
    float mask = smoothstep(rippleRadius - rippleThickness, rippleRadius, dist);

    float maskWave = sin((dist - rippleRadius) * 6.0) * 0.5 + 0.5;
    mask = mix(mask, mask * (1.0 - maskWave * 0.35), waveIntensity);
    mask = clamp(mask, 0.0, 1.0);

    vec4 tex1 = texture2D(uTexture, texUv + distortion);
    vec4 tex2 = texture2D(uTextureNext, texUv + distortion);

    vec4 finalColor = mix(tex2, tex1, mask);

    vec2 totalNormal = mouseNormalOffset + waveNormalOffset;
    finalColor.rgb *= clamp(1.0 - length(totalNormal) * 0.6, 0.6, 1.0);
    finalColor.rgb += vec3(0.0) * 0.7 * waveIntensity;
    finalColor.rgb += vec3(0.0) * 0.2;

    finalColor.a *= uOpacity;

    gl_FragColor = finalColor;
  }
`;

const LiquidTransitionMesh = ({ currentImageIndex, images }) => {
  const textures = useTexture(images);
  const { gl, size, viewport } = useThree();

  const meshRef = useRef();
  const mainMaterialRef = useRef();
  const simMaterialRef = useRef();

  // FBO Ping-Pong setup (64x64 resolution, HalfFloatType / LinearFilter)
  const renderTargets = useMemo(() => {
    const options = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    };
    return {
      targetA: new THREE.WebGLRenderTarget(64, 64, options),
      targetB: new THREE.WebGLRenderTarget(64, 64, options),
    };
  }, []);

  const currentTargetRef = useRef(renderTargets.targetA);

  // Simulation Scene and Orthographic Camera
  const { simScene, simCamera } = useMemo(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      vertexShader: simVertexShader,
      fragmentShader: simFragmentShader,
      uniforms: {
        uTexture: { value: null },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uDissipation: { value: 0.97 },
        uBrushRadius: { value: 0.04 },
        uVelocity: { value: 0 },
      },
    });
    simMaterialRef.current = mat;
    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);
    return { simScene: scene, simCamera: camera };
  }, []);

  // Main Material Uniforms (stable reference, never re-created)
  const mainUniforms = useMemo(() => ({
    uTexture: { value: null },
    uTextureNext: { value: null },
    uDisplacementMap: { value: null },
    uDistortionStrength: { value: 0.22 },
    uProgress: { value: 0 },
    uVertexStrength: { value: 0.15 },
    uMeshSize: { value: new THREE.Vector2(size.width, size.height) },
    uImageSize: { value: new THREE.Vector2(1000, 1000) },
    uOpacity: { value: 1.0 },
  }), []);

  // Update image natural sizes
  const updateImageSize = (tex) => {
    if (mainMaterialRef.current && tex && tex.image) {
      const img = tex.image;
      mainMaterialRef.current.uniforms.uImageSize.value.set(
        img.naturalWidth || img.width || 1000,
        img.naturalHeight || img.height || 1000
      );
    }
  };

  // State & transition tracking
  const activeIdxRef = useRef(currentImageIndex);
  const nextIdxRef = useRef(currentImageIndex);
  const tweenRef = useRef(null);
  const progressObj = useRef({ value: 0 });
  const isInitializedRef = useRef(false);

  // Mouse tracking
  const mouseUV = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouseUV = useRef(new THREE.Vector2(0.5, 0.5));
  const isHovered = useRef(false);

  // Initialize once on mount with currentImageIndex
  useEffect(() => {
    if (!textures || !textures.length || !mainMaterialRef.current) return;
    if (!isInitializedRef.current) {
      const idx = Math.max(0, Math.min(currentImageIndex, textures.length - 1));
      const tex = textures[idx];
      if (tex) {
        mainMaterialRef.current.uniforms.uTexture.value = tex;
        mainMaterialRef.current.uniforms.uTextureNext.value = tex;
        mainMaterialRef.current.uniforms.uProgress.value = 0;
        updateImageSize(tex);
        activeIdxRef.current = idx;
        nextIdxRef.current = idx;
        isInitializedRef.current = true;
      }
    }
  }, [textures]);

  // Transition handler when currentImageIndex changes
  useEffect(() => {
    if (!textures || !textures.length || !mainMaterialRef.current) return;
    if (!isInitializedRef.current) return;

    const targetIdx = Math.max(0, Math.min(currentImageIndex, textures.length - 1));
    const currentIdx = activeIdxRef.current;

    if (targetIdx === currentIdx && !tweenRef.current?.isActive()) {
      return;
    }

    let fromTex = textures[currentIdx];
    if (tweenRef.current && tweenRef.current.isActive()) {
      fromTex = progressObj.current.value >= 0.5 ? textures[nextIdxRef.current] : textures[currentIdx];
      tweenRef.current.kill();
    }

    const toTex = textures[targetIdx];
    if (!fromTex || !toTex) return;

    activeIdxRef.current = targetIdx;
    nextIdxRef.current = targetIdx;

    mainMaterialRef.current.uniforms.uTexture.value = fromTex;
    mainMaterialRef.current.uniforms.uTextureNext.value = toTex;
    updateImageSize(toTex);

    // Initial disturbance in simulation FBO at center for organic wobble
    if (simMaterialRef.current) {
      simMaterialRef.current.uniforms.uMouse.value.set(0.5, 0.5);
      simMaterialRef.current.uniforms.uVelocity.value = 0.8;
    }

    progressObj.current.value = 0;

    tweenRef.current = gsap.to(progressObj.current, {
      value: 1,
      duration: 1.4,
      ease: "power3.out",
      onUpdate: () => {
        if (mainMaterialRef.current) {
          mainMaterialRef.current.uniforms.uProgress.value = progressObj.current.value;
        }
      },
      onComplete: () => {
        if (mainMaterialRef.current) {
          mainMaterialRef.current.uniforms.uTexture.value = toTex;
          mainMaterialRef.current.uniforms.uTextureNext.value = toTex;
          mainMaterialRef.current.uniforms.uProgress.value = 0;
        }
      },
    });
  }, [currentImageIndex]);

  // Cleanup tween ONLY on unmount
  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  // Update mesh size on resize
  useEffect(() => {
    if (mainMaterialRef.current) {
      mainMaterialRef.current.uniforms.uMeshSize.value.set(size.width, size.height);
    }
  }, [size]);

  // Clean up render targets on unmount
  useEffect(() => {
    const { targetA, targetB } = renderTargets;
    return () => {
      targetA.dispose();
      targetB.dispose();
    };
  }, [renderTargets]);

  // Per-frame Simulation and Ping-Pong render loop
  useFrame(({ gl, raycaster }) => {
    if (!mainMaterialRef.current || !simMaterialRef.current || !meshRef.current) return;

    // 1. Raycast mouse onto the main plane
    if (isHovered.current) {
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0 && intersects[0].uv) {
        const uv = intersects[0].uv;
        mouseUV.current.set(uv.x, uv.y);
        const dist = mouseUV.current.distanceTo(prevMouseUV.current);
        const vel = Math.min(dist * 60, 1.2);
        simMaterialRef.current.uniforms.uVelocity.value = vel;
        simMaterialRef.current.uniforms.uMouse.value.copy(mouseUV.current);
        prevMouseUV.current.copy(mouseUV.current);
      }
    } else {
      simMaterialRef.current.uniforms.uVelocity.value = 0;
    }

    // 2. FBO Ping-Pong Simulation Step
    const { targetA, targetB } = renderTargets;
    const readTarget = currentTargetRef.current === targetA ? targetA : targetB;
    const writeTarget = currentTargetRef.current === targetA ? targetB : targetA;

    simMaterialRef.current.uniforms.uTexture.value = readTarget.texture;

    const oldTarget = gl.getRenderTarget();
    gl.setRenderTarget(writeTarget);
    gl.clear();
    gl.render(simScene, simCamera);
    gl.setRenderTarget(oldTarget);

    // 3. Feed the resulting displacement map into the main mesh material
    mainMaterialRef.current.uniforms.uDisplacementMap.value = writeTarget.texture;
    currentTargetRef.current = writeTarget;
  });

  return (
    <mesh
      ref={meshRef}
    >
      {/* 64x64 subdivision grid for authentic 3D vertex wave displacement */}
      <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
      <shaderMaterial
        ref={mainMaterialRef}
        vertexShader={mainVertexShader}
        fragmentShader={mainFragmentShader}
        uniforms={mainUniforms}
        transparent={true}
      />
    </mesh>
  );
};

const RippleImage = ({ images, currentIndex }) => {
  return (
    <div className="w-full h-full relative ">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <React.Suspense fallback={null}>
          <LiquidTransitionMesh currentImageIndex={currentIndex} images={images} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default RippleImage;
