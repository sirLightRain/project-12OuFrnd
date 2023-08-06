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
      const card = `
  <div class="card">
   <img class="card__img" src="${cards.book_image}" alt="" loading="lazy" />
   <div class="card__text">
    <h2>${cards.title}</h2>
    <p>${cards.list_name}</p>
    <p>${cards.description}</p>
      <div class="card__links">
        <p>${cards.author}</p>
      </div>
   </div>
   <button class="card__button"></button>
  </div>`;

      return card;
    })
    .join('');
}

export async function makeCard() {
  const cardsArray = await getCards();
  const card = renderCard(cardsArray);

  cardContainer.insertAdjacentHTML('beforeend', card);
}
