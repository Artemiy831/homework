export const productSlider = () => {
  const root = document.querySelector(".product__slider");
  if (!root || typeof Swiper === "undefined") return;

  // чуть другой стиль записи опций, но конфиг тот 
  new Swiper(root, {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    mousewheel: { forceToAxis: true },
    navigation: {
      prevEl: ".product__slider-button--prev",
      nextEl: ".product__slider-button--next",
    },
  });
};
