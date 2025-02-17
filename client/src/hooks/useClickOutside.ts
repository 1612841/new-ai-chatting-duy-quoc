import { useEffect, useRef } from 'react';

export const useClickOutside = (cb?: () => void) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainButtonRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        mainButtonRef.current &&
        !mainButtonRef.current.contains(event.target as Node)
      ) {
        cb?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cb]);

  return { dropdownRef, mainButtonRef };
};
