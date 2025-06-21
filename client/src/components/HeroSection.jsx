import React from "react";
import video1 from "../assets/video1.mp4";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={video1} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Contenu centré */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-prose text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Savourez l’excellence avec <span className="text-indigo-300">Cochef</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg/relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
            nisi. Natus, provident accusamus impedit minima harum corporis
            iusto.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#"
              className="inline-block rounded border border-indigo-300 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Voir le plat du jour
            </a>

            <a
              href="#"
              className="inline-block rounded border border-white px-5 py-3 font-medium text-white shadow-sm transition hover:bg-white hover:text-gray-900"
            >
              Commander
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
