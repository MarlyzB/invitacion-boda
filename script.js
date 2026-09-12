/* =========================================================
   MARLYZ & NICOLAS
   Wedding Invitation
   SCRIPT FINAL
   ========================================================= */


/* =========================================================
   1. APERTURA DE LA INVITACIÓN
   ========================================================= */

const openingScreen =
    document.getElementById("invitation-opening");

const openButton =
    document.getElementById("openInvitation");

const body =
    document.body;

const coupleNames =
    document.querySelector(".names-entrance");

let invitationOpened = false;


if (openButton && openingScreen) {

    openButton.addEventListener("click", () => {

        if (invitationOpened) return;

        invitationOpened = true;


        /*
           Comienza el efecto de soltar/abrir
           la portada.
        */

        openingScreen.classList.add("untying");


        /*
           CAMBIO:
           La apertura empieza después de 1 segundo.
        */

        setTimeout(() => {

            openingScreen.classList.add("opening");

        }, 1000);


        /*
           Retiramos la portada después de que
           las puertas hayan tenido tiempo de abrirse.
        */

        setTimeout(() => {

            openingScreen.classList.add("finished");

            body.classList.remove("locked");


            /*
               Entrada especial de
               Marlyz & Nicolas.
            */

            if (coupleNames) {

                setTimeout(() => {

                    coupleNames.classList.add(
                        "names-visible"
                    );

                }, 250);

            }


            /*
               Intentamos iniciar la música.
            */

            startMusic();


            /*
               Revisamos qué elementos ya están
               visibles después de abrir.
            */

            revealVisibleElements();

        }, 2500);

    });

}



/* =========================================================
   2. CUENTA REGRESIVA
   9 ENERO 2027 - 12:00 PM
   ========================================================= */

const weddingDate =
    new Date(
        "2027-01-09T12:00:00"
    ).getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");



function updateCountdown() {

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;



    /* -----------------------------------------
       SI YA LLEGÓ EL DÍA
       ----------------------------------------- */

    if (distance <= 0) {

        daysElement.textContent =
            "000";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }



    /* -----------------------------------------
       CÁLCULOS
       ----------------------------------------- */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );



    /* -----------------------------------------
       MOSTRAR RESULTADOS
       ----------------------------------------- */

    daysElement.textContent =
        String(days).padStart(
            3,
            "0"
        );


    hoursElement.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    minutesElement.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    secondsElement.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}



updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =========================================================
   3. MÚSICA
   ========================================================= */

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying = false;



/*
   Detectamos si realmente existe
   una canción dentro del elemento audio.
*/

function musicExists() {

    if (!music) {
        return false;
    }


    const source =
        music.querySelector("source");


    if (
        source &&
        source.getAttribute("src")
    ) {
        return true;
    }


    const directSource =
        music.getAttribute("src");


    return Boolean(directSource);

}



/* =========================================================
   INICIAR MÚSICA
   ========================================================= */

async function startMusic() {

    if (
        !music ||
        !musicButton ||
        !musicExists()
    ) {

        return;

    }


    try {

        await music.play();


        musicPlaying = true;


        musicButton.classList.add(
            "playing"
        );


        musicButton.textContent =
            "❚❚";

    }

    catch (error) {

        /*
           Algunos navegadores móviles pueden
           bloquear el autoplay.

           En ese caso el usuario simplemente
           puede tocar el botón de música.
        */

        musicPlaying = false;


        musicButton.classList.remove(
            "playing"
        );


        musicButton.textContent =
            "♫";

    }

}



/* =========================================================
   BOTÓN DE MÚSICA
   ========================================================= */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        async () => {


            /* -------------------------------------
               TODAVÍA NO HAY CANCIÓN
               ------------------------------------- */

            if (!musicExists()) {

                alert(
                    "La música todavía no ha sido agregada a la invitación."
                );

                return;

            }



            /* -------------------------------------
               PAUSAR
               ------------------------------------- */

            if (musicPlaying) {

                music.pause();


                musicPlaying = false;


                musicButton.classList.remove(
                    "playing"
                );


                musicButton.textContent =
                    "♫";


                return;

            }



            /* -------------------------------------
               REPRODUCIR
               ------------------------------------- */

            try {

                await music.play();


                musicPlaying = true;


                musicButton.classList.add(
                    "playing"
                );


                musicButton.textContent =
                    "❚❚";

            }

            catch (error) {

                console.log(
                    "No fue posible reproducir la música."
                );

            }

        }
    );

}



