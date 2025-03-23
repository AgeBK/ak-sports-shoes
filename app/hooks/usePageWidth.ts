import { useEffect, useState } from "react";

export default function usePageWidth() {
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    const handleWidth = debounce(() => {
      const { innerWidth } = window;
      if (pageWidth !== innerWidth) {
        setPageWidth(innerWidth);
      }
    }, 200);
    handleWidth();

    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, [pageWidth]);

  // delay the setPageWidth calls (avoids unneccessary rerenders)
  function debounce(callBack: () => void, delay: number | undefined) {
    let timer: string | number | NodeJS.Timeout | undefined;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callBack();
      }, delay);
    };
  }

  return pageWidth;
}
