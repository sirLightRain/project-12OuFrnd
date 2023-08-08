import Notiflix from 'notiflix';
import { serviceBook } from './modal';
import { createBookMarkUp } from './modal';
import { closeLightbox } from './modal';

// -------------------     3апускаємо спіннер
const loadingMessage = document.querySelector('.loader');

// show loader
export function showLoadingMessage() {
  loadingMessage.style.display = 'block';
}
// Hide loader
export function hideLoadingMessage() {
  loadingMessage.style.display = 'none';
}

// повідомлення про кількість книг / відсутність книг
const NO_BOOKS_MESSAGE =
  'Sorry, there are temporarily no books in this category. Please try again.';
const SUCCESS_MESSAGE = 'Good choise! We found';
const END_OF_RESULTS_MESSAGE =
  "We're sorry, but you've reached the end of this book's category.";
const ERROR_TIMEOUT = 5000;
const SUCCESS_TIMEOUT = 2500;


export function reportSuccessOrFail(response, refs) {
  resetSearchForm(refs);
  if (response.data.title === 0) {
    Notiflix.Report.failure(NO_IMAGES_MESSAGE);
  } else {
    const selectedResult = () => total;
    Notiflix.Report.success(`${SUCCESS_MESSAGE} ${selectedResult} books.`, {
      timeout: SUCCESS_TIMEOUT,
    });
  }
}
export function reportError(error, refs) {
  resetSearchForm(refs);
  Notiflix.Report.failure(error.message, {
    timeout: ERROR_TIMEOUT,
  });
}
export function reachedLastPage() {
  Notiflix.Report.info('INFO', END_OF_RESULTS_MESSAGE, 'Ok', {
    width: '360px',
    svgSize: '220px',
  });
}


// рендеримо одну картку книги &  створюємо список карток з книгами
export function renderingBookCard(data) {
  const ulSelectedBook = document.querySelector('.selected-books-js');
  const headerCategory = document.querySelector('.header-category');
  const lastWord = document.querySelector('.header-last-word');
  let selectedBookCard = ``;
  let categoryName = `${data[0].list_name}`;
  const words = categoryName.split(' ');
  headerCategory.textContent = `${words.slice(0, words.length - 1).join(' ')} `;
  lastWord.textContent = `${words[words.length - 1]}`;

  console.log(data);
  data.forEach(({ book_image, title, author, _id }) => {
    selectedBookCard += `
    <li class ="book-li">
    <div class="book-div">
    <img src="${book_image}" alt="${title}" class="book-img"/>
    <a href="https://books-backend.p.goit.global/books/${_id}" class="card-animation">
    QUICK VIEW
    </a>
    </div>
    <p class="book-title">${title}</p>
    <p class="book-author">${author}</p>
  </li>
  `;
  });
  ulSelectedBook.innerHTML = selectedBookCard;
  ulSelectedBook.addEventListener("click", buttonBookCardFunc)
}

export function renderingBookCardAll(data) {
  const ulSelectedBook = document.querySelector('.selected-books-js');
  const headerCategory = document.querySelector('.header-category');
  const lastWord = document.querySelector('.header-last-word');
  headerCategory.textContent = `All `;
  lastWord.textContent = ` Categories`;
  let selectedBookCard = ``;
  console.log(data);
  data.forEach(({ books }) => {
    books.forEach(({ book_image, title, author, _id }) => {
      selectedBookCard += `
      <li class ="book-li">
    <div class="book-div">
    <img src="${book_image}" alt="${title}" class="book-img"/>
    <a href="https://books-backend.p.goit.global/books/${_id}" class="card-animation">
    QUICK VIEW
    </a>
    </div>
    <p class="book-title">${title}</p>
    <p class="book-author">${author}</p>
  </li>
  `;
    });
  });
  ulSelectedBook.innerHTML = selectedBookCard;
ulSelectedBook.addEventListener("click", buttonBookCardFunc)
}


function buttonBookCardFunc(evt){
  if(!evt.target.classList.contains("card-animation")){
    return
  }
  evt.preventDefault() 
  document.body.classList.add('disable-scroll');
  const modalElDiv = document.querySelector(".modal-js");
  const bookUrl = evt.target.href;
  console.dir(bookUrl)
  serviceBook(bookUrl)
  .then((data) => {
    localStorage.setItem('list', JSON.stringify(data));
    createBookMarkUp(data)
    const btnClose = document.querySelector('.modal-close');
    btnClose.addEventListener('click', closeLightbox); 
    })
    .catch(err => console.log(err))
}



//! ========================================================================= 07.08.2023 
// export function renderingBookBestSellers(data) {
//   const ulSelectedBook = document.querySelector('.selected-books-js');
//   const headerCategory = document.querySelector('.header-category');
//   const lastWord = document.querySelector('.header-last-word');
  
//   headerCategory.textContent = `Best Sellers `;
//   lastWord.textContent = ` Books`;
//   let selectedBookCard = ``;

//   // Додаємо заголовок категорії (list_name) у <h2>
//   const categoryHeader = document.createElement('h2');
//   categoryHeader.textContent = responseResult[0].list_name; // Вважаємо, що список книжок має заголовок тільки однієї категорії
//   container.appendChild(categoryHeader);

//   console.log(data);
//   data.forEach(({ books }) => {
//     books.forEach(({ book_image, title, author }) => { // list_name - назва категорії
//       selectedBookCard += `
//         <li class="book-li">
//           <div class="book-div">
//             <img src="${book_image}" alt="${title}" class="book-img" />
//             <button class="card-animation">QUICK VIEW</button>
//           </div>
//           <p class="book-title">${title}</p>
//           <p class="book-author">${author}</p>
//         </li>
//   `;
//     });
//   });
//   ulSelectedBook.innerHTML = selectedBookCard;
// }
//! ========================================================================= 07.08.2023 

// додаємо модалку на картку книги
// кнопка See More
// let seeMoreBtn = document.querySelector('.see-more');

// пагінація
