import {modal, auth, logedIn, login_window, window} from "./html.js"
import {Notescontrol} from "./notescontrol.js";

let notescontrols;

export function onLogin(data) {
    const p = logedIn.querySelector(".userName")
    p.textContent = data.name
    getId()
    const notecontrol = new Notescontrol(getId())
    notescontrols = notecontrol
    notecontrol.render()

    window.classList.remove("hidden")
    auth.classList.toggle("hidden")
    logedIn.classList.toggle("hidden")
    modal.classList.add("hidden")
    return notecontrol;
}

export const onLogOut = () => {
    notescontrols.erase()
    window.classList.add("hidden")
    auth.classList.toggle("hidden")
    logedIn.classList.toggle("hidden")
    localStorage.removeItem("user")

}

export const getId = () => {
    const usr = localStorage.getItem("user")
    if (!usr) {
        return
    }
    return JSON.parse(usr).id;
}