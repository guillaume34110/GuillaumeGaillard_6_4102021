
import {currentGalery} from './photographerPage.js'

let sortedFullData = []

const flexSorting = () => {
const figures = document.querySelectorAll('figure')
figures.forEach(f => {
    sortedFullData.forEach((sd ,index) => {
        if ( f.classList.contains(sd.id)) f.style.order = index
    })
})
}



const sortValue =(e)=>{
    console.log(e)
    const sortButtonValue = e.target.value;
     sortedFullData = []

    if (sortButtonValue === 'popularity' || sortButtonValue === undefined){ 
        sortedFullData = currentGalery
        sortedFullData.sort((a,b) => a.likes > b.likes ? -1:1)
    }
    else if (sortButtonValue === 'Date' ){ 
       sortedFullData = currentGalery
       sortedFullData = sortedFullData.sort(function (a,b){
           const dateA = new Date(a.date).getTime()
           const dateB = new Date(b.date).getTime()
           return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
       })
    }
    else if (sortButtonValue === 'Title' ){ 
        sortedFullData = currentGalery
        sortedFullData.sort((a,b) => a.title > b.title ? 1:-1)
    }

    flexSorting ()
    displayDropDown(sortButtonValue)

} 


const displayDropDown = async(sortButtonValue) => {
    
    const dropdown = document.querySelector('.dropdown-container')
   
    if (!dropdown.classList.contains('dropdown-deploy') ){
    dropdown.classList.add('dropdown-deploy')
    dropdown.innerHTML = `
    <div class = "dropdown-list">
    <button class = "sort-atribute" value = "popularity">Popularité <i class="fa fa-angle-up"></i></button>
    <hr>
    <button class = "sort-atribute" value = "Date">Date</button>
    <hr>
    <button class = "sort-atribute" value = "Title">Titre</button>
    </div>
    `
    const newButtons  = document.querySelectorAll('.sort-atribute')
    newButtons.forEach(e => e.addEventListener('click' , sortValue ))
}
else { console.log('enter')
    dropdown.classList.remove('dropdown-deploy')
    dropdown.innerHTML = `
    <button aria-controls="export-dropdown" aria-expanded="false" class="dropdown btn" >
      <span>${sortButtonValue} </span>
      <i class="fa fa-angle-down"></i>
    </button>
    `
    document.querySelector('.dropdown').addEventListener('click' , displayDropDown )
}
}
document.querySelector('.dropdown').addEventListener('click' , displayDropDown )