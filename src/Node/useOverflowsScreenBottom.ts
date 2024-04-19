import { useEffect, useRef, useState } from "react";

export const useOverflowsScreenBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  const calculateOverflows = () => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      setOverflows(bottom > window.innerHeight);
    }
  };

  useEffect(() => {
    calculateOverflows();
    window.addEventListener("resize", calculateOverflows);
    return () => {
      window.removeEventListener("resize", calculateOverflows);
    };
  }, []);

  return { ref, overflows };
};
