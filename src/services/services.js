// export default {};

const refs = {
  searchForm: document.querySelector('#search-form'),
  arcticleList: document.querySelector('.gallery'),
};

refs.searchForm('submit', searchFormSubmitHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();

  console.log(e.currentTarget);
}
