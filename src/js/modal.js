import * as basicLightbox from 'basiclightbox';
import amazon from '../images/amazon.jpg';
import orangeBook from '../images/orangeBook.png';
import booksImg from '../images/booksImg.png';
import close from '../images/close.png';

function serviceBook() {

    const BASE = 'https://books-backend.p.goit.global';
    const END = '/books/top-books';

    return fetch(`${BASE}${END}`)
        .then(resp => {
            if (!resp.ok) {
            throw new Error(resp.statusText)
            }
            return resp.json();
        })
    
        .then((data) => {
        
        localStorage.setItem('list', JSON.stringify(data));
    });
}

serviceBook();

const bookList = document.querySelector(".books-list");

//Ця функція додає розмітку в ul
function createBookList() {
    const listData = JSON.parse(localStorage.getItem('list'));
    //console.log(typeof listData);
    listData.forEach(obj => {
        bookList.insertAdjacentHTML('beforeend', createMarkUp(obj.books))
    });
}

createBookList();

//Ця функція додаткова, вона видає макет книг, щоб відбувався клік на книгу та відкривалась для кожної книги модалка з відповідною інфою  
function createMarkUp(arr) {
    return arr.map(({ _id , book_image, list_name, author, title}) => `
        <li data-id="${_id}" class="js-product">
            <img src="${book_image}" alt="${list_name}" class="img-size" loading="lazy"/>
            <h3 class="book-name-style">${title}</h3>
            <p class="author-style">${author}</p>
        </li>
    `).join('');
}

//Ця функкція відмальовує саму модалку
function createBookMarkUp({ _id, book_image, list_name, author, title, description } = {}, url) {
    const books = JSON.parse(localStorage.getItem('add')) || [];
    const isInList = books.some(value => value == _id);
    return `<div class="modal" data-id="${_id}">
                <button class="modal-close">
                </button>
                <img src="${book_image}" alt="${list_name}" class="popup-img" loading="lazy"/>
                <div class="content">
                    <h3 class="title">${title}</h3>
                    <p class="author">${author}</p>
                    <p class="text">${description}</p>
                    <ul class="shop-list">
                        <li><a href="${url[0]}" target="_blank" class="shop-link"><img src="${ amazon }" width="62" height="19" alt="amazon" class="shop-img"/></a></li>
                        <li><a href="${url[1]}" target="_blank" class="shop-link"><img src="${orangeBook}" width="33" height="32" alt="orange-book" class="shop-img"/></a></li>
                        <li><a href="${url[4]}" target="_blank" class="shop-link"><img src="${booksImg}" width="38" height="36" alt="books" class="shop-img"/></a></li>
                    </ul>
                </div>
                <button class="add-to-cart-btn">${isInList ? 'REMOVE FROM THE SHOPPING LIST' : 'ADD TO SHOPPING LIST'}</button>
                <p class="text-under-btn">${isInList ? 'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.' : ''}</p>
            </div>`
}

bookList.addEventListener('click', handlerBook);

let currentLightboxInstance = null;

function handlerBook(evt) {
    const bookItem = evt.target.closest('.js-product');
    const bookId = bookItem.dataset.id; //отримання id

    const obj = findBookItem(bookId); //отримуємо об'єкт зі знайденим id
    //console.log(obj);
    //console.log(obj.buy_links)
    let url =[]; //це для посилань на shop
    obj.buy_links.map(value => url.push(value.url));
    //console.log(url);

    const instance = basicLightbox.create(createBookMarkUp(obj, url));
    instance.show(); //показує модалку

    currentLightboxInstance = instance;

    const btnClose = document.querySelector('.modal-close');
    btnClose.addEventListener('click', closeLightbox);
    const modalContainer = document.querySelector(".basicLightbox");
    modalContainer.addEventListener('click', () => {
        document.body.classList.remove('disable-scroll');
    })

    const btnAdd = document.querySelector('.add-to-cart-btn');

    btnAdd.addEventListener('click', handlerClickAdd);
    function handlerClickAdd(idBooks) {
        closeLightbox();
        const books = JSON.parse(localStorage.getItem('add')) || [];
        const isInList = books.some(value => value == bookId);
        console.log(isInList);
        if (isInList) {
            btnAdd.textContent = "REMOVE FROM THE SHOPPING LIST";
            const updatedBooks = books.filter(value => value != bookId);
            localStorage.setItem('add', JSON.stringify(updatedBooks));
        } else {
            btnAdd.textContent = "ADD TO SHOPPING LIST";
            books.push(bookId);
            localStorage.setItem('add', JSON.stringify(books));
        }
    }

    document.body.classList.add('disable-scroll');
}


function findBookItem(item) {
    const data = JSON.parse(localStorage.getItem('list'));
    let currentBook;
    for (const el of data) {
      currentBook = el.books.find(({ _id }) => _id === item);
      if (currentBook) break;
    }
    return currentBook || {}; 
}

//закривання модалки
function closeLightbox() {
    //console.log(currentLightboxInstance)
    if (currentLightboxInstance) {
        currentLightboxInstance.close();
        currentLightboxInstance = null;
    }

    document.body.classList.remove('disable-scroll')
}

//це для закривання модалки по esc
document.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 27) {
        closeLightbox();
    }
});

