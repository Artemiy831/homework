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

// отзывы

const slider = document.querySelector('.testimonials__slider');
const prevBtn = document.querySelector('.testimonials__prev');
const nextBtn = document.querySelector('.testimonials__next');

let currentIndex = 0;
const slideWidth = 420; // 400px ширина + 20px отступ

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    const maxIndex = slider.children.length - 1;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});


