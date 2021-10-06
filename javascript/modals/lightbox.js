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

const closeLightBox =() =>{
console.log('close')
}
const prevPicture = () =>{
console.log('prev')
}
const nextPicture = () =>{
console.log('next')
}

const LightBoxDraw = (e) => {
    console.log(e, 'click')
    const main = document.querySelector('main')
    const newLightBox = document.createElement('figure');
    newLightBox.classList.add('light-box')
    let newHtml
    if (e.target.classList[0] === 'img-galery') newHtml = `
    <i class="fas fa-times"></i>
    <div>
        <i class="fas fa-chevron-left"></i>
        <img class = "img-galery img-light-box" src = '${e.target.src}' />   
        <i class="fas fa-chevron-right"></i>
    </div>
        `
    if (e.target.classList[0] === 'video') newHtml = `
    <i class="fas fa-times"></i>
    <div>
        <i class="fas fa-chevron-left"></i>
        <video class ="video video-light-box" width="350" height="300" controls ="">
        <source src="${e.target.src}" type="video/mp4">
        Your browser does not support the video tag.
        </video>
        <i class="fas fa-chevron-right"></i>
    </div>
            `
    main.appendChild(newLightBox);
    newLightBox.innerHTML = newHtml;
document.querySelector('.fa-times').addEventListener('click',closeLightBox)
document.querySelector('.fa-chevron-left').addEventListener('click',prevPicture)
document.querySelector('.fa-chevron-right').addEventListener('click',nextPicture)
}