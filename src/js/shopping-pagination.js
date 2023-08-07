
const pages = document.querySelectorAll('.pgs-number-list.pgs-list .page-number');
pages.forEach((page) => {
    page.addEventListener('click', handlePageClick);
});

function handlePageClick(event) {
    event.preventDefault();

    const clickedPage = event.currentTarget;
    const pages = document.querySelectorAll('.pgs-number-list.pgs-list .page-number');

    pages.forEach((page) => {
        const svgIcon = page.querySelector('.ellipse-icon-light');
        const numberSpan = page.querySelector('.number-color');
        svgIcon.classList.remove('icon-active');
        numberSpan.classList.remove('number-color-active');
    });

    const clickedSvgIcon = clickedPage.querySelector('.ellipse-icon-light');
    const clickedNumberSpan = clickedPage.querySelector('.number-color');

    clickedSvgIcon.classList.add('icon-active');
    clickedNumberSpan.classList.add('number-color-active');

    if (clickedPage.parentElement.classList.contains('dots')) {
        const numberList = document.querySelector('.pgs-number-list.pgs-list');
        const remainingCards = document.querySelectorAll('.card:not([style*="display: block"])');

        let cardsToAppend = Math.min(remainingCards.length, pageSize);
        let newPageNumber = pages.length - 1; 

        const newPageItems = Array.from({ length: cardsToAppend }, (_, index) => {
            const pageNumber = newPageNumber + index;
            return `
                <li class="page-item">
                    <a href="#" class="page-number">
                        <svg class="ellipse-icon-light">
                            <use href="./images/favicon.svg#Ellipse"></use>
                        </svg>
                        <span class="number-desc number-color">${pageNumber}</span>
                    </a>
                </li>
            `;
        });

        numberList.innerHTML = ''; 
        numberList.innerHTML += newPageItems.join('');

        if (remainingCards.length > pageSize) {
            const dotsItem = `
                <li class="dots page-item">
                    <a href="#" class="page-number">
                        <svg class="ellipse-icon-light">
                            <use href="./images/favicon.svg#Ellipse"></use>
                        </svg>
                        <span class="number-desc number-color">...</span>
                    </a>
                </li>
            `;
            numberList.innerHTML += dotsItem;
        }

        const newPages = document.querySelectorAll('.pgs-number-list.pgs-list .page-number');
        newPages.forEach((page) => {
            page.addEventListener('click', handlePageClick);
        });

    }
}

// ==================================================================

const cards = document.querySelectorAll('.card');
const pageSize = 3;
let currentPage = 1;
let activePageLink = document.querySelector('.pgs-number-list.pgs-list .page-item:first-child .page-number');

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


// ==================================================================

const prevFirstPageLink = document.querySelector('.pgs-previous-list .page-item:first-child');
const prevPageLink = document.querySelector('.pgs-previous-list .page-item:last-child');
const nextPageLink = document.querySelector('.pgs-next-list .page-item:first-child');
const lastPageLink = document.querySelector('.pgs-next-list .page-item:last-child');

prevFirstPageLink.addEventListener('click', () => {
    currentPage = 1;
    activePageLink.querySelector('.ellipse-icon-light').classList.remove('icon-active');
    activePageLink.querySelector('.number-color').classList.remove('number-color-active');
    activePageLink = document.querySelector('.pgs-number-list.pgs-list .page-item:first-child .page-number');
    activePageLink.querySelector('.ellipse-icon-light').classList.add('icon-active');
    activePageLink.querySelector('.number-color').classList.add('number-color-active');
    showPage(currentPage);
});


prevPageLink.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPageAndUpdateActiveLink(currentPage);
    }
});

nextPageLink.addEventListener('click', () => {
    if (currentPage < Math.ceil(cards.length / pageSize)) {
        currentPage++;
        showPageAndUpdateActiveLink(currentPage);
    }
});

function showPageAndUpdateActiveLink(page) {
    activePageLink.querySelector('.ellipse-icon-light').classList.remove('icon-active');
    activePageLink.querySelector('.number-color').classList.remove('number-color-active');
    activePageLink = document.querySelector(`.pgs-number-list.pgs-list .page-item:nth-child(${page}) .page-number`);
    activePageLink.querySelector('.ellipse-icon-light').classList.add('icon-active');
    activePageLink.querySelector('.number-color').classList.add('number-color-active');
    showPage(page);
}


lastPageLink.addEventListener('click', () => {
    currentPage = Math.ceil(cards.length / pageSize);
    activePageLink.querySelector('.ellipse-icon-light').classList.remove('icon-active');
    activePageLink.querySelector('.number-color').classList.remove('number-color-active');
    activePageLink = document.querySelector(`.pgs-number-list.pgs-list .page-item:last-child .page-number`);
    activePageLink.querySelector('.ellipse-icon-light').classList.add('icon-active');
    activePageLink.querySelector('.number-color').classList.add('number-color-active');
    showPage(currentPage);
});



const pageLinks = document.querySelectorAll('.pgs-number-list .page-item');

pageLinks.forEach((pageLink, index) => {
    pageLink.addEventListener('click', () => {
        activePageLink.querySelector('.ellipse-icon-light').classList.remove('icon-active');
        activePageLink.querySelector('.number-color').classList.remove('number-color-active');
        currentPage = index + 1;
        activePageLink = pageLink.querySelector('.page-number');
        activePageLink.querySelector('.ellipse-icon-light').classList.add('icon-active');
        activePageLink.querySelector('.number-color').classList.add('number-color-active');
        showPage(currentPage);
    });
});






