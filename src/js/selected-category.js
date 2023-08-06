import Notiflix from 'notiflix';
<<<<<<< Updated upstream
import { selectedCategory } from 'allCategories.js';

// додаємо слухача на вибрану категорію з allCategories
const pickedCategory = document.querySelector('.categor_link');

// отримуємо масив книг певної категорії
function getCategoryArray() {
  pickedCategory.addEventListener('click', selectedCategory());
}
=======

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// рендеримо одну картку книги
export function renderingBookCard(arr) {
  const markUpTest = arr
    .map(({ server, responceResult }) => {
      const { list_name, book_image, title, author } = category[0];
      const markUp = `
        <div class="book-card">
      <h2 class="categ-header"></h2>    
    <img class="img-book" src="${book_image}" width="335" height="485" loading="lazy">
    	<div class="info">
        <p class="book-title">${title}</p>
        <p class="book-author">${author}</p>
      	</div>
        </div>
  `;
      return markUp;
    })
    .join('');
=======
// рендеримо одну картку книги &  створюємо список карток з книгами
export function renderingBookCard(data) {
    const ulSelectedBook = document.querySelector('.selected-books-js')
    const selectedCategory = document.querySelector('.selected-category')
    const headerCategory = document.querySelector('.header-category')
    const lastWord = document.querySelector('.span-header')
 let selectedBookCard = ``
 let categoryName = `${data[0].list_name}`;
 const words = categoryName.split(" ");
headerCategory.textContent = `${words.slice(0, words.length -1).join(" ")}`
lastWord.textContent = ` ${words[words.length-1]}`

 console.log(data)
 data.forEach( ({list_name, book_image,title,author}) => {
    selectedBookCard +=`
    <div class="book-div">
    <img src="${book_image}" alt="${title}" class="book-img"/>
    <p class="book-title">${title}</p>
    <p class="book-author">B${author}</p>
  </div>
  `;
    })
ulSelectedBook.innerHTML = selectedBookCard
}
export function renderingBookCardAll(data) {
    const ulSelectedBook = document.querySelector('.selected-books-js')
    const headerCategory = document.querySelector('.header-category')
    const lastWord = document.querySelector('.span-header')
headerCategory.textContent = `ALL`
lastWord.textContent = ` CATEGORIES`
 let selectedBookCard = ``
 console.log(data)
 data.forEach(({books}) => {
    books.forEach(({book_image,title,author}) => {
 selectedBookCard +=`
    <div class="book-div">
    <img src="${book_image}" alt="${title}" class="book-img"/>
    <p class="book-title">${title}</p>
    <p class="book-author">B${author}</p>
  </div>
  `;
    }
 )})
ulSelectedBook.innerHTML = selectedBookCard

>>>>>>> Stashed changes
}

// додаємо модалку на картку книги

<<<<<<< Updated upstream
// створюємо список карток з книгами

=======




  
>>>>>>> Stashed changes
// кнопка See More
let seeMoreBtn = document.querySelector('.see-more');

// пагінація

// ресет списку при виборі іншої категорії
<<<<<<< Updated upstream
=======

// import {renderingBookCard} from "./selected-category";
// import { renderingBookCardAll} from "./selected-category";
// renderingBookCard(responceResult)






>>>>>>> Stashed changes
