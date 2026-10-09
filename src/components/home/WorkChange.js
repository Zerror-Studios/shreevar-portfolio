        var eX = "8.14.0";
        let eQ = ["children", "as", "gl", "style", "orthographic", "camera", "debug", "scaleMultiplier", "globalRender", "globalPriority", "globalClearDepth"]
          , eG = ["children", "onError"];
        "undefined" != typeof window && (n = window.ResizeObserver || ei);
        let eK = e => {
            let {children: t, as: r=g.Hl, gl: i, style: o, orthographic: s, camera: l, debug: a, scaleMultiplier: c=eA.DEFAULT_SCALE_MULTIPLIER, globalRender: u=!0, globalPriority: h=eA.PRIORITY_GLOBAL, globalClearDepth: d=!1} = e
              , p = eO(e, eQ)
              , f = eP(e => e.globalRender);
            return ek( () => {
                "undefined" != typeof window && (window.__r3f_scroll_rig = eX);
                let e = (0,
                eo.parse)(window.location.search);
                (a || void 0 !== e.debug) && (eP.setState({
                    debug: !0
                }),
                console.info("@14islands/r3f-scroll-rig@" + eX))
            }
            , [a]),
            ek( () => {
                (0,
                m.startTransition)( () => {
                    eP.setState({
                        scaleMultiplier: c,
                        globalRender: u,
                        globalPriority: h,
                        globalClearDepth: d
                    })
                }
                )
            }
            , [c, h, u, d]),
            m.createElement(r, eT({
                id: "ScrollRig-canvas",
                camera: {
                    manual: !0
                },
                gl: eT({
                    failIfMajorPerformanceCaveat: !0
                }, i),
                resize: {
                    scroll: !1,
                    debounce: 0,
                    polyfill: n
                },
                style: eT({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100vh"
                }, o)
            }, p), !s && m.createElement(eL, eT({
                manual: !0,
                makeDefault: !0
            }, l)), s && m.createElement(eN, eT({
                manual: !0,
                makeDefault: !0
            }, l)), f && m.createElement(eY, null), "function" == typeof t ? t(m.createElement(eU, null)) : m.createElement(eU, null, t), m.createElement(ez, null))
        }
          , eJ = e => {
            let {children: t, onError: r} = e
              , n = eO(e, eG);
            return ek( () => {
                document.documentElement.classList.add("js-has-global-canvas"),
                eP.setState({
                    isCanvasAvailable: !0
                })
            }
            , []),
            m.createElement(e$, {
                onError: e => {
                    r && r(e),
                    eP.setState({
                        isCanvasAvailable: !1
                    }),
                    document.documentElement.classList.remove("js-has-global-canvas"),
                    document.documentElement.classList.add("js-global-canvas-error")
                }
            }, m.createElement(eK, eT({}, n), t), m.createElement("noscript", null, m.createElement("style", null, "\n          .ScrollRig-visibilityHidden,\n          .ScrollRig-transparentColor {\n            visibility: unset;\n            color: unset;\n          }\n          ")))
        }
          , eZ = ({scale: e}) => m.createElement("mesh", {
            scale: e
        }, m.createElement("planeGeometry", null), m.createElement("shaderMaterial", {
            args: [{
                uniforms: {
                    color: {
                        value: new el.Q1f("hotpink")
                    }
                },
                vertexShader: "\n            void main() {\n              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n            }\n          ",
                fragmentShader: "\n            uniform vec3 color;\n            uniform float opacity;\n            void main() {\n              gl_FragColor.rgba = vec4(color, .5);\n            }\n          "
            }],
            transparent: !0
        }))
          , e0 = "undefined" != typeof window;
        function e1({debounce: e=0}={}) {
            let[t,r] = (0,
            m.useState)({
                width: e0 ? window.innerWidth : 1 / 0,
                height: e0 ? window.innerHeight : 1 / 0
            });
            return (0,
            m.useEffect)( () => {
                let n, i = document.getElementById("ScrollRig-canvas");
                function o() {
                    let e = i ? i.clientWidth : window.innerWidth
                      , n = i ? i.clientHeight : window.innerHeight;
                    e === t.width && n === t.height || r({
                        width: e,
                        height: n
                    })
                }
                let s = ep.debounce(o, e)
                  , l = window.ResizeObserver || ei;
                return i ? (n = new l(s)).observe(i) : window.addEventListener("resize", s),
                o(),
                () => {
                    var e;
                    window.removeEventListener("resize", s),
                    null == (e = n) || e.disconnect()
                }
            }
            , [t, r]),
            t
        }
        let e2 = () => ({
            enabled: eP(e => e.hasSmoothScrollbar),
            scroll: eP(e => e.scroll),
            scrollTo: eP(e => e.scrollTo),
            onScroll: eP(e => e.onScroll),
            __lenis: eP(e => e.__lenis)
        })
          , e3 = ["track", "children", "margin", "inViewportMargin", "inViewportThreshold", "visible", "hideOffscreen", "scissor", "debug", "as", "priority", "scene"];
        function e5(e) {
            let {track: t, children: r, margin: n=0, inViewportMargin: i, inViewportThreshold: o, visible: s=!0, hideOffscreen: l=!0, scissor: a=!1, debug: c=!1, as: u="scene", priority: h=eA.PRIORITY_SCISSORS, scene: d} = e
              , p = eO(e, e3)
              , f = (0,
            v.C)(e => e.scene)
              , g = (0,
            m.useRef)()
              , [b] = (0,
            m.useState)(d || (a ? new el.Z58 : null))
              , {requestRender: y, renderScissor: w} = eq()
              , S = eP(e => e.globalRender)
              , {bounds: E, scale: x, position: j, scrollState: C, inViewport: R} = function(e, t) {
                let r = e1()
                  , {scroll: n, onScroll: i} = e2()
                  , o = eP(e => e.scaleMultiplier)
                  , s = eP(e => e.pageReflow)
                  , l = eP(e => e.debug)
                  , {rootMargin: a, threshold: c, autoUpdate: u, wrapper: h} = (0,
                m.useMemo)( () => {
                    let e = {
                        rootMargin: "0%",
                        threshold: 0,
                        autoUpdate: !0
                    }
                      , r = t || {};
                    return Object.keys(r).map( (t, n) => {
                        void 0 !== r[t] && (e[t] = r[t])
                    }
                    ),
                    e
                }
                , [t])
                  , {ref: d, inView: p} = function({threshold: e, delay: t, trackVisibility: r, rootMargin: n, root: i, triggerOnce: o, skip: s, initialInView: l, fallbackInView: a, onChange: c}={}) {
                    var u;
                    let[h,d] = m.useState(null)
                      , p = m.useRef(c)
                      , [f,v] = m.useState({
                        inView: !!l,
                        entry: void 0
                    });
                    p.current = c,
                    m.useEffect( () => {
                        let l;
                        if (!s && h)
                            return l = function(e, t, r={}, n=ed) {
                                if (void 0 === window.IntersectionObserver && void 0 !== n) {
                                    let i = e.getBoundingClientRect();
                                    return t(n, {
                                        isIntersecting: n,
                                        target: e,
                                        intersectionRatio: "number" == typeof r.threshold ? r.threshold : 0,
                                        time: 0,
                                        boundingClientRect: i,
                                        intersectionRect: i,
                                        rootBounds: i
                                    }),
                                    () => {}
                                }
                                let {id: i, observer: o, elements: s} = function(e) {
                                    let t = Object.keys(e).sort().filter(t => void 0 !== e[t]).map(t => {
                                        var r;
                                        return `${t}_${"root" === t ? !(r = e.root) ? "0" : (eu.has(r) || (eh += 1,
                                        eu.set(r, eh.toString())),
                                        eu.get(r)) : e[t]}`
                                    }
                                    ).toString()
                                      , r = ec.get(t);
                                    if (!r) {
                                        let n, i = new Map, o = new IntersectionObserver(t => {
                                            t.forEach(t => {
                                                var r;
                                                let o = t.isIntersecting && n.some(e => t.intersectionRatio >= e);
                                                e.trackVisibility && void 0 === t.isVisible && (t.isVisible = o),
                                                null == (r = i.get(t.target)) || r.forEach(e => {
                                                    e(o, t)
                                                }
                                                )
                                            }
                                            )
                                        }
                                        ,e);
                                        n = o.thresholds || (Array.isArray(e.threshold) ? e.threshold : [e.threshold || 0]),
                                        r = {
                                            id: t,
                                            observer: o,
                                            elements: i
                                        },
                                        ec.set(t, r)
                                    }
                                    return r
                                }(r)
                                  , l = s.get(e) || [];
                                return s.has(e) || s.set(e, l),
                                l.push(t),
                                o.observe(e),
                                function() {
                                    l.splice(l.indexOf(t), 1),
                                    0 === l.length && (s.delete(e),
                                    o.unobserve(e)),
                                    0 === s.size && (o.disconnect(),
                                    ec.delete(i))
                                }
                            }(h, (e, t) => {
                                v({
                                    inView: e,
                                    entry: t
                                }),
                                p.current && p.current(e, t),
                                t.isIntersecting && o && l && (l(),
                                l = void 0)
                            }
                            , {
                                root: i,
                                rootMargin: n,
                                threshold: e,
                                trackVisibility: r,
                                delay: t
                            }, a),
                            () => {
                                l && l()
                            }
                    }
                    , [Array.isArray(e) ? e.toString() : e, h, i, n, o, s, r, a, t]);
                    let g = null == (u = f.entry) ? void 0 : u.target
                      , b = m.useRef(void 0);
                    h || !g || o || s || b.current === g || (b.current = g,
                    v({
                        inView: !!l,
                        entry: void 0
                    }));
                    let y = [d, f.inView, f.entry];
                    return y.ref = y[0],
                    y.inView = y[1],
                    y.entry = y[2],
                    y
                }({
                    rootMargin: a,
                    threshold: c
                });
                ek( () => {
                    d(e.current)
                }
                , [e, null == e ? void 0 : e.current]);
                let[f,v] = (0,
                m.useState)(ef.vec3(0, 0, 0))
                  , g = (0,
                m.useRef)({
                    inViewport: !1,
                    progress: -1,
                    visibility: -1,
                    viewport: -1
                }).current
                  , b = (0,
                m.useRef)({
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                }).current
                  , [y,w] = (0,
                m.useState)(b)
                  , S = (0,
                m.useRef)({
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                    positiveYUpBottom: 0
                }).current
                  , E = (0,
                m.useRef)(ef.vec3(0, 0, 0)).current;
                ek( () => {
                    var t;
                    let n = null == (t = e.current) ? void 0 : t.getBoundingClientRect();
                    if (!n)
                        return;
                    let i = h ? h.scrollTop : window.scrollY
                      , a = h ? h.scrollLeft : window.scrollX;
                    b.top = n.top + i,
                    b.bottom = n.bottom + i,
                    b.left = n.left + a,
                    b.right = n.right + a,
                    b.width = n.width,
                    b.height = n.height,
                    w(eT({}, b)),
                    v(ef.vec3((null == b ? void 0 : b.width) * o, (null == b ? void 0 : b.height) * o, 1)),
                    l && console.log("useTracker.getBoundingClientRect:", b, "intialScroll:", {
                        initialY: i,
                        initialX: a
                    }, "size:", r, "pageReflow:", s)
                }
                , [e, r, s, o, l]);
                let x = (0,
                m.useCallback)( ({onlyUpdateInViewport: t=!1, scroll: i}={}) => {
                    var s, l, a;
                    if (!e.current || t && !g.inViewport)
                        return;
                    let c = i || n;
                    S.top = b.top - (c.y || 0),
                    S.bottom = b.bottom - (c.y || 0),
                    S.left = b.left - (c.x || 0),
                    S.right = b.right - (c.x || 0),
                    S.width = b.width,
                    S.height = b.height,
                    S.x = S.left + .5 * b.width - .5 * r.width,
                    S.y = S.top + .5 * b.height - .5 * r.height,
                    S.positiveYUpBottom = r.height - S.bottom,
                    E.x = S.x * o,
                    E.y = -1 * S.y * o;
                    let u = "horizontal" === c.scrollDirection
                      , h = u ? "width" : "height"
                      , d = r[h] - S[u ? "left" : "top"];
                    s = r[h] + S[h],
                    g.progress = 0 + (d - 0) * 1 / (s - 0),
                    l = S[h],
                    g.visibility = 0 + (d - 0) * 1 / (l - 0),
                    a = r[h],
                    g.viewport = 0 + (d - 0) * 1 / (a - 0)
                }
                , [e, r, o, n]);
                return ek( () => {
                    g.inViewport = p,
                    x({
                        onlyUpdateInViewport: !1
                    }),
                    l && console.log("useTracker.inViewport:", p, "update()")
                }
                , [p]),
                ek( () => {
                    x({
                        onlyUpdateInViewport: !1
                    }),
                    l && console.log("useTracker.update on resize/reflow")
                }
                , [x, s]),
                (0,
                m.useEffect)( () => {
                    if (u)
                        return i(e => x({
                            onlyUpdateInViewport: !0
                        }))
                }
                , [u, x, i]),
                {
                    scale: f,
                    inViewport: p,
                    rect: y,
                    bounds: S,
                    position: E,
                    scrollState: g,
                    update: x
                }
            }(t, {
                rootMargin: i,
                threshold: o
            });
            ek( () => {
                g.current && (g.current.visible = l ? R && s : s)
            }
            , [R, l, s]),
            (0,
            m.useEffect)( () => {
                g.current && (g.current.position.y = j.y,
                g.current.position.x = j.x)
            }
            , [x, R]),
            (0,
            v.D)( ({gl: e, camera: t}) => {
                g.current && g.current.visible && (g.current.position.y = j.y,
                g.current.position.x = j.x,
                a ? w({
                    gl: e,
                    portalScene: b,
                    camera: t,
                    left: E.left - n,
                    top: E.positiveYUpBottom - n,
                    width: E.width + 2 * n,
                    height: E.height + 2 * n
                }) : y())
            }
            , S ? h : void 0);
            let T = m.createElement(u, {
                ref: g
            }, (!r || c) && x && m.createElement(eZ, {
                scale: x
            }), r && x && r(eT({
                track: t,
                margin: n,
                scene: b || f,
                scale: x,
                scrollState: C,
                inViewport: R,
                priority: h
            }, p)));
            return b ? (0,
            v.o)(T, b) : T
        }
        let e4 = ["children", "id", "dispose"]
          , e9 = (0,
        m.forwardRef)( (e, t) => {
            let {children: r, id: n, dispose: i=!0} = e
              , o = eO(e, e4);
            return r && function(e, t={}, {key: r, dispose: n=!0}={}) {
                let i = eP(e => e.updateCanvas)
                  , o = eP(e => e.renderToCanvas)
                  , s = eP(e => e.removeFromCanvas)
                  , l = (0,
                m.useMemo)( () => r || el.cj9.generateUUID(), []);
                ek( () => {
                    o(l, e, eT({}, t, {
                        inactive: !1
                    }))
                }
                , [l]),
                (0,
                m.useEffect)( () => () => {
                    s(l, n)
                }
                , [l]);
                let a = (0,
                m.useCallback)(e => {
                    i(l, e)
                }
                , [i, l]);
                (0,
                m.useEffect)( () => {
                    a(t)
                }
                , [...Object.values(t)])
            }(r, eT({}, o, {
                id: n,
                ref: t
            }), {
                key: n,
                dispose: i
            }),
            null
        }
        )