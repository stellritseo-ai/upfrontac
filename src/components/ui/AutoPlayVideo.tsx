import React, { useEffect, useRef } from "react";

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function AutoPlayVideo({ src, className, ...props }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Force native DOM properties for iOS Safari & Android/iOS Chrome policy compliance
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5");
    video.setAttribute("x5-video-player-fullscreen", "false");

    const forcePlay = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Chrome battery saver or strict policy blocked immediate autoplay.
          // Will be picked up instantly by touch/scroll event listeners below.
        });
      }
    };

    // 2. Immediate playback attempt
    forcePlay();

    // 3. Media Event Listeners for deferred loading on Chrome Mobile
    const events = ["loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing"];
    events.forEach((evt) => video.addEventListener(evt, forcePlay, { passive: true }));

    // 4. Aggressive Interaction Fallbacks for Android/iOS Chrome Data/Battery Saver
    const handleGlobalInteraction = () => {
      forcePlay();
    };

    const interactionEvents = ["touchstart", "touchend", "touchmove", "pointerdown", "scroll", "pageshow", "visibilitychange"];
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleGlobalInteraction, { passive: true });
      document.addEventListener(evt, handleGlobalInteraction, { passive: true });
    });

    // 5. Retry on load
    video.load();

    return () => {
      events.forEach((evt) => video.removeEventListener(evt, forcePlay));
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGlobalInteraction);
        document.removeEventListener(evt, handleGlobalInteraction);
      });
    };
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
      // @ts-ignore
      x5-playsinline="true"
      preload="auto"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
