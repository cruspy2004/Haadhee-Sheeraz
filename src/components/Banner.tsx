import { motion } from 'framer-motion';

const Banner = () => {
  const images = [
    '/banner_img/Generated Image November 08, 2025 - 4_51PM.png',
    '/banner_img/image (1).png',
    '/banner_img/image (2).png',
    '/banner_img/image (3).png',
    '/banner_img/image.png'
  ];

  return (
    <section className="py-12 bg-portfolio-darkgray/30 overflow-hidden w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 px-4"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-portfolio-gold mb-2">
          Projects with
        </h2>
        <p className="text-portfolio-lightgray/70">
         {/* Projects that made an impact */}
        </p>
      </motion.div>

      {/* Scrolling banner - full width, no frames */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-8 animate-scroll">
          {/* First set of images */}
          {images.map((img, idx) => (
            <div
              key={`img-1-${idx}`}
              className="flex-shrink-0 w-64 h-64 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`Brand ${idx + 1}`}
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                loading="lazy"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {images.map((img, idx) => (
            <div
              key={`img-2-${idx}`}
              className="flex-shrink-0 w-64 h-64 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`Brand ${idx + 1}`}
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
