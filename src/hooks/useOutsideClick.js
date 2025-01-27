import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handlClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handlClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handlClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
