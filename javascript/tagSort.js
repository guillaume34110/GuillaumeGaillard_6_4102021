import { mapMainPage } from "./main.js"
export let sortingArray = []

export const eventSettings = () => {
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
    
    mapMainPage()
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
