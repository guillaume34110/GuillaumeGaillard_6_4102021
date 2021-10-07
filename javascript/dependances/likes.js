import { currentGalery, currentPhotographer } from "../photographerPage.js"
import { timeout } from "./sorting/tagSort.js"

export const heartEventListener = () => {
   const heart = document.querySelectorAll(".fa-heart")
    heart.forEach(() => addEventListener("click", likesToggle))
    heart.forEach((e)=>{
        e.addEventListener("keydown" ,async function (e) {
            if (e.key === "Enter") {
                likesToggle(e) 
                await timeout(500)
              }   
        })
    })
}

const likesToggle = (e) => {
    if (e.target.classList.contains("fa-heart")){           //protection
    if (e.target.classList.contains("fa-heart-liked")) {    //remove like
        e.target.classList.remove("fa-heart-liked")
        currentGalery.forEach(cG => {
            if (e.target.id === `i${cG.id.toString()}`) {
                cG.likes -= 1
                document.querySelector(`#p${cG.id}`).innerHTML = `${cG.likes}`
            }
        })
    }
    else {                                                  //add like
        e.target.classList.add("fa-heart-liked")
        currentGalery.forEach(cG => {
            if (e.target.id === `i${cG.id.toString()}`) {
                cG.likes += 1
                document.querySelector(`#p${cG.id}`).innerHTML = `${cG.likes}`
            }
        })
    }
    const likescount = likesCounter()
    document.querySelector(".likes-count").innerHTML = `${likescount}`
    document.querySelector(".likes-count").innerHTML = `${likescount}`
}
}

const likesCounter = () => {
    let counter = 0
    currentGalery.forEach(e => {
        counter += e.likes
    })
    return counter
}

export const likesDrawWidget = () => {
    const main = document.querySelector("main")
    const newlikesWidget = document.createElement("div");
    newlikesWidget.classList.add("likes-widget")
    const likescount = likesCounter()
    const newHtml = `
        <div>
            <p class = "likes-count">${likescount}</p>
            <i class="fas fa-heart"></i>
        </div>
        <p>${currentPhotographer.price}€/jours</p>
        `
    newlikesWidget.innerHTML = newHtml
    main.appendChild(newlikesWidget)
}