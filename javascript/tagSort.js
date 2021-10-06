import { mapMainPage } from "./mainPage.js"
import { sectionsDraw } from "./photographerPage.js"

export let sortingArray = []

export const tagsEventSettings = () => {
    const tags = document.querySelectorAll('.tag')
    tags.forEach(e => {
        e.addEventListener("click", tagSort)
    })
}

const tagSort = (e) => {
    console.log(e)
    const newSortingValue = e.target.title
    if (sortingArray.includes(newSortingValue)) sortingArray = sortingArray.filter(v => v !== newSortingValue)
    else sortingArray.push(newSortingValue)
    const body = document.querySelector('body') 
    if (body.classList.contains('main-page')) mapMainPage()
    else if (!body.classList.contains('main-page'))  sectionsDraw ()
    //tag remove activity//
    const allTags = document.querySelectorAll('.tag')
    allTags.forEach(tag => {
        if (tag.classList.contains('tag-selected')) tag.classList.remove('tag-selected')
    })
    //tag add activity//
    sortingArray.forEach(tags => {
        const selectedTag = document.querySelectorAll(`.${tags}`)
        selectedTag.forEach(tag => {
            if (!tag.classList.contains('tag-selected')) tag.classList.add('tag-selected')
        })
    })
    
}
