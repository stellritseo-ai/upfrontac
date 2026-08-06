import React, { useEffect, useRef } from "react";

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function AutoPlayVideo({ src, className, ...props }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force native DOM properties for iOS Safari & Android Chrome policy compliance
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const attemptPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback: Retry playback on first user touch if low-power mode blocked initial attempt
          const handleInteraction = () => {
            video.muted = true;
            video.play().catch(() => {});
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("scroll", handleInteraction);
          };
          window.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
          window.addEventListener("click", handleInteraction, { once: true, passive: true });
          window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
        });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
      video.addEventListener("canplay", attemptPlay, { once: true });
      video.load();
    }

    attemptPlay();
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      // @ts-ignore
      webkit-playsinline="true"
      preload="auto"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
