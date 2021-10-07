import { tagsArray } from "../data/tags.js"
import { getJsonData } from "./dependances/getJsonData.js"
import { Photograph } from "./dependances/Objects.js"
import {  sortingArray, tagsEventSettings } from "./dependances/sorting/tagSort.js"

let newData
export let photographArray = []


//draw header tags 
const tagsDraw = () => {
  const currentDiv = document.querySelector(".tags")
  currentDiv.replaceChildren()
  tagsArray.forEach(e => {
    const newButton = document.createElement("li");
    const newContent = document.createTextNode(`#${e}`);
    newButton.classList.add("tag")
    newButton.classList.add(`${e}`)
    newButton.setAttribute("tabindex","0")
    newButton.title = `${e}`
    newButton.appendChild(newContent);
    currentDiv.appendChild(newButton);
  })
 
}
const startDrawMainPage = async() => {
  newData = await getJsonData()
   mapMainPage()
}

const body = document.querySelector("body") 
if (body.classList.contains("main-page")) document.body.onload = startDrawMainPage;


 const removeSections = () => {
  const main = document.querySelector("main")
  main.replaceChildren();
}

const dataSort = () => {
  photographArray = []
  newData.photographData.forEach(e => {
  let sortingToken = 0
  sortingArray.forEach(tag => {
    if (e.tags.includes(tag)) sortingToken ++
  })
    if (sortingToken === sortingArray.length ) photographArray.push(new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait))
  })

}                    

export const mapMainPage = async () => {
  removeSections()
  tagsDraw()
  dataSort()
  const main = document.querySelector("main");
  photographArray.forEach(e => {
    const newSection = document.createElement("section");
    newSection.classList.add(`${e.id}`)
    const newHtml = `
    <a href= "../html/photograph.html?${e.id}">
        <img class = "img-profile-big"src = './assets/SamplePhotos/Photographers/${e.newName}.jpg' alt='photo de profil de ${e.name}' />   
        <h2>${e.name}</h2></a>
        <h3>${e.city},${e.country}</h3>
        <h4>${e.tagline}</h4>
        <p>${e.price}€/jour</p>
        <ul>${e.tags.map(e => {
      return `<li class = "tag ${e}" title="${e}" tabindex="0">#${e}</li>`
    }).join("")}
      </ul>`

    main.appendChild(newSection);
    newSection.innerHTML = newHtml;
  })
  tagsEventSettings() //set event listener on new elements
}


