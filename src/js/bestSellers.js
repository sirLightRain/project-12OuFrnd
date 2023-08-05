
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Мій Код


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Код ОЛега 

const container = document.querySelector('.js-list-bestsellers');
const PRODUCT_LS_KEY = 'Shopping List';

// container.insertAdjacentHTML('beforeend', createMarkup(topBooks));
container.addEventListener('click', handlerAdd);

function createMarkup(arr) {
  return arr
    .map(
      ({ _id, book_image, list_name, author }) => `
    <li data-id="${_id}" class="js-product">
        <img src="${book_image}" alt="${list_name}" width="335" height="485"/>
        <h3>${list_name}</h3>
        <p>${author}</p>
    </li>
    `
    )
    .join('');
}

function handlerAdd(evt) {
  if (!evt.target.classList.contains('js-add')) {
    return;
  }

  const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) ?? [];
  const product = evt.target.closest('.js-product');
  const productId = Number(product.dataset.id);
  const currentProduct = topBooks.find(({ id }) => id === productId);
  const idx = products.findIndex(({ id }) => id === productId);

  if (idx !== -1) {
    products[idx].qty += 1;
  } else {
    currentProduct.qty = 1;
    products.push(currentProduct);
  }
  localStorage.setItem(PRODUCT_LS_KEY, JSON.stringify(products));
}

function test(name) {
  console.log(`Hi, ${name}`);
}

export { createMarkup };
