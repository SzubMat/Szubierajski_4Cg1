import { useEffect, useRef, useState } from "react";
import $ from "jquery";

function Menu() {
    const zadaniaRef = useRef(null);
    const ustawieniaRef = useRef(null);
    const pomocRef = useRef(null);
    const menuRef = useRef(null);

    const [otwarteMenu, setOtwarteMenu] = useState(null);

    useEffect(() => {
        const $zadania = $(zadaniaRef.current);
        const $ustawienia = $(ustawieniaRef.current);
        const $pomoc = $(pomocRef.current);

        $zadania.stop(true, true);
        $ustawienia.stop(true, true);
        $pomoc.stop(true, true);

        if (otwarteMenu === "zadania") {
            $zadania.slideDown(300);
            $ustawienia.slideUp(300);
            $pomoc.slideUp(400);

        } else if (otwarteMenu === "ustawienia") {
            $zadania.slideUp(300);
            $ustawienia.slideDown(300);
            $pomoc.slideUp(400);

        } else if (otwarteMenu === "pomoc") {
            $zadania.slideUp(300);
            $ustawienia.slideUp(300);
            $pomoc.slideDown(400);

        } else {
            $zadania.slideUp(300);
            $ustawienia.slideUp(300);
            $pomoc.slideUp(400);
        }

        return () => {
            $zadania.stop(true, true);
            $ustawienia.stop(true, true);
            $pomoc.stop(true, true);
        };
    }, [otwarteMenu]);

    const przelaczMenu = (nazwa) => {
        setOtwarteMenu((poprzednie) =>
            poprzednie === nazwa ? null : nazwa
        );
    };

    useEffect(() => {
        const kliknieciePozaMenu = (e) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target)
            ) {
                setOtwarteMenu(null);
            }
        };
        document.addEventListener("pointerdown", kliknieciePozaMenu);
        return () => {
            document.removeEventListener("pointerdown", kliknieciePozaMenu);
        };
    }, []);


    return (
        <nav ref={menuRef} className="menu" aria-label="Menu główne">
            <ul>
                <li>
                    <button
                        type="button"
                        aria-expanded={otwarteMenu === "zadania"}
                        onClick={() => przelaczMenu("zadania")}
                    >
                        Zadania
                    </button>

                    <ul className="submenu" ref={zadaniaRef}>
                        <li>Wszystkie zadania</li>
                        <li>Dodaj zadanie</li>
                        <li>Statystyki</li>
                    </ul>
                </li>

                <li>
                    <button
                        type="button"
                        aria-expanded={otwarteMenu === "ustawienia"}
                        onClick={() => przelaczMenu("ustawienia")}
                    >
                        Ustawienia
                    </button>

                    <ul className="submenu" ref={ustawieniaRef}>
                        <li>Motyw aplikacji</li>
                        <li>Preferencje</li>
                    </ul>
                </li>

                <li>
                    <button
                        type="button"
                        aria-expanded={otwarteMenu === "pomoc"}
                        onClick={() => przelaczMenu("pomoc")}
                    >
                        Pomoc
                    </button>

                    <ul className="submenu" ref={pomocRef}>
                        <li>Po Co?</li>
                        <li>Instrukcja obsługi</li>
                        <li>Kontakt</li>
                    </ul>
                </li>
                <li>
                    <button
                        type="button"
                        aria-expanded={otwarteMenu === null}
                        onClick={() => przelaczMenu(null)}
                    >
                        Zamknij instrukcje
                    </button>
                </li>
            </ul>
        </nav>
    );
}
export default Menu;
