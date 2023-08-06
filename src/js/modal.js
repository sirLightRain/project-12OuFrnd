import * as basicLightbox from 'basiclightbox';
import amazon from '../images/amazon.jpg';

//let bookDataCache = null;

function serviceBook() {

//     if (bookDataCache) {
//     return Promise.resolve(bookDataCache);
//   }

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

function createBookList() {
    const listData = JSON.parse(localStorage.getItem('list'));
    console.log(typeof listData);
    listData.forEach(obj => {
        bookList.insertAdjacentHTML('beforeend', createMarkUp(obj.books))
    });
}

createBookList();

function createMarkUp(arr) {
    return arr.map(({ _id , book_image, list_name, author, title}) => `
     <li data-id="${_id}" class="js-product">
      <img src="${book_image}" alt="${list_name}" class="img-size" loading="lazy"/>
            <h3 class="book-name-style">${title}</h3>
            <p class="author-style">${author}</p>
        </li>
        `).join('');
}


function createBookMarkUp({ _id , book_image, list_name, author, title} = {}) {
    return `<div class="modal" data-id="${_id}">
    <button class="modal-close">X</button>
     <img src="${book_image}" alt="${list_name}" class="popup-img" loading="lazy"/>
     <div class="content">
<h3 class="title">${title}</h3>
            <p class="author">${author}</p>
            <p class="text">Info Info Info Info Info Info Info Info Info Info Info Info</p>
             <ul class="shop-list">
      <li><a href="#"><img src="${ amazon }" width="62" height="19" alt="amazon"/></a></li>
      <li><a href="#"><img src="../images/orange-book.png" width="62" height="19" alt="orange-book"/></a></li>
      <li><a href="#"><img src="../images/books.png" width="62" height="19" alt="books"/></a></li>
    </ul>
     </div>
            <button class="add-to-cart-btn">ADD TO SHOPPING LIST</button>
    </div>`
}

bookList.addEventListener('click', handlerBook);


let currentLightboxInstance = null;

function handlerBook(evt) {
  const bookItem = evt.target.closest('.js-product');
  const bookId = bookItem.dataset.id;

  
    const obj = findBookItem(bookId);
    console.log(obj);

    // closeLightbox();

    const instance = basicLightbox.create(createBookMarkUp(obj));
    instance.show();

      currentLightboxInstance = instance;
      
    //updateButtonsInShoppingList();
    //   document.addEventListener('click', handlerOutsideModal)

    const btnClose = document.querySelector('.modal-close');
    btnClose.addEventListener('click', closeLightbox);
    const modalContainer = document.querySelector(".basicLightbox");
    modalContainer.addEventListener('click', () => {
        document.body.classList.remove('disable-scroll');
    })

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


function closeLightbox() {
    console.log(currentLightboxInstance)
    if (currentLightboxInstance) {

        currentLightboxInstance.close();
        currentLightboxInstance = null; 
    }

    document.body.classList.remove('disable-scroll')
}



// // function handleOutsideModalClick(event) {
// //   const modalContent = document.querySelector('.modal .content');
// //   if (!modalContent.contains(event.target)) {
// //     closeLightbox();
// //   }
// // }

// document.addEventListener('click', function (event) {
//     const target = event.target;
//     if (target.classList.contains('modal-close')) {
//         closeLightbox();
//     } 
// });

document.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 27) {
        closeLightbox();
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////

// bookList.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains('add-to-cart-btn')) {
//         hendlerClickAdd(evt);
//     }
// });

// function hendlerClickAdd(evt) {
//     const button = evt.target;
//     const bookId = button.closest('.modal').dataset.id;

//     const storedBooks = JSON.parse(localStorage.getItem('shoppingList') || '[]');

//     const isBookInShoppingList = storedBooks.some((book) => book._id === bookId);

//     if (isBookInShoppingList) {
//         // Якщо книга вже в shopping list, то видаляємо її
//         const updatedBooks = storedBooks.filter((book) => book._id !== bookId);
//         localStorage.setItem('shoppingList', JSON.stringify(updatedBooks));
//         button.textContent = 'ADD TO SHOPPING LIST';
//     } else {
//         // Якщо книни немає в shopping list, то додаємо її
//         const book = currentLightboxInstance.element().querySelector('.content h3.title').textContent;
//         const author = currentLightboxInstance.element().querySelector('.content p.author').textContent;
//         storedBooks.push({ _id: bookId, title: book, author: author });
//         localStorage.setItem('shoppingList', JSON.stringify(storedBooks));
//         button.textContent = 'REMOVE FROM SHOPPING LIST';
//     }
// }
// function updateButtonsInShoppingList() {
//     const storedBooks = JSON.parse(localStorage.getItem('shoppingList') || '[]');

//     const buttons = document.querySelectorAll('.add-to-cart-btn');
//     buttons.forEach((button) => {
//         const bookId = button.closest('.modal').dataset.id;
//         const isBookInShoppingList = storedBooks.some((book) => book._id === bookId);

//         if (isBookInShoppingList) {
//             button.textContent = 'REMOVE FROM SHOPPING LIST';
//         } else {
//             button.textContent = 'ADD TO SHOPPING LIST';
//         }
//     });
// }

// // Визиваємо updateButtonsInShoppingList, коли сторінка завантажується
// updateButtonsInShoppingList();