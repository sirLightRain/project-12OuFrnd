//! =============== All categories list
import { loadAllCategories, loadTopBooks } from './js/allCatMenu/allCategories';
const listOfAllCategories = document.querySelector('.list-of-all-categories');

if (listOfAllCategories) {
  loadAllCategories();
  loadTopBooks();
}
//! =============== All categories list
