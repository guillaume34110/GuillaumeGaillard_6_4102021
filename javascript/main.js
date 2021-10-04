import { tagsArray } from '../data/tags.js'
import { getJsonData } from './getJsonData.js'
import { eventSettings, sortingArray } from './tagSort.js'

let newData
export let photographArray = []

function Photograph(name, id, city, country, tags, tagline, price, portrait) {

  this.name = name
  this.id = id;
  this.city = city;
  this.country = country;
  this.tags = tags
  this.tagline = tagline
  this.price = price
  this.portrait = portrait

}

const tagsDraw = async () => {
  tagsArray.forEach(e => {
    const newButton = document.createElement('li');
    const newContent = document.createTextNode(`#${e}`);
    newButton.classList.add(`tag`)
    newButton.classList.add(`${e}`)
    newButton.title = `${e}`
    newButton.appendChild(newContent);
    const currentDiv = document.querySelector('.tags')
    currentDiv.appendChild(newButton);
  })
  newData = await getJsonData()
  await mapMainPage()
}
document.body.onload = tagsDraw;



const removeSections = () => {
  const sections = document.querySelectorAll('.section')
  sections.forEach(section =>{
    section.remove();
  })
  const main = document.querySelector('main')
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
  dataSort()
  photographArray.forEach(e => {
    const main = document.querySelector('main');
    const newSection = document.createElement('div');
    newSection.classList.add(e.id)
    newSection.classList.add('section')
    const newName = e.name.replace(/ /g, "");
    console.log(newName, 'new')
    const newHtml = `
        <img class = "img-profile-big"src = './assets/SamplePhotos/Photographers/${newName}.jpg' alt='photo de profil de ${e.name}' />   
        <h2>${e.name}</h2>
        <h3>${e.city},${e.country}</h3>
        <h4>${e.tagline}</h4>
        <p>${e.price}€/jour</p>
        <ul>${e.tags.map(e => {
      return `<li class = "tag ${e}" title="${e}">#${e}</li>`
    }).join("")}
      </ul>`

    main.appendChild(newSection);
    newSection.innerHTML = newHtml;
  })
  eventSettings() //set event listener on new elements
}


