"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";



export const HeroParallax = ({
  header,
  products,
}: {
  header?: React.ReactNode;
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d"
    >
      {header}
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-7xl">
        The Ultimate <br /> development studio
      </h1>
      <p className="mt-8 max-w-2xl text-base text-slate-600 dark:text-neutral-200 md:text-xl">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  const [isLandscape, setIsLandscape] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setIsLandscape(image.naturalWidth > image.naturalHeight);
    }
  }, [product.thumbnail]);

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative w-[min(70vw,22rem)] shrink-0"
    >
      <a
        href={product.link}
        aria-label={`Open question: ${product.title}`}
        className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-950/25 transition-shadow group-hover/product:shadow-2xl group-hover/product:shadow-orange-500/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 dark:border-white/10 dark:bg-neutral-950 dark:shadow-amber-200/20 dark:group-hover/product:shadow-amber-200/35"
      >
        <div className={`relative w-full overflow-hidden bg-neutral-900 border-2 border-white/20 rounded-2xl shadow-amber-500 ${isLandscape ? "aspect-3/2" : "aspect-4/5"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-xl"
            alt=""
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            className="absolute inset-0 h-full w-full object-contain transition-[filter] duration-300 group-hover/product:blur-[2px] group-focus-within/product:blur-[2px]"
            alt={product.title}
            ref={imageRef}
            onLoad={event => {
              setIsLandscape(event.currentTarget.naturalWidth > event.currentTarget.naturalHeight);
            }}
          />
          <div className="pointer-events-none absolute inset-0 grid place-items-center p-5 opacity-0 transition-opacity duration-200 group-hover/product:opacity-100 group-focus-within/product:opacity-100">
            <h2 className="line-clamp-3 max-w-[90%] rounded-xl border border-white/30 bg-black/35 px-5 py-3 text-center text-sm font-medium leading-snug text-white shadow-xl backdrop-blur-md sm:text-base">
              {product.title}
            </h2>
          </div>
        </div>
      </a>
    </motion.div>
  );
};
