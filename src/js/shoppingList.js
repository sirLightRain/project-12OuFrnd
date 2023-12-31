import axios from 'axios';

const cardContainer = document.querySelector('.cards-container');

async function getCards(a) {
  const getCards = await axios.get(a).then(r => {
    return r.data;
  });

  return getCards;
}

function acceptLink(l) {
  return l.map(m => {
    return getCards(m);
  });
}

function renderCard(a) {
  const booksArray = a.map(book => {
    return book.then(i => {
      const card = `
      <div class="card">
       <img class="card__img" src="${i.book_image}" alt="" loading="lazy" />
       <div class="card__text">
        <div class="card__top">
          <div class="book-name-width">
            <h2 class="card__title">${i.title}</h2>
            <p class="card__genre">${i.list_name}</p>
          </div>
          <button class="card__button">
            <svg width="16" height="16">
                <use href="./images/favicon.svg#icon-trash"></use>
            </svg>
          </button>
        </div>

        
          <p class="card__description">${i.description}</p>
        

          <div class="card__bottom">
            <p class="card__author">${i.author}</p>
            <div class="card__links">
                <a class="card__link" href="${i.buy_links[0].url}"
                  ><svg width="32" height="11">
                    <use href="../images/favicon.svg#icon-amazon"></use>
                </svg>
                </a>
                <a class="card__link" href="${i.buy_links[1].url}"
                  ><svg width="16" height="16">
                    <use href="./images/favicon.svg#icon-book"></use>
                </svg>
                </a>
                <a class="card__link" href="${i.buy_links[2].url}"
                  ><svg width="16" height="16">
                    <use href="./images/favicon.svg#icon-bs"></use>
                </svg>
                </a>
            </div>
          </div>
       </div>
      </div>`;

      return card;
    });
  });

  return Promise.all(booksArray).then(bookInfo => {
    return bookInfo
      .map(w => {
        return w;
      })
      .join('');
  });
}

function deleteCard() {
  let bookId = [];

  cardContainer.addEventListener('click', e => {
    const books = JSON.parse(localStorage.getItem('list'));
    const currentCard = e.target.parentNode.parentNode.parentNode;

    if (e.target.tagName === 'BUTTON') {
      const title =
        e.target.previousElementSibling.firstElementChild.textContent;

      Promise.all(acceptLink(books)).then(book => {
        book.map(b => {
          if (b.title === title) {
            bookId = `https://books-backend.p.goit.global/books/${b._id}`;
            const i = books.indexOf(bookId);

            currentCard.remove();
            books.splice(i, 1);

            localStorage.setItem('list', JSON.stringify(books));
          }
        });
      });
    } else if (e.target.parentNode.tagName === 'BUTTON') {
      const title =
        e.target.parentNode.previousElementSibling.firstElementChild
          .textContent;

      Promise.all(acceptLink(books)).then(book => {
        book.map(b => {
          if (b.title === title) {
            bookId = `https://books-backend.p.goit.global/books/${b._id}`;
            const i = books.indexOf(bookId);

            currentCard.parentNode.remove();
            books.splice(i, 1);

            localStorage.setItem('list', JSON.stringify(books));
          }
        });
      });
    }
    return;
  });
}

export async function makeCard(data) {
  const cardsArray = acceptLink(data);
  const card = await renderCard(cardsArray);

  cardContainer.insertAdjacentHTML('afterbegin', card);

  deleteCard();
}
