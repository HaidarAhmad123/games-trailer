/* eslint-disable react/prop-types */
import  { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
const Motion = () => {
  return (
    <div className="bg-white min-h-screen w-screen mt-10">
      <TextParallaxContent
        imgUrl="https://www.comingsoon.net/wp-content/uploads/sites/3/2024/04/call-of-duty-modern-warfare-zombies-trailer.jpg?resize=1536,897"
        subheading="Fight"
        heading="Step Into the Action"
      >
        <ExampleContent addText="From the breathtaking visuals of open-world adventures to the heart-pounding action of competitive shooters, our trailers showcase the best of what gaming has to offer"
         text="Step into the world of gaming like never before with our exclusive collection of trailers that bring the most anticipated titles to life"/>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://i.pinimg.com/736x/6c/ca/67/6cca670d4b765ddfe25ef85468608466.jpg"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent 
        text="Experience the future of gaming today with our carefully curated selection of trailers that highlight the innovation, creativity, and passion behind every title"
        addText="Whether you're a fan of epic RPGs, fast-paced action games, or immersive storytelling, our trailers will transport you to worlds beyond your imagination"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://i0.wp.com/the-indie-in-former.com/wp-content/uploads/2023/12/windblown.jpg?w=1920&ssl=1"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent
        text="Immerse yourself in the stunning visuals and intricate details of the latest game trailers, where every scene is a masterpiece of design and creativity"
        addText="Witness the evolution of gaming through trailers that push the boundaries of technology, delivering cinematic experiences that blur the line between reality and fantasy"
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = (props) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
       {props.text}
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        {props.addText}
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
export default Motion