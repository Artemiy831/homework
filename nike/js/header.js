export default class HeaderFixed {
  constructor(cfg) {
    this.cfg = cfg;
    this.el = document.querySelector(`.${cfg.HEADER}`);
    if (!this.el) throw new Error("Header element is missing.");

    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, { passive: true });

    // чтобы состояние было корректным при загрузке
    this.onScroll();
  }

  onScroll() {
    const shouldBeFixed = window.scrollY > 0;
    this.el.classList.toggle(this.cfg.HEADER_FIXED, shouldBeFixed);
  }

  updateFixedClass() {
    // оставлено для совместимости с текущим использованием
    this.onScroll();
  }

  removeFixedClass() {
    this.el.classList.remove(this.cfg.HEADER_FIXED);
  }
}
