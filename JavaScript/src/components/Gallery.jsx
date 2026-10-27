import { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "./Gallery.css";

export default function Gallery() {
    const images = [
        { file: "img1.jpg", category: "natura" },
        { file: "img2.jpg", category: "budynek" },
        { file: "img3.jpg", category: "budynek" },

        { file: "img4.jpg", category: "inne" },
        { file: "img5.jpg", category: "natura" },
        { file: "img6.jpg", category: "natura" },

        { file: "img7.jpg", category: "natura" },
        { file: "img8.jpg", category: "budynek" },
        { file: "img9.jpg", category: "natura" },

        { file: "img10.jpg", category: "natura" },
        { file: "img11.jpg", category: "inne" },
        { file: "img12.jpg", category: "inne" },

        { file: "img13.jpg", category: "inne" },
        { file: "img14.jpg", category: "natura" },
        { file: "img15.jpg", category: "inne" },
    ];

    const [category, setCategory] = useState("wszystkie");
    const [selectedImage, setSelectedImage] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const imageRef = useRef(null);
    const buttonsRef = useRef(null);
    // filtr
    const filteredImages = images.filter(
        (image) =>
            category === "wszystkie" ||
            image.category === category
    );

    useEffect(() => {
        $(".gallery img").hover(
            function () {
                $(this).stop().animate({ opacity: 0.7 }, 200);
            },
            function () {
                $(this).stop().animate({ opacity: 1 }, 200);
            }
        );

        return () => {
            $(".gallery img").off("mouseenter mouseleave");
        };
    }, [category]);

    useEffect(() => {
        if (selectedImage !== null) {
            $(imageRef.current).hide().fadeIn(500);
            $(buttonsRef.current).hide().fadeIn(500);
        }
    }, [selectedImage !== null]);

    function closeGallery() {
        if (isClosing) return;

        setIsClosing(true);

        $(imageRef.current).stop().fadeOut(500);
        $(buttonsRef.current).stop().fadeOut(500, function () {
            setSelectedImage(null);
            setIsClosing(false);
        });
    }

    return (
        <div>
            <h1>Galleria</h1>
            {/* filtr opcje */}
            <select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setSelectedImage(null);
                }}
            >
                <option value="wszystkie">Wszystkie</option>
                <option value="budynek">Budynki</option>
                <option value="natura">Natura</option>
                <option value="inne">Inne</option>
            </select>
            {/* grid zdjęć*/}
            <div className="gallery">
                {filteredImages.map((image, index) => (
                    <img
                        key={image.file}
                        src={"/src/assets/gallery/" + image.file}
                        alt={`Zdjęcie ${index + 1}`}
                        onClick={() => setSelectedImage(index)}
                    />
                ))}
            </div>
            {/* ''Nowywidok'' */}
            {selectedImage !== null && (
                <div
                    className="lightbox"
                    onClick={closeGallery}
                >
                    {/* wybrany */}
                    <img
                        ref={imageRef}
                        src={
                            "/src/assets/gallery/" +
                            filteredImages[selectedImage].file
                        }
                        alt={`Zdjęcie ${selectedImage + 1}`}
                        onClick={(e) => e.stopPropagation()}
                    />
                    {/* Guziki  */}
                    <div
                        ref={buttonsRef}
                        className="lightbox-buttons"
                        style={{
                            pointerEvents: isClosing ? "none" : "auto"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() =>
                                setSelectedImage(
                                    (selectedImage + filteredImages.length - 1) %
                                    filteredImages.length
                                )
                            }
                        >
                            prev
                        </button>

                        <button onClick={closeGallery}>
                            close
                        </button>

                        <button
                            onClick={() =>
                                setSelectedImage(
                                    (selectedImage + 1) %
                                    filteredImages.length
                                )
                            }
                        >
                            next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}