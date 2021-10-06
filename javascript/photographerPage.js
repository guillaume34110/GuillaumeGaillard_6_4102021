
import { getJsonData } from './dependances/getJsonData.js'
import { Galery, Photograph } from './dependances/Objects.js'
import { sortingArray, tagsEventSettings } from './dependances/sorting/tagSort.js'
import { lightBoxEventSettings } from './modals/lightbox.js'


let fullData
let photographerId
let currentPhotographer
export let currentGalery

const getId = () => {
    return window.location.href.split('?').pop()
}
const createPhotograph = () => {
    fullData.photographData.forEach(e => {
        if (e.id.toString() === photographerId)
            currentPhotographer = new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait)
    })
}
const removeFigures = () => {
    const section = document.querySelector('section')
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
export const sectionsDraw = () => {
    removeFigures()
    createGalery()
    const section = document.querySelector('section')
    currentGalery.forEach(e => {
        const newSection = document.createElement('figure');
        newSection.classList.add(`${e.id}`)
        const pathName = currentPhotographer.name.split(' ')[0];
        let newHtml
        if (e.image) newHtml = `
        
        <img class = "img-galery" src = '../assets/SamplePhotos/${pathName}/${e.image}' alt='photo de profil de ${e.name}' />   
            <div class = "galery-footer">
            <div><h3>${e.title}</h3></div>
            <div class = "galery-like">
            <p>${e.likes}</p>
            <i class ="fas fa-heart"></i>
        </div>
            `
        if (e.video) newHtml = `
            
            <video class ="video" width="350" height="300" controls ="">
            <source src="../assets/SamplePhotos/${pathName}/${e.video}" type="video/mp4">
            Your browser does not support the video tag.
            </video>
             <div  class = "galery-footer">  
                <h3>${e.title}</h3>
                <div class ="galery-like">
                <p>${e.likes}</p>
                <i class ="fas fa-heart"></i>
                </div>
            </div>
                `

        section.appendChild(newSection);
        newSection.innerHTML = newHtml;
    })
    tagsEventSettings()
    lightBoxEventSettings()
}

const ArticleDraw = async () => {
    fullData = await getJsonData()
    photographerId = getId()
    createPhotograph()
    const cP = currentPhotographer
    const article = document.querySelector('article')
    const newHtml = `
        <img class = "img-profile-big"src = '../assets/SamplePhotos/Photographers/${cP.newName}.jpg' alt='photo de profil de ${cP.name}' />  
        <div class = 'article-left-container'>
        <div>
        <h2>${cP.name}</h2>
        <h3>${cP.city},${cP.country}</h3>
        <h4>${cP.tagline}</h4>
        <ul>${cP.tags.map(e => {
        return `<li class = "tag ${e}" title="${e}">#${e}</li>`
    }).join("")}
      </ul>
      </div>
      <button class ="btn btn-article">contactez-moi</button> 
      </div>`

    article.innerHTML = newHtml;
    sectionsDraw()
}
const body = document.querySelector('body') 
if (body.classList.contains('photograph-pages'))document.body.onload = ArticleDraw;