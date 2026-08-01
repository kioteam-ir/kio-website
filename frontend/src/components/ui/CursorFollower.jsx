import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      x += (mouseX - x) * 0.15;
      y += (mouseY - y) * 0.15;

      follower.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={followerRef} className="cursor-follower" />;
}
