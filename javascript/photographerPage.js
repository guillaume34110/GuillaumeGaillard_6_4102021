
import { getJsonData } from './getJsonData.js'
import { Galery, Photograph } from './Objects.js'


let newData
let photographerId
let currentPhotographer
let currentGalery

const getId = () => {
    return window.location.href.split('?').pop()
}
const createPhotograph = () => {
    newData.photographData.forEach(e => {
        if (e.id.toString() === photographerId)
            currentPhotographer = new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait)
    })
}
const createGalery = () => {
    currentGalery = []
    newData.mediaData.forEach(e => {
        if (e.photographerId.toString() === photographerId) {
            if (e.image !== undefined) currentGalery.push(new Galery(e.id, e.photographerId, e.title, e.image, undefined, e.likes, e.date, e.price))
            if (e.video !== undefined) currentGalery.push(new Galery(e.id, e.photographerId, e.title, undefined, e.video, e.likes, e.date, e.price))
        }
    })
}
const sectionsDraw = () => {
    createGalery()
    const section = document.querySelector('section')
    currentGalery.forEach(e => {
        const newSection = document.createElement('figure');
        const pathName =  currentPhotographer.name.split(' ')[0];
        let newHtml
        if (e.image)  newHtml = `
        
        <img class = "img-galery" src = '../assets/SamplePhotos/${pathName}/${e.image}' alt='photo de profil de ${e.name}' />   
            <div class = "galery-footer">
            <h3>${e.title}</h3>
            <div class = "galery-like">
            <p>${e.likes}</p>
            <i class ="fas fa-heart"></i>
        </div>
            `
        if (e.video)  newHtml = `
            
            <video width="320" height="240" controls ="">
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
}

const ArticleDraw = async () => {
    newData = await getJsonData()
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
document.body.onload = ArticleDraw;