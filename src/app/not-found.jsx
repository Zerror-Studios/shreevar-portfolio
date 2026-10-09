import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#000000] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
        <h1 className="text-8xl md:text-[12rem] leading-none tracking-tighter uppercase font-medium">
          404
        </h1>
        
        <div className="flex flex-col gap-3 items-center">
          <h2 className="text-2xl md:text-3xl uppercase tracking-widest text-white/80">
            Page Not Found
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-sm mx-auto">
            The page you are looking for doesn't exist or has been moved to another universe.
          </p>
        </div>

        <Link
          href="/" 
          className="mt-8 group flex items-center  rounded-sm   bg-black/50 backdrop-blur-md transition-colors duration-300"
        >
          <span className="relative inline-block text-sm whitespace-nowrap uppercase tracking-widest">
            BACK TO HOME
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </span>
        </Link>
      </div>
    </main>
  );
}
