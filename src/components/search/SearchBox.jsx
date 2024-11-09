import React, { useState, useEffect } from "react";
import BigBox from "@/components/search/responsive/BigBox";
import SmallBox from "@/components/search/responsive/SmallBox";

const SearchBox = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isSmallScreen ? <SmallBox /> : <BigBox />}</>;
};

export default SearchBox;
