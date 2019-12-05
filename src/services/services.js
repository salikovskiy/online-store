import axios from "axios";

axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';

export default {
    async getItemCategory(numberCategories, numberPage) {
        return await axios.get(`/ads/all?category=${numberCategories}&page=${numberPage}`);

},
    async getAllCategories(){
    return await axios.get('/ads/all')
    .then(({data}) => data.ads.categories);
    // console.log(dataCategories);
    // return dataCategories
}
};



// axios.get('https://dash-ads.goit.co.ua/ads/all?category=${ номер категории }&page=${ номер страницы }')
