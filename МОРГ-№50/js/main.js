// ===== BURGER MENU FUNCTIONS =====
function openSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const burger = document.querySelector('.burger-btn');
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const burger = document.querySelector('.burger-btn');
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    burger.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== ASSISTANT SEND =====
function sendAssistant() {
    const textarea = document.getElementById('assistantInput');
    if (textarea.value.trim()) {
        alert('Ваш вопрос отправлен: ' + textarea.value);
        textarea.value = '';
    }
}

// ===== ВСЁ ОСТАЛЬНОЕ — ПОСЛЕ ЗАГРУЗКИ DOM =====
document.addEventListener('DOMContentLoaded', () => {

    // Крестик закрытия сайдбара
    const closeBtn = document.querySelector('.sidebar-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    // Nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth <= 768) closeSidebar();
        });
    });

    // Textarea Enter
    const textarea = document.getElementById('assistantInput');
    if (textarea) {
        textarea.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') sendAssistant();
        });
    }

    // Accordion
    document.querySelectorAll('.nav-section-title').forEach(title => {
        title.addEventListener('click', function () {
            const subList = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            const isCollapsed = subList.classList.contains('collapsed');
            subList.classList.toggle('collapsed');
            arrow.textContent = isCollapsed ? '▼' : '▶';
        });
    });


    // Бургер-кнопка
    const headerLeft = document.querySelector('.header-left');
    if (headerLeft) {
        const burgerBtn = document.createElement('button');
        burgerBtn.className = 'burger-btn';
        burgerBtn.setAttribute('aria-label', 'Открыть меню');
        burgerBtn.innerHTML = '<span></span><span></span><span></span>';
        burgerBtn.addEventListener('click', openSidebar);
        headerLeft.prepend(burgerBtn);
    }

    // Оверлей
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);

    // Мобильная строка с телефоном
    const contentInner = document.querySelector('.main-content-inner');
    if (contentInner) {
        const phoneBar = document.createElement('div');
        phoneBar.className = 'mobile-phone-bar';
        phoneBar.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <a href="tel:88001003520" style="color:inherit;text-decoration:none;">8 800 100-35-20</a>
        `;
        contentInner.prepend(phoneBar);
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
});