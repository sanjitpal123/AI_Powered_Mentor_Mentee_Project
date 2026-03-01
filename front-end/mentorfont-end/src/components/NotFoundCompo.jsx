import React from "react";
import video from "../assets/videos/jaaehase.mp4";
export default function NotFound({ heading, text, type, fullPage = true }) {
  return (
    <main
      className={`${
        fullPage ? "min-h-screen" : "h-auto"
      } relative bg-black flex items-center justify-center p-6 overflow-hidden rounded-2xl`}
    >
      {/* red ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-1/4 top-0 w-2/3 h-full transform blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(255,45,45,0.25), transparent 15%), radial-gradient(circle at 80% 80%, rgba(200,20,20,0.18), transparent 25%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-[5rem] md:text-[7rem] font-extrabold leading-none tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-400">
            404
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-red-300/90 mb-4">
            {heading}
          </p>
          <p className="max-w-md text-gray-300 mb-6">{text}</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-48 h-48 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-black/40 to-red-900/30 p-2 flex items-center justify-center shadow-2xl overflow-hidden">
            <video
              src={video}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
