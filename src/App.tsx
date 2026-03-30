/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Component, ErrorInfo, ReactNode, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ThreeViewer } from "./components/ThreeViewer";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const CameraIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 60 512 290" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main Body */}
    <rect x="34" y="94" width="444" height="256" rx="40" fill="black" />
    <rect x="34" y="140" width="444" height="150" fill="#4D4D4D" />
    <rect x="34" y="140" width="106" height="150" fill="#262626" />
    
    {/* Top Parts */}
    <path d="M82 60H150V94H82V60Z" fill="#1A1A1A" />
    <path d="M230 60H360V94H230V60Z" fill="#1A1A1A" />
    <rect x="231" y="68" width="114" height="22" fill="white" />
    <rect x="231" y="68" width="24" height="22" fill="#666666" />
    <rect x="321" y="68" width="24" height="22" fill="#F2994A" />
    
    {/* Lens Ring */}
    <circle cx="300" cy="200" r="110" fill="white" />
    <circle cx="300" cy="200" r="95" fill="#333333" />
    <circle cx="300" cy="200" r="70" fill="#1A1A1A" />
    <circle cx="300" cy="200" r="50" fill="#333333" />
    <circle cx="330" cy="170" r="15" fill="white" fillOpacity="0.8" />
    
    {/* Details */}
    <rect x="68" y="118" width="65" height="15" rx="2" fill="#EB5757" />
    <circle cx="435" cy="125" r="15" fill="white" />
  </svg>
);

const PAGE_CONTENT: Record<number, { 
  heading: string; 
  body: string; 
  image: string; 
  carouselImages: string[]; 
  modelId: string; 
  viewerType: 'sketchfab' | 'three';
  threeConfig?: {
    ambientIntensity?: number;
    directionalIntensity?: number;
    hemisphereLight?: boolean;
    cameraPosition?: [number, number, number];
    cameraFar?: number;
    scale?: number;
    metalness?: number;
    roughness?: number;
    autoRotateSpeed?: number;
    pointLight?: boolean;
  }
}> = {
  1: {
    heading: "Doodles, Doodles, Doodles",
    body: "I started my creative journey drawing on whatever surface I could find, whether it was physical or digital and in places I was definitely not supposed to draw.",
    image: "https://i.imgur.com/a30xFd7.png",
    carouselImages: [
      "https://i.imgur.com/b4SoWAB.jpeg",
      "https://i.imgur.com/Fb93g58.jpeg",
      "https://i.imgur.com/WCk8mvR.jpeg",
      "https://i.imgur.com/U1deTRm.jpeg"
    ],
    modelId: "https://raw.githubusercontent.com/sthappali04/Believe-And-Build/main/cartoon_notebook__pencil.glb",
    viewerType: 'three',
    threeConfig: {
      ambientIntensity: 1.0,
      directionalIntensity: 0.8,
      cameraPosition: [0, 10, 0]
    }
  },
  2: {
    heading: "Lego Architect",
    body: "I leveled up to 3D creations, using the plethora of legos in my house to build luxury homes, secret gardens, tree houses, and lemonade stands.",
    image: "https://i.imgur.com/FNmlMn0.png",
    carouselImages: [
      "https://i.imgur.com/NGaCzxe.jpeg",
      "https://i.imgur.com/EquxM1V.jpeg",
      "https://i.imgur.com/ky0URhf.jpeg",
      "https://i.imgur.com/BQeTUE8.jpeg"
    ],
    modelId: "https://raw.githubusercontent.com/sthappali04/Believe-And-Build/main/lego.glb",
    viewerType: 'three',
    threeConfig: {
      ambientIntensity: 0.5,
      scale: 0.2,
      metalness: 0.8,
      roughness: 0.2,
      autoRotateSpeed: 0.5, // Adjusted from 0.01 to be visible, but still slow
      pointLight: true
    }
  },
  3: {
    heading: "Dollhouse Remodeler",
    body: "We got a free dollhouse for my little sister who immediately exclaimed how ugly it was. I took it upon myself to do a f ull remodel, printing new wallpaper and flooring and building furniture for the house.",
    image: "https://i.imgur.com/dl7ExJ5.png",
    carouselImages: [
      "https://i.imgur.com/vzFZroE.jpeg",
      "https://i.imgur.com/7glkPBt.jpeg",
      "https://i.imgur.com/7CV7IJE.jpeg",
      "https://i.imgur.com/M7vbTRT.jpeg"
    ],
    modelId: "https://raw.githubusercontent.com/sthappali04/Believe-And-Build/main/dollhouse.glb",
    viewerType: 'three',
    threeConfig: {
      ambientIntensity: 0.5,
      hemisphereLight: true,
      cameraPosition: [10, 10, 250],
      cameraFar: 2000,
      scale: 0.05
    }
  },
  4: {
    heading: "Digital Designer",
    body: "My latest build is my portfolio website. A labor of love and late nights, I discovered not only my personal style but also the way I which I organize information digitally.",
    image: "https://i.imgur.com/6PfY3WL.png",
    carouselImages: [
      "https://i.imgur.com/Ulv3gwF.jpeg",
      "https://i.imgur.com/PHX9fmQ.jpeg",
      "https://i.imgur.com/4PGh2wx.jpeg",
      "https://i.imgur.com/GYMhPDR.jpeg"
    ],
    modelId: "https://raw.githubusercontent.com/sthappali04/Believe-And-Build/main/logo.glb",
    viewerType: 'three',
    threeConfig: {
      ambientIntensity: 1.0,
      directionalIntensity: 0.8,
      scale: 0.2
    }
  }
};

