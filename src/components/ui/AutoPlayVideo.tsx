import React, { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  priority?: boolean;
}

export function AutoPlayVideo({
  src,
  priority = false,
  className,
  style,
  ...props
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(priority);

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

    let isIntersecting = priority;

    const playVideo = async () => {
      if (!video || !isIntersecting || document.visibilityState === "hidden")
        return;
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        await video.play();
      } catch {
        // Autoplay policy fallback: resume on user interaction
        const onFirstInteraction = () => {
          if (isIntersecting && document.visibilityState !== "hidden") {
            video.play().catch(() => {});
          }
        };
        window.addEventListener("touchstart", onFirstInteraction, {
          once: true,
          passive: true,
        });
        window.addEventListener("click", onFirstInteraction, {
          once: true,
          passive: true,
        });
      }
    };

    const pauseVideo = () => {
      if (video && !video.paused) {
        video.pause();
      }
    };

    // 2. IntersectionObserver: Pause video when not in viewport to save CPU/GPU and eliminate lag
    // rootMargin: 150px begins playback just before scrolling into view for instant, seamless playback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersecting = true;
            setInView(true);
            playVideo();
          } else {
            isIntersecting = false;
            pauseVideo();
          }
        });
      },
      { rootMargin: "150px 0px 150px 0px", threshold: 0.01 },
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
      pauseVideo();
    };
  }, [src, priority]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      // @ts-ignore
      webkit-playsinline="true"
      // @ts-ignore
      x5-playsinline="true"
      preload={priority ? "metadata" : "none"}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      className={className}
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        contain: "paint",
        ...style,
      }}
      {...props}
    >
      {(priority || inView) && (
        <>
          <source src={src} type="video/mp4" />
          <source src={src} />
        </>
      )}
    </video>
  );
}
