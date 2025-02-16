import { useSpring } from '@react-spring/web';
import { useState } from 'react';

export const useMouseSpring = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const style = useSpring({
    background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(0, 140, 255, 0.5), rgba(0, 0, 0, 0.8))`,
    config: { tension: 200, friction: 50 },
  });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    setCoords({ x, y });
  };

  return {
    style,
    onMouseMove: handleMouseMove,
  };
};

export const action = (cb?: () => void) => (currenState: { userName?: string }) => {
  console.log(currenState, 'dq');
  cb?.();

  return currenState;
};
