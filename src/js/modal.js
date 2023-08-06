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
        // bookList.insertAdjacentHTML('beforeend', createMarkUp(data))
        console.log(data)
        data.forEach(element => {
            bookList.insertAdjacentHTML('beforeend', createMarkUp(element.books))
        });
    })
.catch(err => console.log(err))


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
      <li><a href="#"><img src="./images/amazon.jpg" width="62" height="19" alt="amazon"/></a></li>
      <li><a href="#"><img src="./images/orange-book.png" width="62" height="19" alt="orange-book"/></a></li>
      <li><a href="#"><img src="./images/books.png" width="62" height="19" alt="books"/></a></li>
    </ul>
     </div>
            <button class="add-to-cart-btn">ADD TO SHOPPING LIST</button>
    </div>`
}

bookList.addEventListener('click', handlerBook)

let currentLightboxInstance = null;


async function handlerBook(evt) {
  const bookItem = evt.target.closest('.js-product');
  const bookId = bookItem.dataset.id;

  try {
    const obj = await findBookItem(bookId);
    console.log(obj);

    closeLightbox();

    const instance = basicLightbox.create(createBookMarkUp(obj));
    instance.show();

    currentLightboxInstance = instance;

    document.body.classList.add('disable-scroll');
  } catch (err) {
    console.log(err);
  }
}


function findBookItem(item) {
  return serviceBook().then(data => {
    let currentBook;
    for (const el of data) {
      currentBook = el.books.find(({ _id }) => _id === item);
      if (currentBook) break;
    }
    return currentBook || {}; 
  }).catch(err => {
    console.log(err);
    return {}; 
  });
}


function closeLightbox() {
    if (currentLightboxInstance) {
        currentLightboxInstance.close();
        currentLightboxInstance = null; 
    }

    document.body.classList.remove('disable-scroll')
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

//////////////////////////////////////////////////////////////////////////////////////////////


