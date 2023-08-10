import { makeCard } from './js/shoppingList';

// це приклад використання моєї функції, я думаю що її треба викликати в файлі де виконується перевірка на наявність даних у
// localStorage
const getData = JSON.parse(localStorage.getItem('list'));
// 

makeCard(getData);