/* =========================================================
   4. ANIMACIONES GENERALES AL HACER SCROLL
   ========================================================= */


/*
   Todas estas clases están definidas
   en el nuevo CSS.
*/

const revealElements =
    document.querySelectorAll(

        ".reveal-section, " +

        ".reveal-title, " +

        ".reveal-subtitle, " +

        ".reveal-text, " +

        ".reveal-soft, " +

        ".reveal-left, " +

        ".reveal-right, " +

        ".reveal-icon, " +

        ".reveal-flower, " +

        ".reveal-photo, " +

        ".reveal-photo-left, " +

        ".reveal-photo-right"

    );



const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.05,

            rootMargin:
                "0px 0px 100px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});
 /* =======
 5. ITINERARIO
   Cada momento aparece individualmente
   ========================================================= */

const scheduleItems =
    document.querySelectorAll(
        ".schedule-item"
    );


const scheduleLines =
    document.querySelectorAll(
        ".schedule-line"
    );



const itineraryObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "is-visible"
                    );


                    itineraryObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold:
                0.25,

            rootMargin:
                "0px 0px -30px 0px"

        }

    );



scheduleItems.forEach(item => {

    itineraryObserver.observe(item);

});


scheduleLines.forEach(line => {

    itineraryObserver.observe(line);

});



/* =========================================================
   6. PEQUEÑO RETRASO ENTRE LOS ELEMENTOS
   DEL ITINERARIO
   ========================================================= */

/*
   No queremos que todo aparezca
   exactamente al mismo tiempo.

   Cada evento recibe un retraso
   ligeramente diferente.
*/

scheduleItems.forEach(
    (item, index) => {

        const delay =
            (index % 3) * 0.08;


        item.style.transitionDelay =
            `${delay}s`;

    }
);



/* =========================================================
   7. FOTOS DEL ITINERARIO
   ========================================================= */

const itineraryPhotos =
    document.querySelectorAll(
        ".schedule-photo"
    );


itineraryPhotos.forEach(
    (photo, index) => {

        /*
           Una pequeña diferencia entre
           cada fotografía hace que la composición
           se sienta más natural.
        */

        photo.style.transitionDelay =
            `${(index % 3) * 0.08}s`;

    }
);



/* =========================================================
   8. FOTOS GRANDES
   ========================================================= */

const largePhotos =
    document.querySelectorAll(

        ".photo-break img, " +
        ".faith-photo img, " +
        ".final-photo img"

    );



largePhotos.forEach(photo => {

    photo.style.transition =
        "transform 9s ease";

});



const largePhotoObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.transform =
                        "scale(1.035)";


                    largePhotoObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold:
                0.25

        }

    );



largePhotos.forEach(photo => {

    largePhotoObserver.observe(photo);

});



/* =========================================================
   9. RSVP
   ========================================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const formMessage =
    document.getElementById("formMessage");

const scriptURL =
    "https://script.google.com/macros/s/AKfycbxtaPpq9_Y0sYSYVT-5nw02ZKNc1Bmvi-EOLHk8OXxL1nMlVxzXdSzd3uh0yqhd6HnK/exec";


if (rsvpForm && formMessage) {

    rsvpForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* -------------------------------------
               OBTENER DATOS
               ------------------------------------- */

            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();

            const attendance =
                document
                    .getElementById("attendance")
                    .value;

            const guests =
                document
                    .getElementById("guests")
                    .value;

            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();

            const submitButton =
                rsvpForm.querySelector(".submit-button");


            /* -------------------------------------
               PREPARAR DATOS
               ------------------------------------- */

            const data = {

                nombre: guestName,
                asistencia: attendance,
                personas: guests,
                mensaje: message

            };


            /* -------------------------------------
               ESTADO DEL BOTÓN
               ------------------------------------- */

            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";


            /* -------------------------------------
               ENVIAR A GOOGLE SHEETS
               ------------------------------------- */

            try {

               await fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
});


                /* -------------------------------------
                   MENSAJE DE CONFIRMACIÓN
                   ------------------------------------- */

                if (attendance === "Sí") {

                    formMessage.innerHTML =

                        "♡ Gracias, " +
                        guestName +
                        ". ¡Qué alegría saber que celebrarás con nosotros!";

                }

                else {

                    formMessage.innerHTML =

                        "Gracias por confirmarnos, " +
                        guestName +
                        ". Te llevaremos con nosotros en el corazón. ♡";

                }


                /* -------------------------------------
                   ANIMACIÓN
                   ------------------------------------- */

                formMessage.style.opacity = "0";

                formMessage.style.transform =
                    "translateY(10px)";

                formMessage.style.transition =
                    "opacity .7s ease, transform .7s ease";


                requestAnimationFrame(() => {

                    formMessage.style.opacity = "1";

                    formMessage.style.transform =
                        "translateY(0)";

                });


                /* -------------------------------------
                   LIMPIAR FORMULARIO
                   ------------------------------------- */

                rsvpForm.reset();

            }

            catch (error) {

                console.error(
                    "Error al enviar RSVP:",
                    error
                );

                formMessage.innerHTML =
                    "No pudimos enviar tu confirmación. " +
                    "Por favor, inténtalo nuevamente.";

            }

            finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Confirmar asistencia";

            }

        }
    );

}


