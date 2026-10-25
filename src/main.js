import {signInUser} from "./api"
import {modal, signin, logout, login_window, auth, logedIn, signinButton, create_note} from "./html.js"
import {getId, onLogin, onLogOut} from "./auth.js"

let notescontrol;


const data = localStorage.getItem("user")
if (data) {
    const login = onLogin(JSON.parse(data))
    notescontrol = login
}

signinButton.addEventListener("click", (e) => {
    console.log(123)
    modal.classList.remove("hidden")
    login_window.classList.remove("hidden")
})
modal.addEventListener("click", (e) => {
    if (e.target !== modal ) {
        return
    }
    modal.classList.add("hidden")
    login_window.classList.add("hidden")
})

signin.addEventListener("submit", async (e) => {
    e.preventDefault()

    const name = signin.name.value
    const password = signin.password.value
    try {
        const data = await signInUser(name, password)

        console.log(data)
        localStorage.setItem("user", JSON.stringify(data))
        const login = onLogin(data)
        notescontrol = login
    } catch (e) {
        const errormessage = document.querySelector(".errormessage")
        errormessage.textContent = "something happened"
        console.log(e)
    }

})

create_note.addEventListener("submit", async (e) => {
    e.preventDefault()
    const title = create_note.title.value
    const text = create_note.text.value
    const id = getId()
    if (!id) {
        return
    }
    await notescontrol.create(title, text)

})

logout.addEventListener("click", (e) => {
    onLogOut()
})