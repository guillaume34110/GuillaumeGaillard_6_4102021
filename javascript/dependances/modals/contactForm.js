import { currentPhotographer } from "../../photographerPage.js";
import { timeout } from "../timeoutFunction.js";


export const formEventListener = () => {
    document.querySelector(".btn-contact").addEventListener("click" , contactModalDraw)
}
const contactModalDraw = () => {
    const main = document.querySelector("main")
    const newLightBox = document.createElement("section");
    newLightBox.classList.add("contact-form")
    newLightBox.innerHTML =`
    <div class = "form-container" >
    <div class = "form-header">
        <h2>Contactez-moi ${currentPhotographer.name}</h2>
        <i  arial-label= "icone fermer cickable" title= "fermer" tabindex = "0" class="fas fa-times close"></i>
        </div>
        <form >
    <div class="form-data">
        <label for="first-name">Prénom</label><br>
        <input  placeholder="Votre prénom."class="text-control" type="text" id="first-name" name="first" minlength="2" /><br>
        <p class="alert" id="alert-first-name">Le prénom doit contenir au moins deux lettres</p>
    </div>
    <div class="form-data">
        <label for="last-name">Nom</label><br>
        <input  placeholder="Votre nom" class="text-control" type="text" id="last-name" name="last" minlength="2" /><br>
        <p class="alert" id="alert-last-name">le prénom doit contenir au moins deux lettres</p>
    </div>
    <div class="form-data">
        <label for="email">E-mail</label><br>
        <input  placeholder="jean@gmail.com" class="text-control" type="email" id="email" name="email" /><br>
        <p class="alert" id="alert-email">adresse mail invalide</p>
    </div>
    <div class="form-data">
        <label for="textarea">Votre message</label><br>
        <textarea  placeholder="entrez votre requette ..." minlength="12" maxlength="600"  id ="textarea" class="text-control" rows ="5" cols="33" id="textarea" name="textarea" ></textarea><br>
        <p class="alert" id="alert-textarea">veuillez entrer au moins 12 caractéres, ne pas utiliser de caractéres spéciaux</p>
    </div>
    </form>
    <button  arial-label= "bouton envoyer le formulaire"  class ="btn btn-article btn-send">Envoyer</button> 
    </div>
    `
    main.appendChild(newLightBox)
    const close = document.querySelector(".close")
    close.addEventListener("click",modalClose)
    close.addEventListener("keydown" ,async function (e) {
      if (e.key === "Enter") {
        modalClose(e) 
          await timeout(500)
        }   
  })
    const sendButton = document.querySelector(".btn-send")
    sendButton.addEventListener("click" ,contactModalCheck)
      close.focus()
}
const modalClose = () => {
document.querySelector(".contact-form").remove()
}
const contactModalCheck = () => {
    const textControl = document.querySelectorAll(".text-control")
    const alerts = document.querySelectorAll(".alert")
    const checkName = /^([a-zA-Z]){2,20}$/;
    const checkMail = /^\S+@\S+\.\S+$/;//@ .
    const checkTextarea = /^([a-zA-Z0-9 ,.?!éàèç]){12,600}$/
    console.log(textControl);
    let errorToken = false //no error
    textControl.forEach (e=> {
        console.log(checkName.test(e.value))
          if ((e.id === "first-name"||e.id === "last-name") && !checkName.test(e.value) ) {
            e.classList.add("text-error");
            errorToken = true 
            if (e.id === "first-name") {
              alerts[0].classList.add("alert-active");
            }
            else if (e.id === "last-name") {
              alerts[1].classList.add("alert-active");
            }
          }else if((e.id === "first-name"||e.id === "last-name") && checkName.test(e.value)){
            e.classList.remove("text-error")
            if (e.id === "first-name") {
              alerts[0].classList.remove("alert-active");
            }
            else if (e.id === "last-name") {
              alerts[1].classList.remove("alert-active");
            }
          }
           if (e.id==="email" && !checkMail.test(e.value)) {
            e.classList.add("text-error");
            errorToken = true 
            alerts[2].classList.add("alert-active");
          }else if(e.id==="email" && checkMail.test(e.value)){
            e.classList.remove("text-error");
            alerts[2].classList.remove("alert-active");
          }
           if (e.id==="textarea" && !checkTextarea.test(e.value)) {
            e.classList.add("text-error");
            errorToken = true 
            alerts[3].classList.add("alert-active");
          }else if(e.id==="textarea" && checkTextarea.test(e.value)){
            e.classList.remove("text-error");
            alerts[3].classList.remove("alert-active");
          }
          
        })
        if (errorToken === false)textControl.forEach (e=> {console.log(e.id," = ",e.value);})


}