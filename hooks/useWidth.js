import React, { useEffect, useState } from "react";

export default function useWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);
  return { width };
}
