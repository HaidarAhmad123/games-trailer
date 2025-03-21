/* eslint-disable no-unused-vars */
import  { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
function Hero() {
    gsap.registerPlugin(ScrollTrigger);
  // declare states
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  //an algorithm to repeat numbers after arrive to the end number
  //0%4 = 0 + 1=1
  //1%4=1+1=2
  //2%4=2+1=3
  //3%4=3+1=4
  //4%4=0+1=1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

//check the user if he is using mobile or desktop
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  // Function to update the state based on window size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // 768px is a common breakpoint for mobile devices
  };

  // Set the initial value
  handleResize();

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  //cleanup the event listener on component unmount
  return () => window.removeEventListener('resize', handleResize);
}, []);

  
  const getVideoSrc  = (index) => isMobile ?  `videos/hero-3.mp4` : `videos/720-hero-${index}.mp4`;

useGSAP(()=>{
if(hasClicked){
    gsap.set('#next-video',{visibility:'visible'})
    gsap.to('#next-video',{
        transformOrigin:'center center',
        scale:1,
        width:'100%',
        height:'100%',
        duration:1,
        ease:'power1.inOut',
        onStart:()=> nextVdRef.current.play()
    })
    gsap.from('.current-video',{
        transformOrigin:'center center',
        scale:0,
        duration:1.5,
        ease:'power1.inOut'
    })
}
},{dependencies:[currentIndex],revertOnUpdate:true})

useGSAP(()=>{
    gsap.set('#video-frame',{
clipPath:'polygon(14% 0%,72% 0%, 90% 90%, 0% 100%)',
borderRadius:'0 0 40% 10%'
    })
    gsap.from('#video-frame',{
        clipPath:'polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)',
        borderRadius: '0 0 0 0',
        ease:'power1.inOut',
        scrollTrigger:{
            trigger:'#video-frame',
            start:'center center',
            end:'bottom center',
            scrub:true,

        }
    })
})
useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden b">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0
             transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                src={getVideoSrc(upcomingVideoIndex)}
                ref={nextVdRef}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 
          object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-[robert-medium] text-blue-100">
              Enter the Metagame Layer <br /> Unleash the play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">
          G<b>A</b>MING
        </h1>
    </div>
  );
}

export default Hero;
