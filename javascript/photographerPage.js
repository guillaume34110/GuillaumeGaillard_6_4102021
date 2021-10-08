
import { getJsonData } from "./dependances/getJsonData.js"
import { Galery, Photograph } from "./dependances/Objects.js"
import { sortingArray, tagsEventSettings } from "./dependances/sorting/tagSort.js"
import { lightBoxEventSettings } from "./dependances/modals/lightbox.js"
import { heartEventListener, likesDrawWidget } from "./dependances/likes.js"
import { formEventListener } from "./dependances/modals/contactForm.js"
import { sortValue } from "./dependances/sorting/dropDownMenu.js"



let fullData
let photographerId
export let currentPhotographer
export let currentGalery

const getId = () => {
    return window.location.href.split("?").pop()
}
const createPhotograph = () => {
    fullData.photographData.forEach(e => {
        if (e.id.toString() === photographerId)
            currentPhotographer = new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait)
    })
}
const removeFigures = () => {
    const section = document.querySelector("section")
    section.replaceChildren();
  }
const createGalery = () => {
    currentGalery = []
    fullData.mediaData.forEach(e => {
        if (e.photographerId.toString() === photographerId) {
            let sortingToken = 0
            sortingArray.forEach(tag => {
                if (e.tags.includes(tag)) sortingToken++
            })
            if (sortingToken === sortingArray.length) {
                if (e.image !== undefined) currentGalery.push(new Galery(e.id, e.photographerId, e.title, e.image, undefined, e.likes, e.date, e.price))
                if (e.video !== undefined) currentGalery.push(new Galery(e.id, e.photographerId, e.title, undefined, e.video, e.likes, e.date, e.price))
            }
        }
    })
}

 export const sectionsDraw = (e) => {
    removeFigures()
    createGalery()
    sortValue(e)
    const section = document.querySelector("section")
    currentGalery.forEach(e => {
        const newSection = document.createElement("figure");
        newSection.classList.add(`${e.id}`)
        
        const pathName = currentPhotographer.name.split(" ")[0];
        let newHtml
        if (e.image) newHtml = `
        
        <img tabindex = "0" id = "${e.id}"class = "img-galery" src = './assets/SamplePhotos/${pathName}/${e.image}' alt='${e.title}' title ="${e.title}" />   
           
            `
        if (e.video) newHtml = `
            
            <video id = "${e.id}" title ="${e.title}" class ="video" width="350" height="300"   >
            <source src="./assets/SamplePhotos/${pathName}/${e.video}" type="video/mp4">
            Your browser does not support the video tag.
            </video>
         
                `
        newHtml =  newHtml +`    
        <div  class = "galery-footer">  
            <h3>${e.title}</h3>
            <div class ="galery-like">
            <p id="p${e.id}">${e.likes}</p>
            <i tabindex = "0" aria-label="Like icon clickable" id="i${e.id}" class ="fas fa-heart"></i>
            </div>
        </div>`
        section.appendChild(newSection);
        newSection.innerHTML = newHtml;
    })
    likesDrawWidget()
    tagsEventSettings()
    lightBoxEventSettings()
    heartEventListener()
    formEventListener()
}

export const ArticleDraw = () => {
    
    photographerId = getId()
    createPhotograph()
    const cP = currentPhotographer
    const article = document.querySelector("article")
    const newHtml = `
        <img class = "img-profile-big"src = './assets/SamplePhotos/Photographers/${cP.newName}.jpg' alt='photo de profil de ${cP.name}' />  
        <div class = 'article-left-container'>
        <div>
        <h2>${cP.name}</h2>
        <h3>${cP.city},${cP.country}</h3>
        <h4>${cP.tagline}</h4>
        <ul>${cP.tags.map(e => {
        return `<li class = "tag ${e}" title="${e}" tabindex ="0">#${e}</li>`
    }).join("")}
      </ul>
      </div>
      <button class ="btn btn-article btn-contact">Contactez-moi</button> 
      </div>`

    article.innerHTML = newHtml;
    sectionsDraw()
}
const startDrawPhotographPage = async() => {
    fullData = await getJsonData()
    ArticleDraw()
}

const body = document.querySelector("body") 
if (body.classList.contains("photograph-pages"))document.body.onload =  startDrawPhotographPage ;