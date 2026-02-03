export default class BurgerMenu {
  constructor(cfg, headerFixed = null) {
    this.cfg = cfg;
    this.headerFixed = headerFixed;

    this.btn = document.querySelector(`.${cfg.BURGER}`);
    this.menu = document.querySelector(`.${cfg.HEADER_MENU}`);
    this.body = document.querySelector(`.${cfg.PAGE_BODY}`);
    this.main = document.querySelector(`.${cfg.MAIN}`);

    if (!this.btn || !this.menu || !this.body) {
      throw new Error("Required DOM elements are missing.");
    }

    this.isMobile = window.innerWidth <= cfg.BREAKPOINT;

    // touch state
    this.touch = { startX: 0 };

    // bind
    this.onResize = this.onResize.bind(this);
    this.onClickBurger = this.onClickBurger.bind(this);
    this.onClickBody = this.onClickBody.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.applyMode();
    window.addEventListener("resize", this.onResize);
  }

  // ====== state helpers
  opened() {
    return this.menu.classList.contains(this.cfg.HEADER_MENU_OPEN);
  }

  setOpened(nextOpen) {
    this.btn.classList.toggle(this.cfg.BURGER_OPEN, nextOpen);
    this.menu.classList.toggle(this.cfg.HEADER_MENU_OPEN, nextOpen);
    this.body.classList.toggle(this.cfg.PAGE_BODY_NO_SCROLL, nextOpen);

    this.btn.ariaExpanded = String(nextOpen);
    this.btn.ariaLabel = nextOpen ? this.cfg.lABEL.CLOSE : this.cfg.lABEL.OPEN;

    if (this.main) this.main.style.pointerEvents = nextOpen ? "none" : "";

    // фикс шапки: при открытом меню убираем тень/фикс, при закрытии — возвращаем по скроллу
    if (this.headerFixed) {
      if (nextOpen) this.headerFixed.removeFixedClass();
      else this.headerFixed.updateFixedClass();
    }
  }

  close() {
    this.setOpened(false);
  }

  toggle() {
    this.setOpened(!this.opened());
  }

  // ====== mode management
  applyMode() {
    if (this.isMobile) {
      this.attach();
    } else {
      this.detach();
      this.close(); // на десктопе меню должно быть скрыто
    }
  }

  attach() {
    this.btn.addEventListener("click", this.onClickBurger);
    this.body.addEventListener("click", this.onClickBody);

    this.body.addEventListener("touchstart", this.onTouchStart, { passive: true });
    this.body.addEventListener("touchmove", this.onTouchMove, { passive: true });
    this.body.addEventListener("touchend", this.onTouchEnd, { passive: true });
  }

  detach() {
    this.btn.removeEventListener("click", this.onClickBurger);
    this.body.removeEventListener("click", this.onClickBody);

    this.body.removeEventListener("touchstart", this.onTouchStart);
    this.body.removeEventListener("touchmove", this.onTouchMove);
    this.body.removeEventListener("touchend", this.onTouchEnd);
  }

  // ====== handlers
  onResize() {
    const nowMobile = window.innerWidth <= this.cfg.BREAKPOINT;
    if (nowMobile === this.isMobile) return;
    this.isMobile = nowMobile;
    this.applyMode();
  }

  onClickBurger() {
    this.toggle();
  }

  onClickBody(e) {
    if (!this.opened()) return;

    const target = e.target;

    const clickedLink = target.classList?.contains(this.cfg.MENU_LINK);
    const clickedInsideMenu = !!target.closest(`.${this.cfg.HEADER_MENU}`);
    const clickedBurger = !!target.closest(`.${this.cfg.BURGER}`);

    // 1) клик по ссылке меню (на мобиле) закрывает
    if (clickedLink && window.innerWidth <= this.cfg.BREAKPOINT) {
      this.close();
      return;
    }

    // 2) клик снаружи меню и не по бургеру закрывает
    if (!clickedInsideMenu && !clickedBurger) {
      this.close();
    }
  }

  onTouchStart(e) {
    if (!this.opened()) return;
    this.touch.startX = e.changedTouches[0].screenX;
    this.menu.style.transition = "none";
  }

  onTouchMove(e) {
    if (!this.opened()) return;

    const x = e.changedTouches[0].screenX;
    const delta = Math.max(0, x - this.touch.startX);

    // та же визуальная механика: "сдвигаем" menu вправо, меняя right в минус
    this.menu.style.right = `-${delta}px`;
  }

  onTouchEnd(e) {
    if (!this.opened()) return;

    const endX = e.changedTouches[0].screenX;
    const distance = endX - this.touch.startX;

    this.menu.style.transition = "";
    this.menu.style.right = "";

    if (distance > 70) this.close();
  }
}