/* =========================================================
   10. EFECTO DEL BOTÓN DE MÚSICA
   ========================================================= */

setInterval(() => {

    if (
        musicPlaying &&
        musicButton
    ) {

        musicButton.style.transform =
            "rotate(8deg)";


        setTimeout(() => {

            musicButton.style.transform =
                "rotate(-8deg)";

        }, 350);

    }

}, 1200);



/* =========================================================
   11. DETECTAR ELEMENTOS QUE YA ESTÁN
   EN PANTALLA
   ========================================================= */

/*
   Esto es especialmente útil en celular.

   Cuando desaparece la portada,
   algunos elementos pueden estar ya
   dentro del viewport.
*/

function revealVisibleElements() {

    const allElements =
        document.querySelectorAll(

            ".reveal-section, " +

            ".reveal-title, " +

            ".reveal-subtitle, " +

            ".reveal-text, " +

            ".reveal-soft, " +

            ".reveal-left, " +

            ".reveal-right, " +

            ".reveal-icon, " +

            ".reveal-flower, " +

            ".reveal-photo, " +

            ".reveal-photo-left, " +

            ".reveal-photo-right"

        );


    allElements.forEach(element => {

        const rect =
            element.getBoundingClientRect();


        const isVisible =
            rect.top <
            window.innerHeight * 0.92 &&
            rect.bottom > 0;


        if (isVisible) {

            element.classList.add(
                "is-visible"
            );

        }

    });


    /* ITINERARIO */

    scheduleItems.forEach(item => {

        const rect =
            item.getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight * 0.92 &&
            rect.bottom > 0
        ) {

            item.classList.add(
                "is-visible"
            );

        }

    });


    scheduleLines.forEach(line => {

        const rect =
            line.getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight * 0.92 &&
            rect.bottom > 0
        ) {

            line.classList.add(
                "is-visible"
            );

        }

    });

}



/* =========================================================
   12. SEGURIDAD PARA RECARGAR LA PÁGINA
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
           Si por alguna razón la página se carga
           desplazada hacia abajo, mostramos los
           elementos que ya estén en pantalla.
        */

        if (
            window.scrollY > 20
        ) {

            revealVisibleElements();

        }

    }
);



/* =========================================================
   13. EFECTO SUAVE AL CAMBIAR ORIENTACIÓN
   DEL CELULAR
   ========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(() => {

            revealVisibleElements();

        }, 350);

    }
);
/* =========================================================
   CONFETI - EXPLOSIÓN REALISTA
========================================================= */

const countdownConfettiSection =
    document.querySelector(".countdown-section");

const confettiContainer =
    document.getElementById("confetti-container");

let confettiPlayed = false;


const confettiColors = [
    "#b8945f", // dorado
    "#d8b7ad", // rosa
    "#a7ad94", // salvia
    "#ead8c8", // beige
    "#c9a86a", // dorado claro
    "#ffffff"  // blanco
];


