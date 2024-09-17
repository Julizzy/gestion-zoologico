
import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <div 
      style={{ 
        backgroundImage: `url('/images/BackgroundZoo.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "150vh", 
      }}
    >
      {children}
    </div>
  );
};

export default Background;
