import { createMarkup } from './bestsellers';

// Функція для отримання топових книг з сервера
async function fetchTopBooks(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Помилка запиту. Статус помилки: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Функція для створення розмітки для списку книг
function createBooksListMarkup(books) {
  return createMarkup(books.slice(0,2));
}

// Функція для створення розмітки для категорії
function createCategoryMarkup(list_name, booksMarkup) {
  return `
      <h2>Category: ${list_name}</h2>
      <ul>${booksMarkup}</ul>
    `;
}

// Функція для виведення перших двох категорій з топовими книгами
async function displayTopBooksByCategory() {
  const url = 'https://books-backend.p.goit.global/books/top-books';

  try {
    const data = await fetchTopBooks(url);
    console.log('Перші 2 категорії з топовими книгами: ', data.slice(0, 2));

    const bestSellersContainer = document.querySelector('.js-list-bestsellers');

    // Очистимо контейнер перед початком виводу
    bestSellersContainer.innerHTML = '';

    // Виводимо розмітку для перших двох категорій
    for (const { list_name, books } of data.slice(0, 2)) {
      const booksMarkup = createBooksListMarkup(books);
      const categoryMarkup = createCategoryMarkup(list_name, booksMarkup);
      bestSellersContainer.insertAdjacentHTML('beforeend', categoryMarkup);
    }

    // Додаємо обробник події для кнопок "See More"
    const seeMoreButtons = document.querySelectorAll('.js-see-more');
    seeMoreButtons.forEach(button => {
      button.addEventListener('click', handleSeeMore);
    });
  } catch (error) {
    console.error(error);
  }
}

export { displayTopBooksByCategory };
