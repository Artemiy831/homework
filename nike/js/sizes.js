export const sizes = () => {
  const list = document.querySelector('[data-sizes="list"]');
  if (!list) return;

  const activeClass = "product__sizes-button--active";

  list.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-sizes="button"]');
    if (!btn) return;

    // снимаем активность только внутри текущего списка, а не по всему документу
    list.querySelectorAll('[data-sizes="button"]').forEach((b) => {
      b.classList.remove(activeClass);
    });

    btn.classList.add(activeClass);
  });
};
