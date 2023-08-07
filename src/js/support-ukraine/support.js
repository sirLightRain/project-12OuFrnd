import charities from './charities';
import Swiper from 'swiper';
import { Navigation } from 'swiper';

import 'swiper/swiper.min.css';

const list = document.querySelector('.support-list');

const html = charities.map(makeMarkup).join('');

function makeMarkup({ url, title, img }, index) {
  const digits = (index + 1).toString().padStart(2, '0');

  return `
  <li class="swiper-slide">
        <div class="support-item">
        <span class="support-index">${digits}</span>
        <a class="support-link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
            <img
                srcset="${img}" 1x
                src="${img}" type="image/png" alt="${title}">
        </a>
    </li>`;
}

list.innerHTML = html;

const str = charities.map((element, index) => {
  return '<li class="support-item"> посилання на фонд <a class="support-link" href=""></a></li>';
});

const swipeDownBtn = document.querySelector('.swiper-next');
swipeDownBtn.addEventListener('click', onNext);

function onNext() {
  swiper.slideNext(250);
}

const swiper = new Swiper(swiperEl, {
  direction: 'vertical',
  rewind: true,
  loopSlides: 9,
  navigation: {
    nextEl: swipeDownBtn,
  },
  slidesPerView: 4,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
});
