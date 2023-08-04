// Функція для отримання топових книг з по категоріям
async function fetchTopBooks(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Помилка запиту. Статус помилки: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Функція створення розмітки картки книги
function createBookMarkup(arr) {
  return arr
    .map(
      ({ _id, book_image, list_name, author, title }) => `
        <li data-id="${_id}" class="js-product">
            <img src="${book_image}" alt="${list_name}" class="img-size"/>
            <h3>${title}</h3>
            <p>${author}</p>
        </li>
        `
    )
    .join('');
}

// Функція для отримання ширини екрану
function getScreenWidth() {
  return window.innerWidth;
}

let lastScreenWidth = 0;
let resizeTimeout;

// Функція для перевірки зміни ширини екрану і виклику відповідних дій зі затримкою
function handleScreenResize() {
  // const screenWidth = getScreenWidth();

  // if (screenWidth !== lastScreenWidth) {
  //   lastScreenWidth = screenWidth;

  //   displayTopBooksByCategory(screenWidth);
  // }
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const screenWidth = getScreenWidth();

    if (screenWidth !== lastScreenWidth) {
      lastScreenWidth = screenWidth;
      displayTopBooksByCategory(screenWidth);
    }
  }, 300);
}

// Додати обробник події при зміні розміру екрану
window.addEventListener('resize', handleScreenResize);

// ОСНОВНА Функція відмальовки
async function displayTopBooksByCategory(screenWidth) {
  const url = 'https://books-backend.p.goit.global/books/top-books';

  try {
    const data = await fetchTopBooks(url);
    // console.log('Список з книгами: ', data);

    const bestSellersContainer = document.querySelector('.best-sellers-books');

    // Очистимо контейнер перед початком виводу
    bestSellersContainer.innerHTML = '';

    // Визначаємо кількість книг в категорії в залежності від ширини екрану
    let booksPerCategory = 1;
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      booksPerCategory = 1;
    } else if (screenWidth < 1440) {
      booksPerCategory = 3;
    } else {
      booksPerCategory = 5;
    }

    // Функція для обробки подальшого завантаження категорії
    function handleSeeMoreClick(categoryIndex) {
      // Додатковий код для завантаження наступної порції книг для категорії з індексом categoryIndex
      // Наприклад, можна використовувати змінну offset для відстеження, скільки книг вже виведено
      // і передавати це значення в запиті для отримання наступної порції книг.
    }

    // Виведемо перші чотири категорії
    for (let i = 0; i < 4; i += 1) {
      const category = data[i];
      const booksMarkup = createBookMarkup(
        category.books.slice(0, booksPerCategory)
      );

      // Створюємо div для категорії
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category-container');

      // Додаємо назву категорії
      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = `Category: ${category.list_name}`;
      categoryDiv.appendChild(categoryTitle);

      // Додаємо список книг
      const booksList = document.createElement('ul');
      booksList.classList.add('books-list');
      booksList.innerHTML = booksMarkup;
      categoryDiv.appendChild(booksList);

      // Додаємо кнопку "See more" та призначаємо обробник події
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.textContent = 'See more';
      seeMoreBtn.classList.add('see-more-btn');
      seeMoreBtn.addEventListener('click', () => handleSeeMoreClick(i));
      categoryDiv.appendChild(seeMoreBtn);

      // Додаємо div категорії до контейнера
      bestSellersContainer.appendChild(categoryDiv);
    }
  } catch (error) {
    console.error(error);
  }
}

// Викликаємо функцію для першого відображення категорій при завантаженні сторінки
displayTopBooksByCategory(getScreenWidth());

export { displayTopBooksByCategory };
