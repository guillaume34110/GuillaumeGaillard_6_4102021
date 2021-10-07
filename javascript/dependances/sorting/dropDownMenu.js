
import {currentGalery, sectionsDraw} from "../../photographerPage.js"

let sortedFullData = []


export const sortValue =(e)=>{
    console.log(e)
    let sortButtonValue
    if (e?.target.value) sortButtonValue = e.target.value;
    else  { 
        sortButtonValue = "First" ///start protection
     }
    
    sortedFullData = []

    if (sortButtonValue === "Popularité" || sortButtonValue === "First"){ 
        sortedFullData = currentGalery
        sortedFullData.sort((a,b) => a.likes > b.likes ? -1:1)
    }
    else if (sortButtonValue === "Date" ){ 
       sortedFullData = currentGalery
       sortedFullData = sortedFullData.sort(function (a,b){
           const dateA = new Date(a.date).getTime()
           const dateB = new Date(b.date).getTime()
           return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
       })
    }
    else if (sortButtonValue === "Titre" ){ 
        sortedFullData = currentGalery
        sortedFullData.sort((a,b) => a.title > b.title ? 1:-1)
    }
    displayDropDown(sortButtonValue)
} 


const displayDropDown = async(sortButtonValue) => {
    if (sortButtonValue !== "First"){
    const dropdown = document.querySelector(".dropdown-container")
   
    if (!dropdown.classList.contains("dropdown-deploy") ){
    dropdown.classList.add("dropdown-deploy")
    dropdown.innerHTML = `
    <div class = "dropdown-list">
    <button class = "sort-atribute" value = "Popularité">Popularité <i class="fa fa-angle-up"></i></button>
    <hr>
    <button class = "sort-atribute" value = "Date">Date</button>
    <hr>
    <button class = "sort-atribute" value = "Titre">Titre</button>
    </div>
    `
    const newButtons  = document.querySelectorAll(".sort-atribute")
    newButtons.forEach(e => e.addEventListener("click" , sectionsDraw ))
}
else { console.log("enter")
    dropdown.classList.remove("dropdown-deploy")
    dropdown.innerHTML = `
    <button aria-controls="export-dropdown" aria-expanded="false" class="dropdown btn" >
      <span>${sortButtonValue} </span>
      <i class="fa fa-angle-down"></i>
    </button>
    `
    document.querySelector(".dropdown").addEventListener("click" , displayDropDown )
}}
}
document.querySelector(".dropdown")?.addEventListener("click" , displayDropDown )