import * as basicLightbox from 'basiclightbox';
import amazon from '../images/amazon.jpg';
import orangeBook from '../images/orangeBook.png';
import booksImg from '../images/booksImg.png';
import close from '../images/close.png';

export async function serviceBook(bookUrl) {
    return await fetch(`${bookUrl}`,{
      method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
            throw new Error(resp.statusText)
            }
           
            const respResolt = response.json();
            return respResolt
        })
  
  }  

const bookList = document.querySelector(".books-list");

//Ця функкція відмальовує саму модалку
let currentLightboxInstance = null;

export function createBookMarkUp({ _id, book_image, list_name, author, title, description,amazon_product_url,buy_links} = {}, url) {
    const books = JSON.parse(localStorage.getItem('list')) || [];
    console.log(books)
    const isInList = `https://books-backend.p.goit.global/books/${_id}`;
    console.dir(`${isInList}`)
    const buyLi = buy_links
    const instance = basicLightbox.create(`<div class="modal" data-id="${_id}">
                <button class="modal-close">
                </button>
                <img src="${book_image}" alt="${list_name}" class="popup-img" loading="lazy"/>
                <div class="content">
                    <h3 class="title">${title}</h3>
                    <p class="author">${author}</p>
                    <p class="text">${description}</p>
                    <ul class="shop-list">
                        <li><a href="${amazon_product_url}" target="_blank" class="shop-link"><img src="${ amazon }" width="62" height="19" alt="amazon" class="shop-img"/></a></li>
                        <li><a href="${buyLi[1].url}" target="_blank" class="shop-link"><img src="${orangeBook}" width="33" height="32" alt="orange-book" class="shop-img"/></a></li>
                        <li><a href="${buyLi[4].url}" target="_blank" class="shop-link"><img src="${booksImg}" width="38" height="36" alt="books" class="shop-img"/></a></li>
                    </ul>
                </div>
                <button class="add-to-cart-btn">${books.includes(`${isInList}`)?'REMOVE FROM THE SHOPPING LIST':'ADD TO SHOPPING LIST'}</button>
                <p class="text-under-btn">${books.includes(`${isInList}`)? 'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.' : ''}</p>
            </div>`)
            currentLightboxInstance = instance;
            instance.show();
            return instance
            
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
export function closeLightbox() {
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

