
// Функція для отримання топових книг з по категоріям
async function fetchTopBooks(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Помилка запиту. Статус помилки: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Функція для збереження даних у локальному сховищі
function saveDataToLocal(data) {
  try {
    localStorage.setItem('topBooksData', JSON.stringify(data));
  } catch (error) {
    console.error('Помилка збереження даних у локальному сховищі:', error);
  }
}

// Функція для отримання даних з локального сховища
function getDataFromLocal() {
  try {
    const localData = localStorage.getItem('topBooksData');
    return localData ? JSON.parse(localData) : null;
  } catch (error) {
    console.error('Помилка отримання даних з локального сховища:', error);
    return null;
  }
}

// ОСНОВНА Функція відмальовки
async function displayTopBooksByCategory(screenWidth) {
  try {
    // ********* ЗМІНА: Отримуємо дані з локального сховища
    const localData = getDataFromLocal();

    if (localData) {
      // Якщо дані є в локальному сховищі, використовуйте їх без звернення до сервера
      console.log('Дані з локального сховища: ', localData);
      // Виконуйте далі вашу логіку з використанням даних
      renderData(localData, screenWidth);
    } else {
      // Якщо дані відсутні в локальному сховищі, звертайтесь до сервера
      const url = 'https://books-backend.p.goit.global/books/top-books';
      const data = await fetchTopBooks(url);

      // ********* ЗМІНА: Збережіть дані у локальному сховищі для подальшого використання
      saveDataToLocal(data);
      console.log('Дані з сервера: ', data);
      // Виконайте далі вашу логіку з використанням даних
      renderData(data, screenWidth);
    }
  } catch (error) {
    console.error(error);
  }
}

// Функція створення розмітки картки книги
function createBookMarkup(arr) {
  return arr
    .map(
      ({ _id, book_image, list_name, author, title }) => `
        <li data-id="${_id}" class="js-product">
            <img src="${book_image}" alt="${list_name}" class="img-size" loading="lazy"/>
            <h3 class="book-name-style">${title}</h3>
            <p class="author-style">${author}</p>
        </li>
        `
    )
    .join('');
}

// Функція для відмальовки даних
function renderData(data, screenWidth) {
  const bestSellersContainer = document.querySelector('.best-sellers-books');

  // Очистимо контейнер перед початком виводу
  bestSellersContainer.innerHTML = '';

  // Визначаємо кількість книг в категорії в залежності від ширини екрану
  let booksPerCategory = 1;
  if (screenWidth < 768) {
    booksPerCategory = 1;
  } else if (screenWidth < 1440) {
    booksPerCategory = 3;
  } else {
    booksPerCategory = 5;
  }

  // Функція для обробки кліку по See more
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
    categoryTitle.classList.add('category-style');
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
    // Обробник подій
    seeMoreBtn.addEventListener('click', () => handleSeeMoreClick(i));
    categoryDiv.appendChild(seeMoreBtn);

    // Додаємо div категорії до контейнера
    bestSellersContainer.appendChild(categoryDiv);
  }
}

// Функція для отримання ширини екрану
function getScreenWidth() {
  return window.innerWidth;
}

let lastScreenWidth = 0;
let resizeTimeout;

// Функція для перевірки зміни ширини екрану і виклику відповідних дій зі затримкою
function handleScreenResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const screenWidth = getScreenWidth();

    if (screenWidth !== lastScreenWidth) {
      lastScreenWidth = screenWidth;

      // Додаємо клас resizing до кнопок, щоб вона зникла, коли сторінка перемальовується
      const seeMoreBtns = document.querySelectorAll('.see-more-btn');
      seeMoreBtns.forEach(btn => btn.classList.add('resizing'));

      displayTopBooksByCategory(screenWidth);
    }
  }, 250);
}

// Додати обробник події при зміні розміру екрану
window.addEventListener('resize', handleScreenResize);

// Функція для відмальовки на початку завантаження сторінки
function handleInitialResize() {
  const screenWidth = getScreenWidth();
  lastScreenWidth = screenWidth;
  displayTopBooksByCategory(screenWidth);
}

// Додати обробник події при завантаженні сторінки
window.addEventListener('load', handleInitialResize);

export { displayTopBooksByCategory };
