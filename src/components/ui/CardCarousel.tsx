"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type CardCarouselProps = {
  /** Pre-rendered card slides (server components are fine). */
  slides: React.ReactNode[];
  /** Dot colors for dark section backgrounds. */
  dark?: boolean;
  className?: string;
};

// Mobile swipe carousel (embla — the engine behind shadcn's Carousel).
// Keeps card sections short on small screens: one swipeable row + dots
// instead of a tall stacked column.
export default function CardCarousel({
  slides,
  dark = false,
  className = "",
}: CardCarouselProps) {
  // Embla needs to know the text direction; read it from <html dir>
  // after mount so Arabic swipes the right way.
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  useEffect(() => {
    if (document.documentElement.dir === "rtl") setDir("rtl");
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    direction: dir,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={className}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {slides.map((slide, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-[88%] px-2">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selected
                ? `w-6 ${dark ? "bg-brand-300" : "bg-brand-600"}`
                : `w-2 ${dark ? "bg-white/25" : "bg-zinc-300"}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
