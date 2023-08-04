const urlList = {
    // API з книгами
    API_BOOKS: 'https://books-backend.p.goit.global/api-docs/',
    // Перелік категорій книг
    ALL_CATEGORY: 'https://books-backend.p.goit.global/books/category-list',
    // Популярні книги, що належать до усіх категорій
    ALL_CAT_POP_B: 'https://books-backend.p.goit.global/books/top-books',
    // Книги окремої категорії
    CERTAIN_CAT_B: 'https://books-backend.p.goit.global/books/category?category=${category_name}',
    // Детальна інформація про книгу
    INFO_B: 'https://books-backend.p.goit.global/books/bookId'
}

function fetchBestSellers() {
  fetch(urlList.ALL_CAT_POP_B)
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(data => {
      console.log('Популярні книги, що належать до усіх категорій: ', data);
    })
    .catch(err=>console.log(err))
}

export { fetchBestSellers };
