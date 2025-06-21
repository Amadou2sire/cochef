import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/hero-banners/")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setBanner(data[0]);  // On prend la première bannière active
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (!banner) return <div>Aucune bannière active</div>;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {banner.media_type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={banner.media_file} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      ) : (
        <img
          src={banner.media_file}
          alt={banner.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-prose text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">{banner.title}</h1>

          <p className="mt-4 text-base sm:text-lg/relaxed">{banner.description}</p>

          <div className="mt-6 flex justify-center gap-4">
            {banner.primary_button_label && (
              <a
                href={banner.primary_button_url || "#"}
                className="inline-block rounded border border-indigo-300 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
              >
                {banner.primary_button_label}
              </a>
            )}

            {banner.secondary_button_label && (
              <a
                href={banner.secondary_button_url || "#"}
                className="inline-block rounded border border-white px-5 py-3 font-medium text-white shadow-sm transition hover:bg-white hover:text-gray-900"
              >
                {banner.secondary_button_label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
