import {
  renderingBookCard,
  renderingBookCardAll,
  renderingBookBestSellers,
  showLoadingMessage,
  hideLoadingMessage,
} from './selected-category';

import Notiflix from 'notiflix';
const listOfAllCategories = document.querySelector('.list-of-all-categories');

// load All Categories
async function loadAllCategories() {
  const server = 'https://books-backend.p.goit.global/books/category-list';
  const responce = await fetch(server, {
    method: 'GET',
  });
  const responceResult = await responce.json();
  console.log('Category:', responceResult);
  if (responceResult) {
    displayCategoryList(responceResult);
  } else {
    listOfAllCategories.innerHTML = responceResult.message;
  }
}

// display a Category List
function displayCategoryList(data) {
  let html = `<li class="categor_item all_catecor"><a class="categor_link">All categories</a></li>`;
  data.forEach(function (item) {
    html += `
      <li class="categor_item" id="${item.list_name}">
      <a class="categor_link">
      ${item.list_name}
        </a>
      </li>`;
  });
  listOfAllCategories.innerHTML = html;

  const items = document.querySelectorAll('.categor_item');
  items.forEach(i => {
    i.addEventListener('click', selectedCategory);
  });

  document
    .querySelector('.all_catecor')
    .addEventListener('click', loadTopBooks);
}

// load Top Books
async function loadTopBooks() {
  const serverTopBooks = 'https://books-backend.p.goit.global/books/top-books';
  const responce = await fetch(serverTopBooks, {
    method: 'GET',
  });
  const responceResult = await responce.json();
  // Notiflix.Report.success('Title', 'Message', 'Button Text');

  console.log('Top books: ', responceResult);
  if (responceResult) {
    // Show loading message
    showLoadingMessage();
    renderingBookCardAll(responceResult);
  } else {
    loadAllCategories.innerHTML = responceResult.message;
  }
}

// selected Category
async function selectedCategory(event) {
  if (event.currentTarget.id) {
    const serverCategory = `https://books-backend.p.goit.global/books/category?category=${event.currentTarget.id}`;
    const responce = await fetch(serverCategory, {
      method: 'GET',
    });
    const responceResult = await responce.json();
    try {
      Notiflix.Loading.dots();

      const response = await renderingBookCardAll();
      if (response) {
        console.log(response);

        setTimeout(() => {
          Notiflix.Loading.remove();
          setTimeout(() => {
            const selectedResult = () => total;
            Notiflix.Report.success(
              `Good choise! We found ${selectedResult} books.`
            );
          }, 800);
        }, 1600);
      } else {
        Notiflix.Loading.remove();
        Notiflix.Report.warning(
          'Sorry, there are temporarily no books in this category. Please try again',
          'Ok'
        );
      }
    } catch (err) {
      console.error(err);
    }

    console.log('selected Category: ', responceResult);
  }
}

if (listOfAllCategories) {
  loadAllCategories();
  loadTopBooks();
}
