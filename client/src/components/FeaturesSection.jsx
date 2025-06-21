import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeatureSection() {
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/feature-section/")
      .then(res => {
        if (res.data.length > 0) {
          setFeature(res.data[0]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!feature) return null;

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-blue-300 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{feature.title}</h2>
              <p className="hidden text-white/90 sm:mt-4 sm:block">{feature.description}</p>
              {feature.button_url && (
                <div className="mt-4 md:mt-8">
                  <a
                    href={feature.button_url}
                    className="inline-block rounded-sm border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white"
                  >
                    {feature.button_label}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img src={feature.image_1} alt="Illustration 1" className="h-40 w-full object-cover sm:h-56 md:h-full" />
            <img src={feature.image_2} alt="Illustration 2" className="h-40 w-full object-cover sm:h-56 md:h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
