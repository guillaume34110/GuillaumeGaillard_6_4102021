import { currentGalery, currentPhotographer } from "../photographerPage.js"

export const heartEventListener = () => {
    document.querySelectorAll('.fa-heart').forEach(e => addEventListener('click', likesToggle))
}

const likesToggle = (e) => {
    if (e.target.classList.contains('fa-heart-liked')) {
        e.target.classList.remove('fa-heart-liked')
        currentGalery.forEach(cG => {
            if (e.target.id === `i${cG.id.toString()}`) {
                cG.likes -= 1
                document.querySelector(`#p${cG.id}`).innerHTML = `${cG.likes}`
            }
        })
    }
    else {
        e.target.classList.add('fa-heart-liked')
        currentGalery.forEach(cG => {
            if (e.target.id === `i${cG.id.toString()}`) {
                cG.likes += 1
                document.querySelector(`#p${cG.id}`).innerHTML = `${cG.likes}`
            }
        })
    }
    const likescount = likesCounter()
    document.querySelector('.likes-count').innerHTML = `${likescount}`
    document.querySelector('.likes-count').innerHTML = `${likescount}`
}

const likesCounter = () => {
    let counter = 0
    currentGalery.forEach(e => {
        counter += e.likes
    })
    return counter
}

export const likesDrawWidget = () => {
    const main = document.querySelector('main')
    const newlikesWidget = document.createElement('div');
    newlikesWidget.classList.add('likes-widget')
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