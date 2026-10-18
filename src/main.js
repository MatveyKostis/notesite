import axios from "axios";
import {use} from "express/lib/application.js";

const modal = document.querySelector(".modal")
const signinButton = document.querySelector(".signinbutton")
const login_window = document.querySelector(".window_login")
const window = document.querySelector(".window");
const signin = document.querySelector(".signin");
const notes_make = document.querySelector(".notes_make")
let user_id;
const notes_block = document.querySelector(".notes_block")
const note_creates = document.querySelector(".note_create")

async function load_notes(userId) {
    try {
        const notes = axios.get("http://localhost:3000/note?", {params: {user: userId}})
        console.log(await notes)
        const note = (await notes).data
        note.forEach((nots) => {
            const note_block = document.createElement("div")
            note_block.innerHTML = `
            <h3>${nots.topic}</h3>
            <p>${nots.text}</p>
            `
            notes_block.append(note_block)
        })
        window.classList.remove("hidden")
    } catch (e) {
        console.log(e)
    }
}

signinButton.addEventListener("click", (e) => {
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
    try{
        const user = axios.post("http://localhost:3000/auth", {username: name, password: password})
        console.log(await user)
        let users = await user
        user_id = users.data.id
        await load_notes(users.data.id)
        login_window.classList.add("hidden")
    } catch (e) {
        const errormessage = document.querySelector(".errormessage")
        errormessage.textContent = "something happened"
        console.log(e)
    }

})

note_creates.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!user_id) {
        return
    }

    const topic = note_creates.topic.value
    const text = note_creates.texts.value
    try {
        const note_create = axios.post("http://localhost:3000/note", {userid: user_id, text: text, topic: topic})
        console.log((await note_create))
        notes_block.innerHTML = ""
        await load_notes(user_id)
    } catch (e) {
        console.log(e)
    }
})