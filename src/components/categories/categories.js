import services from './../../services/services'
// import listCategories from '../templates/listCategories.hbs'


const refs = {
    contanierCategories: document.querySelector(".contanier-categories")
    
} 

const curentItems = (numberCategories, numberPage) => {
    services.getItemCategory(numberCategories, numberPage).
    then(({data}) => console.log(data.ads))
}
const arrAllCategories = () =>{
     services.getAllCategories().
then(data => {
    // console.log(data);
    return data.map(dataItem => dataItem.category)
}).then(listCategories => {
    drawListCategories(listCategories)
    console.log(listCategories)
    
} )
}
arrAllCategories()
// console.log("массив категорий", arrAllCategories());

const drawListCategories = (listCategories) => {
    for (let i = 0; i < listCategories.length; i++){
        console.log("длина массива равна", listCategories.length );
        // console.log(listCategories);
        let string = `<li class="itemCategories">${listCategories[i]}</li>`
        console.log(string);
        refs.contanierCategories.insertAdjacentHTML('beforeend', string);
    }
}

