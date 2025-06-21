import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/events/")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des événements.");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Chargement des événements...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Erreur : {error}</p>;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-10 text-center">Événements à venir</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}
        className="max-w-5xl mx-auto"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="overflow-hidden bg-white rounded-lg shadow sm:grid sm:grid-cols-2 sm:items-center">
              <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="max-w-xl text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">{event.title}</h3>
                  <p className="mt-4 text-gray-600">{event.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString("fr-FR")}
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block rounded-sm bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition"
                    >
                      Réserver ma place
                    </a>
                  </div>
                </div>
              </div>
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
