// const urlList = {
//   // API з книгами
//   API_BOOKS: 'https://books-backend.p.goit.global/api-docs/',
//   // Перелік категорій книг
//   ALL_CATEGORY: 'https://books-backend.p.goit.global/books/category-list',
//   // Популярні книги, що належать до усіх категорій
//   ALL_CAT_POP_B: 'https://books-backend.p.goit.global/books/top-books',
//   // Книги окремої категорії
//   CERTAIN_CAT_B:
//     'https://books-backend.p.goit.global/books/category?category=${category_name}',
//   // Детальна інформація про книгу
//   INFO_B: 'https://books-backend.p.goit.global/books/bookId',
// };

// function getTopBooksByCategory() {
//   fetch(urlList.ALL_CAT_POP_B)
//     .then(response => response.json())
//     // .then(response => console.log(response))
//     .then(data => {
//       console.log('Популярні книги, що належать до усіх категорій: ', data);
//     })
//     .catch(err=>console.log(err))
// }

import { createMarkup } from './bestsellers';

async function getTopBooksByCategory() {
  const url = 'https://books-backend.p.goit.global/books/top-books';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Помилка запиту. Статус помилки: ${response.status}`);
    }

    const data = await response.json();
    console.log('По 5 топових книг з кожної категорії: ', data);

    const bestSellersContainer = document.querySelector('.js-list-bestsellers');

    // Очистимо контейнер перед початком виводу
    bestSellersContainer.innerHTML = '';

    // Для кожної категорії створюємо розмітку
    for (const { list_name, books } of data) {
      // Створюємо елемент для заголовку категорії
      const categoryHeader = document.createElement('p');
      // Передаємо йому текстовий вміст
      categoryHeader.textContent = `Category: ${list_name}`;
      // Та розміщуємо у контейнері
      bestSellersContainer.appendChild(categoryHeader);

      // Створюємо елемент списку для розмітки книг
      const booksList = document.createElement('ul');
      // Генеруємо розмітку для книг та додаємо її до списку
    //   booksList.innerHTML = createMarkup(books);

      // Додамо кожну книгу окремо
      books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.innerHTML = createMarkup([book]);
        booksList.appendChild(bookItem);

        // Додаємо кнопку See more
        const btnSeeMore = document.createElement('button');
        btnSeeMore.textContent = 'See more';
        btnSeeMore.classList.add('js-see-more');
        bookItem.appendChild(btnSeeMore);
      });

      bestSellersContainer.appendChild(booksList);

    }
    // Після створення всіх карточок книг і кнопок "See More", додамо обробник події для кожної кнопки
    const seeMoreButtons = document.querySelectorAll('.js-see-more');
    seeMoreButtons.forEach(button => {
      button.addEventListener('click', handleSeeMore);
    });
  } catch (error) {
    console.error(error);
  }
}

export { getTopBooksByCategory };
