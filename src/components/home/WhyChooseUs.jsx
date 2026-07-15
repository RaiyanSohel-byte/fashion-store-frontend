import React from "react";

const VALUES = [
  {
    id: "01",
    title: "Master Craftsmanship",
    description:
      "Every garment is meticulously constructed by master tailors in our European ateliers. We dedicate hundreds of hours to ensuring every seam, dart, and hem falls with absolute perfection.",
  },
  {
    id: "02",
    title: "Conscious Sourcing",
    description:
      "We partner exclusively with heritage mills in Italy and France. By sourcing the finest natural silks, organic cottons, and ethical wools, we ensure our pieces feel as exquisite as they look.",
  },
  {
    id: "03",
    title: "Timeless Silhouettes",
    description:
      "We ignore the noise of fleeting seasonal trends. Maison Valois is dedicated to architectural, minimalist designs that remain relevant and elegant for generations, forming the foundation of a modern wardrobe.",
  },
];

const BrandValues = () => {
  return (
    <section className="bg-background py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground">
                The Valois Standard
              </span>
              <h2 className="mb-6 font-serif text-4xl leading-tight tracking-[0.05em] text-foreground sm:text-5xl">
                Beyond trends.
                <br /> We craft heirlooms.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                True luxury is defined by what remains unseen: the integrity of
                the materials, the precision of the cut, and an uncompromising
                dedication to the art of tailoring.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {VALUES.map((value, index) => (
                <div
                  key={value.id}
                  className={`group relative flex flex-col items-start gap-6 py-12 transition-colors duration-500 hover:bg-muted/50 sm:flex-row sm:gap-12 sm:px-8 ${
                    index === 0 ?
                      "border-t border-border"
                    : "border-t border-border"
                  } ${index === VALUES.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="font-serif text-5xl tracking-widest text-muted-foreground/30 transition-colors duration-500 group-hover:text-foreground">
                    {value.id}
                  </span>

                  <div>
                    <h3 className="mb-4 text-xs font-medium uppercase tracking-luxury text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-loose text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
