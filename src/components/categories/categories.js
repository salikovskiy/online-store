import services from './../../services/services'
// import listCategories from '../templates/listCategories.hbs'


const refs = {
    contanierCategories: document.querySelector(".contanierCategories")
    
} 

const curentItems = (numberCategories, numberPage) => {
    services.getItemCategory(numberCategories, numberPage).
    then(({data}) => console.log(data.ads))
}
const arrAllCategories = () =>{
     services.getAllCategories().
then(data => {
    // console.log(data);
    const listCategories = data.map(dataItem => dataItem.category)
    // console.log(listCategories);
    return listCategories
})
}
console.log("массив категорий", arrAllCategories);
console.log("длина массива равна", arrAllCategories.length );

const drawListCategories = () => {
    for (let i = 0; i <= arrAllCategories.length; i++){
        console.log(arrAllCategories);
        let string = `<li class="itemCategories">${arrAllCategories[i]}</li>`
        console.log(string);
        refs.contanierCategories.insertAdjacentHTML('beforeend', string);
    }
}

drawListCategories()


// console.log("список всех категорий", services.getAllCategories());
// services.getAllCategories();

// console.log("список всех категорий", arrAllCategories);
// console.log(" объявления по запросу", curentItems);
arrAllCategories()
curentItems(8, 1)