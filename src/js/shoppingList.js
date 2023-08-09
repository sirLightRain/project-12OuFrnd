import axios from 'axios';

const cardContainer = document.querySelector('.cards-container');

async function getCards() {
  const getCards = await axios
    .get('https://books-backend.p.goit.global/books/top-books')
    .then(r => {
      const data = r.data[1];

      return data.books;
    });

  return getCards;
}

function renderCard(a) {
  return a
    .map(cards => {
      console.log(cards);

      const card = `
  <div class="card">
   <img class="card__img" src="${cards.book_image}" alt="" loading="lazy" />
   <div class="card__text">
    <div class="card__top">
      <div>
        <h2 class="card__title">${cards.title}</h2>
        <p class="card__genre">${cards.list_name}</p>
      </div>
      <button class="card__button">
        <svg width="16" height="16">
            <use href="./images/favicon.svg#icon-trash"></use>
        </svg>  
      </button>
    </div>
    <p class="card__description">${cards.description}</p>
      <div class="card__bottom">
        <p class="card__author">${cards.author}</p>
        <div class="card__links">
            <a class="card__link" href="${cards.buy_links[0].url}"
              ><svg width="32" height="11">
                <use href="./images/favicon.svg#icon-amazon"></use>
            </svg>      
            </a>
            <a class="card__link" href="${cards.buy_links[1].url}"
              ><svg width="16" height="16">
                <use href="./images/favicon.svg#icon-book"></use>
            </svg>
            </a>
            <a class="card__link" href="${cards.buy_links[2].url}"
              ><svg width="16" height="16">
                <use href="./images/favicon.svg#icon-bs"></use>
            </svg>
            </a>
        </div>
      </div>
   </div>
   
  </div>`;

      return card;
    })
    .join('');
}

export async function makeCard() {
  const cardsArray = await getCards();
  const card = renderCard(cardsArray);

  cardContainer.insertAdjacentHTML('afterbegin', card);
}