const SketchfabViewer = ({ modelId }: { modelId: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!iframeRef.current || !modelId) return;
    
    const initViewer = () => {
      // @ts-ignore
      if (!window.Sketchfab) {
        setTimeout(initViewer, 100);
        return;
      }

      setIsLoading(true);
      setError(false);

      // @ts-ignore
      const client = new window.Sketchfab(iframeRef.current);

      client.init(modelId, {
        success: (api: any) => {
          api.start();
          api.addEventListener('viewerready', () => {
            setIsLoading(false);
          });
        },
        error: () => {
          console.error('Sketchfab API error');
          setIsLoading(false);
          setError(true);
        },
        autostart: 1,
        preload: 1,
        transparent: 1,
        ui_hint: 0,
        ui_controls: 0,
        ui_infos: 0,
        ui_stop: 0,
        ui_watermark: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_vr: 0,
        ui_fullscreen: 0,
        ui_annotations: 0,
        ui_theme: 'dark',
        dnt: 1,
      });
    };

    initViewer();
  }, [modelId]);

  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold">LOADING 3D MODEL...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 p-4 text-center">
          <p className="text-xs font-bold text-red-500">FAILED TO LOAD MODEL. PLEASE REFRESH OR TRY ANOTHER PROJECT.</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src=""
        id="api-frame"
        allow="autoplay; fullscreen; vr"
        allowFullScreen
        className="w-full h-full border-0"
      ></iframe>
    </div>
  );
};

const StackedCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Deterministic "random" offsets for the pile look
  const getStagger = (index: number) => {
    const rotations = [-6, 4, -3, 5, -2, 7, -4];
    const xOffsets = [-15, 10, -8, 12, -5, 15, -10];
    const yOffsets = [8, -12, 5, -8, 10, -15, 6];
    return {
      rotate: rotations[index % rotations.length],
      x: xOffsets[index % xOffsets.length],
      y: yOffsets[index % yOffsets.length]
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      <div className="relative w-[36vw] h-[40vh] cursor-pointer" onClick={nextCard}>
        {images.map((img, index) => {
          const isCurrent = index === currentIndex;
          const offset = (index - currentIndex + images.length) % images.length;
          const stagger = getStagger(index);
          
          return (
            <motion.div
              key={index}
              className="absolute inset-0 overflow-hidden"
              initial={false}
              animate={{
                scale: isCurrent ? 1 : 0.95,
                rotate: isCurrent ? 0 : stagger.rotate,
                x: isCurrent ? 0 : stagger.x + (offset * 2),
                y: isCurrent ? 0 : stagger.y - (offset * 2),
                zIndex: images.length - offset,
                opacity: offset > 3 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <img 
                src={img} 
                alt={`Carousel ${index}`} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [selectedPic, setSelectedPic] = useState(1);

  return (
    <div className="h-screen w-full flex flex-col font-roboto select-none overflow-hidden bg-white">
      {/* Top Section - Takes up available space */}
      <div className="relative flex-[3] bg-white p-4 md:p-[3vh] flex flex-col min-h-0">
        {/* BELIEVE AND BUILD Header - Top Left */}
        <div className="self-start mb-2">
          <h1 className="text-5xl md:text-[9vw] font-normal text-white text-stroke-3 leading-none whitespace-nowrap">
            BELIEVE AND BUILD
          </h1>
        </div>

        {/* Main Content Area - Card + 3D Object */}
        <div className="flex-1 flex flex-row min-h-0">
          {/* Main Card (Folder) */}
          <motion.div 
            className="mt-4 ml-4 md:ml-[4vw] flex-shrink-0 flex flex-col min-h-0 cursor-grab active:cursor-grabbing z-[110]" 
            id="main-folder"
            drag
            dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Decorative Tab */}
            <div className="bg-black h-6 md:h-[1.5vh] w-20 md:w-[6vw] rounded-t-lg flex-shrink-0"></div>
            {/* Card Body - Adjusted dimensions for height change, text container narrowed */}
            <div className="bg-white border-[3px] border-black p-4 md:p-[2vw] w-full md:w-[42vw] md:max-w-none flex-1 rounded-tr-lg rounded-b-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-4 overflow-hidden">
              <div className="w-full max-w-[180px] md:w-[35%] flex flex-col gap-2">
                <h2 className="text-sm md:text-[1.5vw] font-bold leading-none">{PAGE_CONTENT[selectedPic].heading}</h2>
                <p className="text-xs md:text-[1.1vw] leading-tight overflow-y-auto">{PAGE_CONTENT[selectedPic].body}</p>
              </div>
              <div className="hidden md:flex flex-1 items-center justify-center min-w-0 relative">
                {PAGE_CONTENT[selectedPic].viewerType === 'three' ? (
                  <ThreeViewer 
                    key={PAGE_CONTENT[selectedPic].modelId} 
                    modelUrl={PAGE_CONTENT[selectedPic].modelId} 
                    {...PAGE_CONTENT[selectedPic].threeConfig}
                  />
                ) : (
                  <SketchfabViewer key={PAGE_CONTENT[selectedPic].modelId} modelId={PAGE_CONTENT[selectedPic].modelId} />
                )}
              </div>
            </div>
          </motion.div>
 
          {/* Carousel Space - Swapped with 3D Viewer */}
          <div className={`hidden md:block flex-1 relative min-w-0 self-center flex items-center justify-center ${selectedPic === 3 ? 'h-[50vh] max-w-[40vw] z-[200] md:translate-x-[4vw]' : 'h-[70vh] z-[100]'}`}>
            <StackedCarousel images={PAGE_CONTENT[selectedPic].carouselImages} />
          </div>
        </div>
      </div>

      {/* Ticker Section - Slightly Increased Height */}
      <div className="w-full h-[50px] md:h-[5.5vh] bg-white border-y-[3px] border-black overflow-hidden flex items-center z-30 flex-shrink-0 mt-1">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...Array(15)].map((_, i) => (
            <span 
              key={i} 
              className="text-[28px] md:text-[3.5vh] font-normal text-white text-stroke-2 px-1 tracking-tighter"
            >
              - MY CREATIVE JOURNEY
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Section - Card on Left, Pictures on Right */}
      <div className="flex-[1.5] relative bg-white flex items-end px-4 md:px-[5%] pb-0 overflow-hidden min-h-0" id="bottom-section">
        {/* Small Folder on the Left - Made taller and buttons larger */}
        <div className="mb-0 z-20 flex-shrink-0 pt-8" id="small-folder">
          {/* Decorative Tab - Consistent with top card */}
          <div className="bg-black h-5 md:h-[1.2vh] w-16 md:w-[5vw] rounded-t-md"></div>
          {/* Card Body - Increased height */}
          <div className="bg-white border-x-[3px] border-t-[3px] border-black pt-4 px-4 pb-4 w-[320px] md:w-[25vw] md:min-w-[320px] md:max-w-[400px] h-[180px] md:h-[24vh] rounded-tr-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 items-center justify-center">
            <div className="w-full h-12 md:h-[10vh] bg-white rounded overflow-hidden flex items-center justify-center">
              <img 
                src="https://i.imgur.com/XBCYFSU.png" 
                alt="Shalika" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.jp/24/000000/ffffff/600x200.png?text=SHALIKA";
                }}
              />
            </div>
            <div className="flex gap-4 justify-center w-full">
              <motion.a 
                href="https://www.shalikathappali.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                className="px-4 h-12 md:h-[5vh] border-[2px] border-black rounded-full flex items-center justify-center gap-2 font-medium transition-colors text-lg md:text-[1.3vw] no-underline text-black w-fit"
              >
                Portfolio 
                <motion.div
                  variants={{
                    hover: { rotate: -45 }
                  }}
                >
                  <ArrowRight className="w-5 h-5 md:w-[1.5vw] md:h-[1.5vw]" />
                </motion.div>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/shalika-thappali-35b275284/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                className="px-4 h-12 md:h-[5vh] border-[2px] border-black rounded-full flex items-center justify-center gap-2 font-medium transition-colors text-lg md:text-[1.3vw] no-underline text-black w-fit"
              >
                LinkedIn 
                <motion.div
                  variants={{
                    hover: { rotate: -45 }
                  }}
                >
                  <ArrowRight className="w-5 h-5 md:w-[1.5vw] md:h-[1.5vw]" />
                </motion.div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Cameras on the Right */}
        <div className="flex flex-col items-start ml-auto relative pt-0 h-full">
          {/* Click a Pic at the top of the bottom section, below the ticker */}
          <div className="mt-4 mb-auto text-2xl md:text-[2vw] font-medium flex items-center gap-2 z-20 relative">
            Click a Pic! 
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-1"
            >
              <ArrowDown className="w-6 h-6 md:w-[2vw] md:h-[2vw]" strokeWidth={2.5} />
            </motion.div>
          </div>
          
          <div className="flex gap-0.5 md:gap-[0.5vw] items-end -mb-8 md:-mb-[2vh]">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="relative group flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedPic(i)}
              >
                {/* Picture that raises up - Lowered initial position, hover to previous initial height */}
                <motion.div 
                  className="absolute bottom-[20px] w-[110px] md:w-[9vw] h-[240px] md:h-[32vh] rounded-3xl z-0"
                  animate={{ y: selectedPic === i ? 20 : 60 }}
                  whileHover={{ y: selectedPic === i ? 20 : 40 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <img 
                    src={PAGE_CONTENT[i].image} 
                    alt="Gallery" 
                    className="w-full h-full object-contain rounded-3xl"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Camera Body - Half showing */}
                <div 
                  className="relative z-10 w-[150px] md:w-[11vw]"
                >
                  <CameraIcon className="w-full h-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
