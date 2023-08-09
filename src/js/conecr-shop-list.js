const wrapEmptyDesc = document.querySelector('.wrap-empty-desc');

const wrapContainerShoppinglist = (document.querySelector(
  '.wrap-container-shoppinglist'
).style.display = 'none');

function initLocalStorage() {
  // получаем в перемен данные из localStorage
  let contentLocalStorage = localStorage.getItem('add');

  // если длина массива с данными != 0 - ввызываем функцию отрисовки карточек
  if (contentLocalStorage !== null && contentLocalStorage.length !== 0) {
    document.querySelector('.wrap-container-shoppinglist').style.display = ' ';
    document.querySelector('.wrap-empty-desc').style.display = 'none';
  } else {
    // если в localStorage что-то есть - вызываем отрисовку пустой корзины
    document.querySelector('.wrap-container-shoppinglist').style.display =
      'none';
    document.querySelector('.wrap-empty-desc').style.display = ' ';
  }
}

// запускаем функцию initLocalStorage при загрузке страницы Shopping List
document.addEventListener('DOMContentLoaded', initLocalStorage);
