// active стан кнопки - обробка кліку на сторінку:

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
// навігація по кнопках пагінації 

const cards = document.querySelectorAll('.card');
const pageSize = 3;
let currentPage = 1;

function showPage(page) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    cards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

showPage(currentPage);

const prevFirstPageLink = document.querySelector('.pgs-previous-list .page-item:first-child');
const prevPageLink = document.querySelector('.pgs-previous-list .page-item:last-child');
const nextPageLink = document.querySelector('.pgs-next-list .page-item:first-child');
const lastPageLink = document.querySelector('.pgs-next-list .page-item:last-child');

prevFirstPageLink.addEventListener('click', () => {
    currentPage = 1;
    showPage(currentPage);
});

prevPageLink.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

nextPageLink.addEventListener('click', () => {
    if (currentPage < Math.ceil(cards.length / pageSize)) {
        currentPage++;
        showPage(currentPage);
    }
});

lastPageLink.addEventListener('click', () => {
    currentPage = Math.ceil(cards.length / pageSize);
    showPage(currentPage);
});

const pageLinks = document.querySelectorAll('.pgs-number-list .page-item');

pageLinks.forEach((pageLink, index) => {
    pageLink.addEventListener('click', () => {
        currentPage = index + 1;
        showPage(currentPage);
    });
});
