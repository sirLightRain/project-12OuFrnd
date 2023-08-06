import Notiflix from 'notiflix';
import { selectedCategory } from 'allCategories.js';

// додаємо слухача на вибрану категорію з allCategories
const pickedCategory = document.querySelector('.categor_link');

// отримуємо масив книг певної категорії
function getCategoryArray() {
  pickedCategory.addEventListener('click', selectedCategory());
}
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
}

// додаємо модалку на картку книги

// створюємо список карток з книгами

// кнопка See More
let seeMoreBtn = document.querySelector('.see-more');

// пагінація

// ресет списку при виборі іншої категорії
