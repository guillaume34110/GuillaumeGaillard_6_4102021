import { mapMainPage } from "../../mainPage.js"
import { ArticleDraw } from "../../photographerPage.js"

export let sortingArray = []

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const tagsEventSettings = () => {
    const tags = document.querySelectorAll(".tag")
    tags.forEach(e => {
       
        e.addEventListener("click", tagSort)
        e.addEventListener("keydown" ,async function (e) {
            if (e.key === "Enter") {
                tagSort(e) 
                await timeout(500)
              }   
        })
    })      
}

const tagSort = (e) => {
    const newSortingValue = e.target.title
    if (sortingArray.includes(newSortingValue)) sortingArray = sortingArray.filter(v => v !== newSortingValue)
    else sortingArray.push(newSortingValue)
    const body = document.querySelector("body") 
    if (body.classList.contains("main-page")) mapMainPage()
    else if (body.classList.contains("photograph-pages"))  ArticleDraw ()
    //tag remove activity//
    const allTags = document.querySelectorAll(".tag")
    allTags.forEach(tag => {
        if (tag.classList.contains("tag-selected")) tag.classList.remove("tag-selected")
    })
    //tag add activity//
    sortingArray.forEach(tags => {
        const selectedTag = document.querySelectorAll(`.${tags}`)
        selectedTag.forEach(tag => {
            if (!tag.classList.contains("tag-selected")) tag.classList.add("tag-selected")
        })
    })
    
}
