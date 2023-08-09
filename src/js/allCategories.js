import { renderingBookCard } from './selected-category';
import { renderingBookCardAll } from './selected-category';
import { renderingBookBestSellers } from './selected-category';
import Notiflix from 'notiflix';

//! ================
import { displayTopBooksByCategory } from './bestsellere/bestSellersOleksii'; 
//! ================ 

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
    // .addEventListener('click', loadTopBooks);
    .addEventListener('click', displayTopBooksByCategory);
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
    renderingBookCard(responceResult);
    console.log('selected Category: ', responceResult);
  }
}

if (listOfAllCategories) {
  loadAllCategories();
  displayTopBooksByCategory();
}
