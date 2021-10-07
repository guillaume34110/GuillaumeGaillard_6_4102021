import { currentGalery, currentPhotographer } from "../../photographerPage.js"
import { timeout } from "../sorting/tagSort.js"

export const lightBoxEventSettings = () => {
    const imgs = document.querySelectorAll(".img-galery")
    imgs.forEach(e => {
        events(e)
    })
    const videos = document.querySelectorAll(".video")
    videos.forEach(e => {
        events(e)
    })
}
const events = (e) => {
    e.addEventListener("click", LightBoxDraw)
    e.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            LightBoxDraw(e)
            await timeout(500)
        }
    })
}
const closeLightBox = () => {
    console.log("close")
    const lightBox = document.querySelector(".light-box")
    lightBox.remove()
}

const prevPicture = () => {
    const pathName = currentPhotographer.name.split(" ")[0];
    const currentMedia = document.querySelector(".light-box")
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
    const pathName = currentPhotographer.name.split(" ")[0];
    const currentMedia = document.querySelector(".light-box")
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
<i  arial-label= "icone fermer cickable" title= "fermer"tabindex="2" class="fas fa-times"></i>
<div>
    <i arial-label= "icone  précedent clickable" title = "précédent" tabindex="2" class="fas fa-chevron-left"></i>
    <video  class ="video video-light-box" width="350" height="300" controls ="">
    <source src="${e.src}" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <i  title= "suivant" arial-label= "icone  suivant clickable" tabindex="1" class="fas fa-chevron-right"></i>
</div>
<h3>${e.title}</h3>
        `
}
const imghtml = (e) => {
    return `
    <i  arial-label= "icone fermer cickable" title= "fermer"tabindex="2" class="fas fa-times"></i>
    <div>
        <i  arial-label= "icone précedent clickable" title = " précédent " tabindex="2" class="fas fa-chevron-left"></i>
        <img  class = "img-galery img-light-box" src = '${e.src}' />   
        <i title= "suivant" arial-label= "icone  suivant clickable" tabindex="1" class="fas fa-chevron-right"></i>
    </div>
    <h3>${e.title}</h3>
        `
}
const insideEventListeners = () => {
    const close = document.querySelector(".fa-times")
    close.addEventListener("click", closeLightBox)
    close.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            closeLightBox()
            await timeout(500)
        }
    })

    const arrowLeft = document.querySelector(".fa-chevron-left")
    arrowLeft.addEventListener("click", prevPicture)
    arrowLeft.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            prevPicture()
            await timeout(500)
        }
    })
    const arrowRight = document.querySelector(".fa-chevron-right")
    arrowRight.addEventListener("click", nextPicture)
    arrowRight.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            nextPicture()
            await timeout(500)
        }
    })

}
const LightBoxDraw = (e) => {
    const element = e.target
    element.title = e.target.parentElement.childNodes[3].children[0].innerText
    const main = document.querySelector("main")
    const newLightBox = document.createElement("figure");
    newLightBox.classList.add("light-box")
    newLightBox.id = `${element.id}`
    let newHtml
    if (e.target.classList[0] === "img-galery") newHtml = imghtml(element)
    if (e.target.classList[0] === "video") newHtml = videohtml(element)
    main.appendChild(newLightBox);
    newLightBox.innerHTML = newHtml;
    document.querySelector(".fa-chevron-right").focus()
    insideEventListeners()
}