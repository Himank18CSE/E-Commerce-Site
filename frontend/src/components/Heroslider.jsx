import { useEffect, useState } from "react";

const slides = [
  {
    title: "Big Sale 🔥",
    desc: "Up to 50% off on top brands",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    title: "New Arrivals ✨",
    desc: "Fresh styles just for you",
    img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
  },
  {
    title: "Shop Smart 🛒",
    desc: "Best deals every day",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex((index + 1) % slides.length);
  };

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.desc}</p>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>
        ‹
      </button>
      <button className="arrow right" onClick={nextSlide}>
        ›
      </button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
