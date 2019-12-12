import API from '../../services/services';
import axios from 'axios';
import './stylePagination.css';
import itemCard from '../itemCard/itemCard';

// const refs = {
//   input: document.querySelector('.search-input'),
//   main: document.querySelector('.main-section'),
//   form: document.querySelector('form'),
//   ulCont: document.querySelector('.categories'),
// };

export default async function pagination(value) {
  const initialState = {
    categoryNumber: null,
    searchValue: null,
    currentPage: 1,
    totalPages: null,
    categoryArr: [],
    searchArr: [],
    refs: {
      container: null,
      placeForCards: null,
      placeForPaginationButtons: null,
      searchRes: null,
    },
  };

  const state = {
    categoryNumber: null,
    searchValue: null,
    currentPage: 1,
    totalPages: null,
    categoryArr: [],
    searchArr: [],
    refs: {
      container: null,
      placeForCards: null,
      placeForPaginationButtons: null,
      searchRes: null,
    },
  };

  async function getCategoryInfo(categoryNumber) {
    state.categoryNumber = categoryNumber;
    state.refs.container = document.querySelector(`body`);
    state.refs.placeForCards = document.querySelector(`.categoryContainer`);
    state.refs.placeForPaginationButtons = document.querySelector(
      `.overlayPagination`,
    );
    state.totalPages = await axios
      .get(`/ads/all?category=${categoryNumber}&page=${state.currentPage}`)
      .then(data => data.data.ads.totalPages);
    state.categoryArr = await API.getAllItemsWithNumberCategories(
      categoryNumber,
      12,
      state.currentPage,
    );
  }

  async function getSearchInfo(searchValue) {
    state.totalPages = null;
    state.currentPage = 1;
    state.searchValue = searchValue;
    //общий контейнер для всего. Нужен только для того чтобы отловить событие
    state.refs.container = document.querySelector('body');
    //место куда вставлять карточки. Общая ul для конкретной категрии.
    state.refs.placeForCards = document.querySelector('.categories');
    //место, куда вставить кнопки пагинации
    state.refs.placeForPaginationButtons = document.querySelector(
      '.pagination',
    );

    state.searchArr = await axios
      .get(`/ads/all?search=${searchValue}&limit=12&page=${state.currentPage}`)
      .then(data => data.data.ads.docs);
    state.totalPages = await axios
      .get(`/ads/all?search=${searchValue}&limit=12&page=${state.currentPage}`)
      .then(data => data.data.ads.totalPages);
  }

  function createPagination() {
    state.currentPage = 1;
    function pageButtons(pagesCount) {
      let string = '';
      for (let i = 1; i <= pagesCount; i += 1) {
        string += `<button class="pag-btn" data-pagnumber="${i}">${i}</button>`;
      }
      return string;
    }
    return `<div class="pageContainer">
            <div>
                ${pageButtons(state.totalPages)}
            </div>
            <button class="more-btn" data-more="downloadMore">вимагай більше</button>
        </div>`;
  }

  function addListener() {
    const pagBtnsArr = document.querySelectorAll('.pag-btn');
    const moreBtn = document.querySelector('.more-btn');
    pagBtnsArr[0].classList.add('checked');
    state.refs.container.addEventListener('click', e => {
      let card = '';
      if (e.target.nodeName === 'BUTTON' && e.target.dataset.pagnumber) {
        state.currentPage = +e.target.dataset.pagnumber;
        pagBtnsArr.forEach(item => item.classList.remove('checked'));
        e.target.classList.add('checked');
        state.currentPage !== state.totalPages &&
          moreBtn.classList.remove('unvisible');
        state.currentPage === state.totalPages &&
          moreBtn.classList.add('unvisible');

        //вставить отрисовку по номеру страницы ---state.currentPage---
        state.categoryNumber !== null &&
          API.getAllItemsWithNumberCategories(
            state.categoryNumber,
            12,
            state.currentPage,
          )
            .then(data => {
              data.forEach(item => {
                card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
              });
            })
            .finally(() => {
              state.refs.placeForCards.innerHTML = `${card}`;
            });

        state.searchValue !== null && search();
      }

      function search() {
        let searchItem = state.searchValue.toLowerCase();
        console.log('state.currentPage :', state.currentPage);
        API.searchAllItems(searchItem, state.currentPage)
          .then(data => {
            state.refs.placeForCards.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
            return data;
          })
          .then(data => {
            state.refs.searchRes = document.querySelector('.searchResult');
            const card = data.docs
              .map(
                item => `<li class="listcards-itemcard">${itemCard(item)}</li>`,
              )
              .join('');
            state.refs.searchRes.insertAdjacentHTML('beforeend', card);
          });
      }

      if (e.target.nodeName === 'BUTTON' && e.target.dataset.more) {
        let card = '';
        pagBtnsArr.forEach((item, index) => {
          index === state.currentPage &&
            pagBtnsArr[index].classList.add('checked');
        });
        state.currentPage += 1;
        state.currentPage === state.totalPages &&
          moreBtn.classList.add('unvisible');
        //добавить отрисовку по номеру страницы ---state.currentPage---

        state.categoryNumber !== null &&
          API.getAllItemsWithNumberCategories(
            state.categoryNumber,
            12,
            state.currentPage,
          )
            .then(data => {
              data.forEach(item => {
                card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
              });
            })
            .finally(() => {
              state.refs.placeForCards.insertAdjacentHTML('beforeend', card);
            });
        state.searchValue !== null && search2();
        function search2() {
          let searchItem = state.searchValue.toLowerCase();
          API.searchAllItems(searchItem, state.currentPage).then(data => {
            state.refs.searchRes = document.querySelector('.searchResult');
            const card = data.docs
              .map(
                item => `<li class="listcards-itemcard">${itemCard(item)}</li>`,
              )
              .join('');
            state.refs.searchRes.insertAdjacentHTML('beforeend', card);
            // if (data.totalPages > 1) {
            //   const paginationNav = `<div class='overlayPagination'></div>`;
            //   searchRes.insertAdjacentHTML('beforeend', paginationNav);
            // }
          });
        }
      }
    });
  }

  value.constructor === Number && (await getCategoryInfo(value));
  value.constructor === String && (await getSearchInfo(value));
  if (state.totalPages > 1) {
    state.refs.placeForPaginationButtons.innerHTML = await createPagination(
      state.totalPages,
    );
    await addListener();
  }
  if (state.totalPages === 1 && state.categoryNumber !== null) {
    let card = '';
    API.getAllItemsWithNumberCategories(
      state.categoryNumber,
      12,
      state.currentPage,
    )
      .then(data => {
        data.forEach(item => {
          card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
        });
      })
      .finally(() => {
        state.refs.placeForCards.innerHTML = `${card}`;
        state.refs.placeForPaginationButtons.classList.add('unvisible');
      });
  }

  if (state.totalPages === 1 && state.searchValue !== null) {
    let card = '';

    let searchItem = state.searchValue.toLowerCase();
    API.searchAllItems(searchItem, state.currentPage)
      .then(data => {
        console.log(data);

        state.refs.placeForCards.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
        return data;
      })
      .then(data => {
        state.refs.searchRes = document.querySelector('.searchResult');
        card = data.docs
          .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
          .join('');

        // if (data.totalPages > 1) {
        //   const paginationNav = `<div class='overlayPagination'></div>`;
        //   searchRes.insertAdjacentHTML('beforeend', paginationNav);
        // }
      })
      .finally(() => {
        state.refs.placeForPaginationButtons.classList.add('unvisible');
        state.refs.searchRes.insertAdjacentHTML('beforeend', card);
      });
  }
  if (state.totalPages > 1 && state.searchValue !== null) {
    let card = '';
    let searchItem = state.searchValue.toLowerCase();
    API.searchAllItems(searchItem, state.currentPage)
      .then(data => {
        console.log(data);

        state.refs.placeForCards.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
        return data;
      })
      .then(data => {
        state.refs.searchRes = document.querySelector('.searchResult');
        card = data.docs
          .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
          .join('');
      })
      .finally(() => {
        state.refs.searchRes.insertAdjacentHTML('beforeend', card);
        state.refs.placeForPaginationButtons.classList.remove('unvisible');
      });
  }
}
// pagination(3);
// pagination('nin');
