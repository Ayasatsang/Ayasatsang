import { cn } from "@/lib/utils";

interface CloudProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  speed?: "slow" | "medium" | "fast";
}

const Cloud = ({ className, size = "md", speed = "medium" }: CloudProps) => {
  const sizeClasses = {
    sm: "w-24 h-12",
    md: "w-40 h-20",
    lg: "w-64 h-32",
    xl: "w-96 h-48",
  };

  const speedClasses = {
    slow: "animate-cloud-slow",
    medium: "animate-cloud-medium",
    fast: "animate-cloud-fast",
  };

  return (
    <div
      className={cn(
        "absolute opacity-90",
        sizeClasses[size],
        speedClasses[speed],
        className
      )}
    >
      <svg
        viewBox="0 0 200 100"
        className="w-full h-full drop-shadow-lg"
        fill="currentColor"
      >
        <ellipse cx="60" cy="70" rx="50" ry="30" className="text-cloud" />
        <ellipse cx="100" cy="50" rx="60" ry="40" className="text-cloud" />
        <ellipse cx="150" cy="65" rx="45" ry="28" className="text-cloud" />
        <ellipse cx="80" cy="45" rx="35" ry="25" className="text-cloud" />
        <ellipse cx="130" cy="40" rx="40" ry="30" className="text-cloud" />
      </svg>
    </div>
  );
};

export default Cloud;
