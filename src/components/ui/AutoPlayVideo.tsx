import React, { useEffect, useRef } from "react";

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function AutoPlayVideo({ src, className, style, ...props }: AutoPlayVideoProps) {
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

    let isIntersecting = false;

    const playVideo = () => {
      if (!video || !isIntersecting || document.visibilityState === "hidden") return;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Playback blocked until user gesture (battery saver / strict policy)
          const onFirstInteraction = () => {
            if (isIntersecting && document.visibilityState !== "hidden") {
              video.play().catch(() => {});
            }
          };
          window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
          window.addEventListener("click", onFirstInteraction, { once: true, passive: true });
        });
      }
    };

    const pauseVideo = () => {
      if (video && !video.paused) {
        video.pause();
      }
    };

    // 2. IntersectionObserver: Pause video when not in viewport to save CPU/GPU and eliminate lag
    // rootMargin: 200px begins playback just before scrolling into view for instant, seamless playback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersecting = true;
            playVideo();
          } else {
            isIntersecting = false;
            pauseVideo();
          }
        });
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0.05 }
    );

    observer.observe(video);

    // 3. Tab visibility listener: Freeze decoding when tab is switched/inactive
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pauseVideo();
      } else if (isIntersecting) {
        playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
      preload="metadata"
      aria-hidden="true"
      className={className}
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...style,
      }}
      {...props}
    >
      {src.endsWith(".mov") ? (
        <>
          <source src={src} type="video/quicktime" />
          <source src={src} type="video/mp4" />
          <source src={src} />
        </>
      ) : (
        <>
          <source src={src} type="video/mp4" />
          <source src={src} />
        </>
      )}
    </video>
  );
}
