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




// mkmkmkmk
// Функція, що отримує книги та додає їх на сторінку з пагінацією
let cardsPerPage;
let pageNumb = 1;
export async function getAllBooks() {
  if (window.innerWidth < 768) {
    cardsPerPage = 4;
  } else  (window.innerWidth >= 768 && window.innerWidth < 1200) {
    cardsPerPage = 3;
    } 
    
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { limit: cardsPerPage, page: pageNumb },
    });
    const { results } = response.data;

    // Створюємо карточки книг та додаємо їх на сторінку
    const booksCards = results.map(generateBookCard).join('');
    if (booksContainer) {
      booksContainer.innerHTML = booksCards;
    }
    console.log(cardsPerPage);
    addToShopList();
  } catch (error) {
    console.log(error);
  }
}

export async function getBooksByCategory(category) {
  const API_URL = `https://books-backend.p.goit.global/books/category?category=${category}&limit=${cardsPerPage}&page=${pageNumb}`;

  try {
    const response = await axios.get(API_URL);
    const { results } = response.data;
    renderBooksRecipes(results);
    const shoppingListEl = document.querySelectorAll('.card-checkbox'); // масив усіх обраних книг

    let selectedBooksBox = [];

    // Функція для обробки зміни стану обраних книг

    function handleCartChange(event) {
      const checkbox = event.target; // елемент на який клікаємо <input>

      const checkboxId = checkbox.id;

      // дістати всю інформацію з картки за запушити її у масив

      if (checkbox.checked) {
        selectedBooksBox.push(checkboxId);
      } else {
        // Перевіряємо, чи елемент міститься у списку вибраних перед тим, як його видалити
        const index = selectedBooksBox.indexOf(checkboxId);
        if (index !== -1) {
          selectedBooksBox.splice(index, 1);
        }
      }

      const selectedBooksElLocalStorage = JSON.stringify(selectedBooksBox);
      localStorage.setItem('inCart', selectedBooksElLocalStorage);
    }

    // Додаємо обробник подій для кожного чекбокса
    selectedBooksBox.forEach(checkbox => {
      checkbox.addEventListener('change', handleShopListChange);
    });

    // Перевіряємо, чи є збережені дані в локальному сховищі
    const storedData = localStorage.getItem('inCart');
    if (storedData) {
      // Розпарсуємо дані з локального сховища назад у масив
      selectedBooksBox = JSON.parse(storedData);

      // Відновлюємо стан корзини на основі збережених значень
      selectedBooksBox.forEach(checkbox => {
        const checkboxId = checkbox.id;
        if (selectedBooksBox.includes(checkboxId)) {
          checkbox.checked = true;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

//////Кнопки-перемикачі сторінок/////
const backToFirstPage = document.querySelector('#pag-btn-start');
const pageOneBtn = document.querySelector('#pag-btn-1');
export const pageTwoBtn = document.querySelector('#pag-btn-2');
const pageThreeBtn = document.querySelector('#pag-btn-3');
const lastPageBtn = document.querySelector('#pag-btn-last');
const nextPagePagBtn = document.querySelector('#pag-btn-next');
const buttonNumered = document.querySelectorAll('.pag-btn-number');
const previousPageButton = document.querySelector('#pag-btn-prev');
const allCategoriesButton = document.getElementById('all-categories-button');

function changeButtonColor() {
  buttonNumered.forEach(button => {
    const pageNum = parseInt(button.textContent);
    if (pageNum === pageNumb) {
      button.classList.add('pag-btn-on-hover');
    } else {
      button.classList.remove('pag-btn-on-hover');
    }
  });
}

async function loadPage(page) {
  let category = '';
  let categoryActive = document.querySelectorAll('.category-item');
  categoryActive.forEach(categoryListItem => {
    if (categoryListItem.classList.contains('active')) {
      category = categoryListItem.firstElementChild.textContent;
      console.log(category);
    }
  });
  pageNumb = page;
  console.log(pageNumb);
  try {
    const response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&limit=${cardsPerPage}&page=${pageNumb}`
    );

    console.log(response.data);
    const { results } = response.data;
    // Створюємо карточки рецептів та додаємо їх на сторінку
    const recipeCards = results.map(generateRecipeCard).join('');
    if (recipesContainer) {
      recipesContainer.innerHTML = recipeCards;
    }
    changeButtonColor();
    addToFavorite();
  } catch (error) {
    console.log(error);
  }
}
window.addEventListener('load', async () => {
  if (window.innerWidth < 768) {
    cardsPerPage = 6;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
    cardsPerPage = 8;
  } else {
    cardsPerPage = 9;
  }
  await loadPage(pageNumb);
});

export const backToFirst = async () => {
  pageNumb = 1;
  try {
    await loadPage(pageNumb);
    pageOneBtn.textContent = 1;
    pageTwoBtn.textContent = 2;
    pageThreeBtn.textContent = 3;
  } catch (error) {
    console.log(error);
  }
};

////Функція яка включає першу сторінку рецептів/////
const loadfirstPage = async () => {
  pageNumb = parseInt(pageOneBtn.textContent);
  try {
    await loadPage(pageNumb);
  } catch (error) {
    console.log(error);
  }
};
//
////Функція яка включає 2 сторінку рецептів/////

export async function loadPageTwo() {
  pageNumb = parseInt(pageTwoBtn.textContent);
  try {
    await loadPage(pageNumb);
  } catch (error) {
    console.log(error);
  }
}

//
////Функція яка включає на 3 сторінку рецептів/////
async function loadPageThree() {
  pageNumb = parseInt(pageThreeBtn.textContent);
  try {
    await loadPage(pageNumb);
  } catch (error) {
    console.log(error);
  }
}
//
////Функція яка перемикає на наступну сторінку рецептів/////
const loadNextPage = async () => {
  buttonNumered.forEach(button => {
    button.textContent++;
    // pageNumb=button.textContent
  });
  const nextPage = pageNumb + 1;
  try {
    await loadPage(nextPage);
  } catch (error) {
    console.log(error);
  }
};

////Функція яка повертає на попередню сторінку рецептів/////
async function loadPrevPage() {
  if (pageOneBtn.textContent != '1') {
    buttonNumered.forEach(button => {
      button.textContent--;
      // pageNumb=button.textContent
    });
  }
  const prevPage = pageNumb - 1;
  try {
    await loadPage(prevPage);
  } catch (error) {
    console.log(error);
  }
}
////Функція яка повертає на останню сторінку книг/////
const loadLastPage = async () => {
  if (window.innerWidth < 768) {
    pageNumb = 30;
  } else (window.innerWidth >= 768 && window.innerWidth < 1200) {
    pageNumb = 20;
    }
    
  try {
    await loadPage(pageNumb);

    pageThreeBtn.textContent = pageNumb;

    pageTwoBtn.textContent = pageNumb - 1;
    pageOneBtn.textContent = pageNumb - 2;
    //    }
  } catch (error) {
    console.log(error);
  }
};
//
// ---------------------------------------------------------------------------------------------------------------------------------------

backToFirstPage.addEventListener('click', backToFirst);
pageOneBtn.addEventListener('click', loadfirstPage);
pageTwoBtn.addEventListener('click', loadPageTwo);
pageThreeBtn.addEventListener('click', loadPageThree);
lastPageBtn.addEventListener('click', loadLastPage);
previousPageButton.addEventListener('click', loadPrevPage);
nextPagePagBtn.addEventListener('click', loadNextPage);

function renderRecipes(recipes) {
  const recipeCards = recipes.map(generateRecipeCard).join('');
  recipesContainer.innerHTML = recipeCards;
}
