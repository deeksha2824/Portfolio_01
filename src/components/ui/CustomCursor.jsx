import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [point, setPoint] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event) => setPoint({ x: event.clientX, y: event.clientY });
    const over = (event) => setActive(Boolean(event.target.closest('a,button,input,textarea')));

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed z-80 hidden rounded-full border mix-blend-difference transition-[width,height] duration-150 lg:block ${
        active ? 'h-14 w-14 border-white bg-white/10' : 'h-7 w-7 border-white/80'
      }`}
      style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
    />
  );
}
