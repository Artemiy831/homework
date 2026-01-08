// Бургер-меню
const burgerButton = document.querySelector('.burger-button');
const navMenu = document.querySelector('.nav__menu');

if (burgerButton && navMenu) {
    function toggleMenu() {
        burgerButton.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    burgerButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !burgerButton.contains(e.target)) {
            toggleMenu();
        }
    });

    // Закрытие при ресайзе
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('top-banner');
    const closeBtn = document.getElementById('close-banner');

    // 1. Показываем баннер ПРИ КАЖДОЙ перезагрузке
    banner.classList.remove('banner-hidden');
    document.body.classList.remove('banner-closed');

    // 2. Закрываем по кнопке, НЕ пишем в localStorage
    closeBtn.addEventListener('click', () => {
        banner.classList.add('banner-hidden');
        document.body.classList.add('banner-closed');
    });

    // 3. Очистка поля поиска по иконке-лупе
    document.addEventListener('click', e => {
        if (e.target.closest('.search__img')) {
            e.preventDefault();
            const input = e.target.closest('.search__product')
                ?.querySelector('.product__input');
            if (input) input.value = '';
        }
    });
});


// отзывы (адаптивный слайдер без обрезаний)

const slider = document.querySelector('.testimonials__slider');
const prevBtn = document.querySelector('.testimonials__prev');
const nextBtn = document.querySelector('.testimonials__next');
const wrapper = document.querySelector('.testimonials__slider-wrapper');

let currentIndex = 0;

function getPerView() {
    const w = window.innerWidth;
    if (w >= 1200) return 3;
    if (w >= 830) return 2;
    return 1;
}

// читаем gap из CSS (чтобы 20/16 совпадали)
function getGap() {
    if (!slider) return 0;
    const gap = getComputedStyle(slider).gap; // "20px"
    return parseFloat(gap) || 0;
}

function setupSlides() {
    if (!slider || !wrapper) return;

    const slides = Array.from(slider.children);
    const perView = getPerView();
    const gap = getGap();

    const wrapperWidth = wrapper.clientWidth;
    const totalGaps = gap * (perView - 1);

    // НЕ округляем вниз — оставляем точную ширину
    const slideWidth = (wrapperWidth - totalGaps) / perView;

    slides.forEach(s => {
        s.style.width = `${slideWidth}px`;
    });

    const maxIndex = Math.max(0, slides.length - perView);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    updateSlider();
    updateButtons();
}

function updateSlider() {
    if (!slider) return;
    const slides = Array.from(slider.children);
    if (!slides.length) return;

    const gap = getGap();
    const slideWidth = slides[0].getBoundingClientRect().width; // точнее чем offsetWidth
    const step = slideWidth + gap;

    slider.style.transform = `translateX(-${currentIndex * step}px)`;
}

function updateButtons() {
    const slides = Array.from(slider.children);
    const perView = getPerView();
    const maxIndex = Math.max(0, slides.length - perView);

    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

nextBtn?.addEventListener('click', () => {
    const slides = Array.from(slider.children);
    const perView = getPerView();
    const maxIndex = Math.max(0, slides.length - perView);

    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
        updateButtons();
    }
});

prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
        updateButtons();
    }
});

window.addEventListener('load', setupSlides);
window.addEventListener('resize', setupSlides);
