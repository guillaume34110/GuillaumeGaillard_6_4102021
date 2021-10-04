import { tagsArray } from '../data/tags.js'
import { getJsonData } from './getJsonData.js'


const tagsDraw = () => {

  tagsArray.forEach(e => {
    const newButton = document.createElement('li');
    const newContent = document.createTextNode(e);
    newButton.appendChild(newContent);
    const currentDiv = document.querySelector('.tags')
    currentDiv.appendChild(newButton);
  })
  mapMainPage()
}



function Photograph(name, id, city, country, tags, tagline, price, portrait) {
  this.name = name
  this.id = id;
  this.city = city;
  this.country = country;
  this.tags = tags
  this.tagline = tagline
  this.price = price
  this.portrait = portrait

  /*this.bio = function() {
    alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  };*/
}



const mapMainPage = async () => {
  const photographArray = []
  const newData = await getJsonData()
  newData.photographData.forEach(e => {
    photographArray.push(new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait))
  })
  console.log(photographArray, "photographArray")
  photographArray.forEach(e => {
    const main = document.querySelector('main')
    const newSection = document.createElement('section');
    const newName = e.name.replace(/ /g, "");
    console.log(newName, 'new')
    const newHtml = `
        <img src = './assets/SamplePhotos/Photographers/${newName}.jpg' alt='photo de profil de ${e.name}' />
        <h2>${e.name}</h2>
        <h3>${e.city},${e.country}</h3>
        <h4>${e.tagline}</h4>
        <p>${e.price}</p>
        <ul>${e.tags.map(e => {
      return `<li>#${e}</li>`
    }).join("")}
      </ul>
        `

    main.appendChild(newSection);
    newSection.innerHTML = newHtml;
  })
}

document.body.onload = tagsDraw;
