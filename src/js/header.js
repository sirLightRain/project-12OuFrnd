(() => {
    const menuBtnRef = document.querySelector('[data-menu-button]');
    const mobileMenuRef = document.querySelector('[data-menu]');

    menuBtnRef.addEventListener('click', () => {
        const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;

        menuBtnRef.classList.toggle('is-open');
        menuBtnRef.setAttribute('aria-expanded', !expanded);
        mobileMenuRef.classList.toggle('is-open');
    });
})();

const themeSwitch = document.querySelector('theme-switch');
const currentСolorSwitch = document.querySelector('theme');
const elementBody = document.querySelector('body')
const checkBox = document.querySelector(".theme-checkbox");

if (currentСolorSwitch) {
    elementBody.classList.add(currentСolorSwitch);
    if (currentСolorSwitch === 'black-theme') {
        checkBox.ckecked = true;
    }
}

function switchTheme(e) {
    if (e.target.ckecked) {
        elementBody.classList.remove('theme-light');
        elementBody.classList.add('black-theme');

        localStorage.setItem('theme', 'black-theme');
    } else {
        elementBody.classList.remove('black-theme');
        elementBody.classList.add('theme-light');

        localStorage.setItem('theme', 'theme-light');
    }
}
themeSwitch.addEventListener('change,switch,false');