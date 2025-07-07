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

function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

window.addEventListener("scroll", function() {
    var topBar = document.getElementById("topBar");
    if (window.scrollY > 50) {
        topBar.classList.add("scrolled");
    } else {
        topBar.classList.remove("scrolled");
    }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });
});

(function () {
  const REFRESH_LIMIT = 1;
  const DELAY = 3000; // 10 segundos en milisegundos
  const STORAGE_KEY = 'doubleRefreshCount';

  // Leer cuántas veces se ha refrescado
  let refreshCount = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;

  // Si aún no ha hecho los 2 refreshes
  if (refreshCount < REFRESH_LIMIT) {
    refreshCount++;
    localStorage.setItem(STORAGE_KEY, refreshCount);
    setTimeout(() => {
      location.reload();
    }, DELAY);
  } else {
    // Limpiar después del segundo refresh
    localStorage.removeItem(STORAGE_KEY);
  }
})();
