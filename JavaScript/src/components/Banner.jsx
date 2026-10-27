import { useRef, useEffect } from "react";
import $ from "jquery";

function Banner() {
    const bannerRef = useRef(null);

    useEffect(() => {
        const $banner = $(bannerRef.current);

        $banner.hide().fadeIn(1000);

        return () => {
            $banner.stop(true, true);
        };
    }, []);

    return (
        <div ref={bannerRef} className="banner">
            <h2>Witaj w Task Manager</h2>
            <p>Zaplanuj i dodaj zadania</p>
        </div>
    );
}

export default Banner;