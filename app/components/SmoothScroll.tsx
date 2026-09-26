"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<any>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkIsDesktop = () => {
            const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            const isWideScreen = window.innerWidth >= 768;
            setIsDesktop(isWideScreen && !hasTouch);
        };

        checkIsDesktop();
        window.addEventListener("resize", checkIsDesktop);

        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            window.removeEventListener("resize", checkIsDesktop);
            gsap.ticker.remove(update);
        };
    }, []);

    // On touch & mobile screens, bypass Lenis entirely for 100% native 120Hz ProMotion kinetic scroll
    if (!isDesktop) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1.0,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}

