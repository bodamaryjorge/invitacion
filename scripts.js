document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    let isDown = false;
    let startX;
    let scrollLeft;

    // Permitir arrastrar con el ratón
    carousel.addEventListener("mousedown", (e) => {
        isDown = true;
        carousel.classList.add("active");
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mouseleave", () => {
        isDown = false;
        carousel.classList.remove("active");
    });

    carousel.addEventListener("mouseup", () => {
        isDown = false;
        carousel.classList.remove("active");
    });

    carousel.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Aumenta la sensibilidad del arrastre
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Permitir deslizamiento táctil en móviles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;
        handleGesture();
    });

    function handleGesture() {
        const sensitivity = 50; // Sensibilidad del swipe
        if (touchEndX < touchStartX - sensitivity) {
            carousel.scrollLeft += carousel.offsetWidth / 2;
        } else if (touchEndX > touchStartX + sensitivity) {
            carousel.scrollLeft -= carousel.offsetWidth / 2;
        }
    }
});

window.onload = function () {
    if ('caches' in window) {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }

    let url = window.location.href;
    if (!url.includes('nocache=')) {
        let newUrl = url + (url.includes('?') ? '&' : '?') + 'nocache=' + new Date().getTime();
        window.location.href = newUrl;
    }
};
