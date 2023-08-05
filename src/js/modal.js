import * as basicLightbox from 'basiclightbox'


function serviceBook() {
    const BASE = 'https://books-backend.p.goit.global';
    const END = '/books/top-books';

    return fetch(`${BASE}${END}`)
        .then(resp => {
            if (!resp.ok) {
            throw new Error(resp.statusText)
            }
            return resp.json()
    })
}


const bookList = document.querySelector(".books-list");

serviceBook()
    .then(data => {
        bookList.insertAdjacentHTML('beforeend', createMarkUp(data))
    })
.catch(err => console.log(err))


function createMarkUp(arr) {
    return arr.map(({ _id, book_image, list_name, author, title }) => `
     <li data-id="${_id}" class="js-product">
      <img src="https://storage.googleapis.com/du-prd/books/images/9781250144058.jpg" alt="${list_name}" class="img-size" loading="lazy"/>
            <h3 class="book-name-style">${list_name}</h3>
            <p class="author-style">${author}</p>
        </li>
        `).join('');
}


function createBookMarkUp() {
    return `<div class="modal">
    <button class="modal-close">X</button>
     <img src="https://storage.googleapis.com/du-prd/books/images/9781250144058.jpg" alt="img" class="popup-img" loading="lazy"/>
     <div class="content>
<h3 class="title">TITLE</h3>
            <p class="author">Author</p>
            <p class="text">Info Info Info Info Info Info Info Info Info Info Info Info</p>
             <ul class="shop-list">
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
    </ul>
     </div>
            <button class="add-to-cart-btn">ADD TO SHOPPING LIST</button>
    </div>`
}

bookList.addEventListener('click', handlerBook)

let currentLightboxInstance = null;

function handlerBook() {

    closeLightbox();

    const instance = basicLightbox.create(createBookMarkUp());
    instance.show();

    currentLightboxInstance = instance;
}


function closeLightbox() {
    if (currentLightboxInstance) {
        currentLightboxInstance.close();
        currentLightboxInstance = null; 
    }
}

document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('modal-close')) {
        closeLightbox();
    }
});

document.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 27) {
        closeLightbox();
    }
});

