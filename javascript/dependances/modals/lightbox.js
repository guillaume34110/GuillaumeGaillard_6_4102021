import { currentGalery, currentPhotographer } from "../../photographerPage.js"

export const lightBoxEventSettings = () => {
    const imgs = document.querySelectorAll('.img-galery')
    imgs.forEach(e => {
        e.addEventListener("click", LightBoxDraw)
    })
    const videos = document.querySelectorAll('.video')
    videos.forEach(e => {
        e.addEventListener("click", LightBoxDraw)
    })
}

const closeLightBox = () => {
    console.log('close')
    const lightBox = document.querySelector('.light-box')
    lightBox.remove()
}

const prevPicture = () => {
    const pathName = currentPhotographer.name.split(' ')[0];
    const currentMedia = document.querySelector('.light-box')
    for (let i = 0; i < currentGalery.length; i++) {
        if (currentMedia.id === currentGalery[i].id.toString()) {
            if (currentGalery[i - 1]) {
                currentMedia.id = currentGalery[i - 1].id.toString()
                currentGalery[i - 1].foundSrc(pathName)
                if (currentGalery[i - 1].image) currentMedia.innerHTML = imghtml(currentGalery[i - 1])
                if (currentGalery[i - 1].video) currentMedia.innerHTML = videohtml(currentGalery[i - 1])
            } else {
                currentMedia.id = currentGalery[currentGalery.length - 1].id.toString()
                currentGalery[currentGalery.length - 1].foundSrc(pathName)
                if (currentGalery[currentGalery.length - 1].image) currentMedia.innerHTML = imghtml(currentGalery[currentGalery.length - 1])
                if (currentGalery[currentGalery.length - 1].video) currentMedia.innerHTML = videohtml(currentGalery[currentGalery.length - 1])
            }
            i = currentGalery.length
        }
        insideEventListeners()
    }
}
const nextPicture = () => {
    const pathName = currentPhotographer.name.split(' ')[0];
    const currentMedia = document.querySelector('.light-box')
    for (let i = 0; i < currentGalery.length; i++) {
        if (currentMedia.id === currentGalery[i].id.toString()) {
            if (currentGalery[i + 1]) {
                currentMedia.id = currentGalery[i + 1].id.toString()
                currentGalery[i + 1].foundSrc(pathName)
                if (currentGalery[i + 1].image) currentMedia.innerHTML = imghtml(currentGalery[i + 1])
                if (currentGalery[i + 1].video) currentMedia.innerHTML = videohtml(currentGalery[i + 1])
            } else {
                currentMedia.id = currentGalery[0].id.toString()
                currentGalery[0].foundSrc(pathName)
                if (currentGalery[0].image) currentMedia.innerHTML = imghtml(currentGalery[0])
                if (currentGalery[0].video) currentMedia.innerHTML = videohtml(currentGalery[0])
            }
            i = currentGalery.length
        }
        insideEventListeners()
    }
}
const videohtml = (e) => {
    return `
<i class="fas fa-times"></i>
<div>
    <i class="fas fa-chevron-left"></i>
    <video  class ="video video-light-box" width="350" height="300" controls ="">
    <source src="${e.src}" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <i class="fas fa-chevron-right"></i>
</div>
<h3>${e.title}</h3>
        `
}
const imghtml = (e) => {
    return `
    <i class="fas fa-times"></i>
    <div>
        <i class="fas fa-chevron-left"></i>
        <img  class = "img-galery img-light-box" src = '${e.src}' />   
        <i class="fas fa-chevron-right"></i>
    </div>
    <h3>${e.title}</h3>
        `
}
const insideEventListeners = () => {
    document.querySelector('.fa-times').addEventListener('click', closeLightBox)
    document.querySelector('.fa-chevron-left').addEventListener('click', prevPicture)
    document.querySelector('.fa-chevron-right').addEventListener('click', nextPicture)
}
const LightBoxDraw = (e) => {
    const element = e.target
    element.title = e.target.parentElement.childNodes[3].children[0].innerText
    console.log(e,'e');
    const main = document.querySelector('main')
    const newLightBox = document.createElement('figure');
    newLightBox.classList.add('light-box')
    newLightBox.id = `${element.id}`
    let newHtml
    if (e.target.classList[0] === 'img-galery') newHtml = imghtml(element)
    if (e.target.classList[0] === 'video') newHtml = videohtml(element)
    main.appendChild(newLightBox);
    newLightBox.innerHTML = newHtml;
    insideEventListeners()
}