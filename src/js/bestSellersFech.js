// import { createMarkup } from './bestsellers';

// Функція для отримання топових книг з сервера
async function fetchTopBooks(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Помилка запиту. Статус помилки: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Функція для створення розмітки одныэъ картки
function createBookMarkup(arr) {
  // Визначимо розміри зображення в залежності від розміру екрана
  let width, height;
  if (window.innerWidth >= 1440) {
    width = 180;
    height = 256;
  } else if (window.innerWidth >= 768) {
    width = 218;
    height = 316;
  } else {
    width = 335;
    height = 485;
  }

  return arr
    .map(
      ({ _id, book_image, list_name, author }) => `
      <h2>Category: ${list_name}</h2>
  <li data-id="${_id}" class="js-product">
      <img src="${book_image}" alt="${list_name}" width='${width}' height='${height}'/>
      <h3>${list_name}</h3>
      <p>${author}</p>
      <div class="js-button-container">
          <button class="js-see-more">See more</button>
      </div>
  </li>
  `
    )
    .join('');
}

// Функція для створення розмітки для списку книг
function createBooksListMarkup(books, booksInCategory) {
  return createBookMarkup(books.slice(0, booksInCategory));
}

// Функція для створення розмітки для категорії
function createCategoryMarkup( booksMarkup) {
  return `

      <ul>${booksMarkup}</ul>
    `;
}

let booksInCategory;
// Функція для виведення перших двох категорій з топовими книгами
async function displayTopBooksByCategory() {
  const url = 'https://books-backend.p.goit.global/books/top-books';

  // Скільки відображати книг вктаегорії залежно від розміру екрану
  if (window.innerWidth >= 1440) {
    booksInCategory = 5;
  } else if (window.innerWidth >= 768) {
    booksInCategory = 3;
  } else {
    booksInCategory = 2;
  }

  // Скільки виводити категорій на екран залежно від розміру екрану
  let categoriesToDisplay = 2;
  if (window.innerWidth >= 768) {
    categoriesToDisplay = 4;
  }

  try {
    const data = await fetchTopBooks(url);
    console.log(
      `Виводимо перші ${categoriesToDisplay} категорії з ${booksInCategory} топовими книгами: `,
      data.slice(0, booksInCategory)
    );

    const bestSellersContainer = document.querySelector('.js-list-bestsellers');

    // Очистимо контейнер перед початком виводу
    bestSellersContainer.innerHTML = '';

    // Виводимо розмітку для категорій
    for (const { books } of data.slice(0, categoriesToDisplay)) {
      const booksMarkup = createBooksListMarkup(books, booksInCategory);
      const categoryMarkup = createCategoryMarkup(booksMarkup);
      bestSellersContainer.insertAdjacentHTML('beforeend', categoryMarkup);
    }

    //! Додаємо обробник події для кнопок "See More"
    // const seeMoreButtons = document.querySelectorAll('.js-see-more');
    // seeMoreButtons.forEach(button => {
    //   button.addEventListener('click', handleSeeMore);
    // });
  } catch (error) {
    console.error(error);
  }
}

export { displayTopBooksByCategory };
