// Обробка кліку на сторінку - active стан:

const pages = document.querySelectorAll('.pgs-number-list.pgs-list .page-number');
pages.forEach((page) => {
    page.addEventListener('click', handlePageClick);
});

function handlePageClick(event) {
    event.preventDefault(); 

    const clickedPage = event.currentTarget;
    const pages = document.querySelectorAll('.pgs-number-list.pgs-list .page-number');

    if (Array.from(pages).indexOf(clickedPage) < 3) {
        pages.forEach((page) => {
            if (page !== clickedPage) {
                const svgIcon = page.querySelector('.ellipse-icon-light');
                const numberSpan = page.querySelector('.number-color');

                svgIcon.classList.remove('icon-active');
                numberSpan.classList.remove('number-color-active');
            }
        });

        const clickedSvgIcon = clickedPage.querySelector('.ellipse-icon-light');
        const clickedNumberSpan = clickedPage.querySelector('.number-color');

        clickedSvgIcon.classList.add('icon-active');
        clickedNumberSpan.classList.add('number-color-active');
    }
}

// =================================================
// відображення нумерації інших прихованих сторінок при пагінації :









