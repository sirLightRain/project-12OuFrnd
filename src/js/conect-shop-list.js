import { makeCard } from './shoppingList';

const wrapEmptyDesc = document.querySelector('.wrap-empty-desc');



function initLocalStorage() {
  // получаем в перемен данные из localStorage
  let contentLocalStorage = JSON.parse(localStorage.getItem('list'));
  let lengthContentLocalStorage = contentLocalStorage.length;
  console.log(lengthContentLocalStorage);

  // если длина массива с данными != 0 - ввызываем функцию отрисовки карточек
  if (contentLocalStorage !== null && contentLocalStorage.length !== 0) {
    document.querySelector('.wrap-container-shoppinglist').style.display = 'block';
    document.querySelector('.wrap-empty-desc').style.display = 'none';

    makeCard(contentLocalStorage);
  } else {
    // если в localStorage что-то есть - вызываем отрисовку пустой корзины
    document.querySelector('.wrap-container-shoppinglist').style.display =
      'none';
    document.querySelector('.wrap-empty-desc').style.display = 'block';
  }
}

// запускаем функцию initLocalStorage при загрузке страницы Shopping List
document.addEventListener('DOMContentLoaded', initLocalStorage);