function launchWeddingConfetti() {

    if (!confettiContainer) return;


    const totalPieces = 150;

    const pieces = [];


    for (let i = 0; i < totalPieces; i++) {

        const element =
            document.createElement("span");

        element.className =
            "confetti-piece";


        /* Diferentes formas */

        const shapeRandom =
            Math.random();

        if (shapeRandom < 0.18) {

            element.classList.add("circle");

        } else if (shapeRandom < 0.38) {

            element.classList.add("thin");

        }


        /* Color */

        element.style.backgroundColor =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];


        /*
           Punto de explosión.

           No salen exactamente del mismo lugar.
           Se distribuyen alrededor de la zona
           central/inferior de la pantalla.
        */

        const startX =
            window.innerWidth *
            (
                0.35 +
                Math.random() * 0.30
            );


        const startY =
            window.innerHeight *
            (
                0.60 +
                Math.random() * 0.12
            );


        element.style.left =
            startX + "px";

        element.style.top =
            startY + "px";


        confettiContainer.appendChild(
            element
        );


        /*
           Ángulo de lanzamiento.

           Algunas piezas van a la izquierda,
           otras al centro y otras a la derecha.
        */

        const angle =
            (
                -155 +
                Math.random() * 130
            ) *
            Math.PI / 180;


        /*
           Cada pieza tiene una velocidad
           diferente.
        */

        /* Fuerza adaptada al tamaño de pantalla */

const screenScale =
    Math.max(
        1,
        window.innerWidth / 700
    );

const speed =
    (
        500 +
        Math.random() * 750
    ) * screenScale;

        const velocityX =
            Math.cos(angle) *
            speed;


        const velocityY =
            Math.sin(angle) *
            speed;


        pieces.push({

            element: element,

            x: startX,

            y: startY,

            vx: velocityX,

            vy: velocityY,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                (
                    Math.random() * 900 -
                    450
                ),

            gravity:
                750 +
                Math.random() * 350,

            drag:
                0.985 +
                Math.random() * 0.01,

            delay:
                Math.random() * 350,

            startTime: null,

            life:
                3200 +
                Math.random() * 1800

        });

    }


    const animationStart =
        performance.now();


    function animateConfetti(now) {

        let piecesAlive = false;


        pieces.forEach(piece => {

            const elapsed =
                now -
                animationStart -
                piece.delay;


            /*
               Todavía no ha salido esta pieza.
               Esto evita que todo explote
               exactamente al mismo tiempo.
            */

            if (elapsed < 0) {

                piecesAlive = true;

                return;

            }


            if (piece.startTime === null) {

                piece.startTime = now;

                piece.element.style.opacity =
                    "1";

            }


            const dt =
                Math.min(
                    (now - piece.startTime) /
                    1000,
                    0.035
                );


            piece.startTime = now;


            /*
               Resistencia del aire
            */

            piece.vx *= piece.drag;


            /*
               Gravedad
            */

            piece.vy +=
                piece.gravity * dt;


            /*
               Posición
            */

            piece.x +=
                piece.vx * dt;

            piece.y +=
                piece.vy * dt;


            /*
               Rotación independiente
            */

            piece.rotation +=
                piece.rotationSpeed *
                dt;


            /*
               Pequeño movimiento lateral
               para que no parezca mecánico.
            */

            const flutter =
                Math.sin(
                    elapsed * 0.012 +
                    piece.rotation
                ) * 5;


            piece.element.style.transform =
                `translate3d(${flutter}px, 0, 0)
                 rotate(${piece.rotation}deg)`;


            piece.element.style.left =
                piece.x + "px";

            piece.element.style.top =
                piece.y + "px";


            /*
               Desaparece progresivamente
               al final.
            */

            const progress =
                elapsed /
                piece.life;


            if (progress > 0.72) {

                piece.element.style.opacity =
                    Math.max(
                        0,
                        1 -
                        (
                            progress - 0.72
                        ) / 0.28
                    );

            }


            /*
               Eliminar cuando termina
            */

            if (
                elapsed < piece.life &&
                piece.y <
                    window.innerHeight + 100
            ) {

                piecesAlive = true;

            } else {

                piece.element.remove();

            }

        });


        if (piecesAlive) {

            requestAnimationFrame(
                animateConfetti
            );

        }

    }


    requestAnimationFrame(
        animateConfetti
    );

}



/* =========================================================
   ACTIVAR AL LLEGAR A CUENTA REGRESIVA
========================================================= */

if (
    countdownConfettiSection &&
    confettiContainer
) {

    const countdownConfettiObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !confettiPlayed
                    ) {

                        confettiPlayed = true;

                        launchWeddingConfetti();

                        countdownConfettiObserver.unobserve(
                            countdownConfettiSection
                        );

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    countdownConfettiObserver.observe(
        countdownConfettiSection
    );

}
