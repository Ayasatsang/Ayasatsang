import { useEffect, useState } from "react";
import Lottie from "lottie-react";

// Fetch lottie JSON at runtime
const useLottieData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/lottie/logo.json")
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);
  return data;
};

interface PreloaderProps {
  /** short=true для переходів між сторінками (коротша тривалість) */
  short?: boolean;
  onDone: () => void;
}

const SHOW_DURATION = 2200;   // ms — початкове завантаження
const SHORT_DURATION = 900;   // ms — перехід між сторінками
const FADE_DURATION  = 400;   // ms — тривалість fade-out

const Preloader = ({ short = false, onDone }: PreloaderProps) => {
  const [fading, setFading] = useState(false);

  const animationData = useLottieData();

  useEffect(() => {
    const showMs = short ? SHORT_DURATION : SHOW_DURATION;
    const fadeTimer = setTimeout(() => setFading(true), showMs);
    const doneTimer = setTimeout(() => onDone(), showMs + FADE_DURATION);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#73BEEC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease`,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: 280, height: "auto" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
};

export default Preloader;
