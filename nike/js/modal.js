export default class Modal {
  constructor(cfg) {
    const defaults = { MODAL_WRAPPER: "modal" };
    this.cfg = { ...defaults, ...cfg };

    this.modal = document.querySelector(`.${this.cfg.MODAL_WRAPPER}`);
    this.body = document.querySelector(`.${this.cfg.PAGE_BODY}`);

    if (!this.modal) throw new Error("Modal element is missing.");

    this.isOpen = false;
    this.speed = 300;
    this.windowEl = null;
    this.lastFocused = null;

    this.focusSelectors = [
      'a[href]',
      'button',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    this.onDocClick = this.onDocClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);

    document.addEventListener("click", this.onDocClick);
    window.addEventListener("keydown", this.onKeyDown);
    this.modal.addEventListener("click", this.onOverlayClick);
  }

  // ===== public-ish
  open(targetName, speed = 300) {
    const win = document.querySelector(`[data-modal-window="${targetName}"]`);
    if (!win) return;

    this.windowEl = win;
    this.speed = Number.isFinite(+speed) ? +speed : 300;

    this.modal.style.setProperty("--transition-time", `${this.speed / 1000}s`);
    this.modal.classList.add("modal--open");
    this.windowEl.classList.add("modal__window--open");

    this.isOpen = true;
    this.disableScroll();

    // фокус после анимации (как было)
    setTimeout(() => this.focusFirst(), Math.max(0, this.speed - 16));
  }

  close() {
    if (!this.isOpen) return;

    this.modal.classList.remove("modal--open");
    if (this.windowEl) this.windowEl.classList.remove("modal__window--open");

    this.isOpen = false;
    this.enableScroll();
    this.restoreFocus();
  }

  // ===== events
  onDocClick(e) {
    const openBtn = e.target.closest("[data-modal-button]");
    if (openBtn) {
      const name = openBtn.dataset.modalButton;
      const speed = openBtn.dataset.modalSpeed;

      this.lastFocused = document.activeElement;
      this.open(name, speed);
      return;
    }

    const closeBtn = e.target.closest("[data-modal-close]");
    if (closeBtn) {
      this.close();
    }
  }

  onOverlayClick(e) {
    if (!this.isOpen) return;

    // если кликнули вне окна
    const clickedInsideWindow = e.target.closest("[data-modal-window]");
    if (!clickedInsideWindow) this.close();
  }

  onKeyDown(e) {
    if (!this.isOpen) return;

    if (e.key === "Escape") {
      this.close();
      return;
    }

    if (e.key === "Tab") {
      this.trapTab(e);
    }
  }

  // ===== focus
  getFocusable() {
    if (!this.windowEl) return [];
    return Array.from(this.windowEl.querySelectorAll(this.focusSelectors))
      .filter((el) => !el.hasAttribute("disabled"));
  }

  focusFirst() {
    const items = this.getFocusable();
    if (items[0]) items[0].focus();
  }

  restoreFocus() {
    if (this.lastFocused && typeof this.lastFocused.focus === "function") {
      this.lastFocused.focus();
    }
  }

  trapTab(e) {
    const items = this.getFocusable();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && active === last) {
      first.focus();
      e.preventDefault();
    }
  }

  // ===== scroll lock
  disableScroll() {
    this.body.classList.add(this.cfg.PAGE_BODY_NO_SCROLL);
  }

  enableScroll() {
    this.body.classList.remove(this.cfg.PAGE_BODY_NO_SCROLL);
  }
}
