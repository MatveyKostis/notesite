import {notesListUL} from "./html.js"
import {getUserNotes, createNote} from "./api.js"
import { getId } from "./auth.js"

export class Notescontrol {
    constructor() {
        this.notes = []
        this.getNotes().then()
    }
    async getNotes() {
        const id = getId();
        console.log(id)
        try {
            const data = await getUserNotes(id)
            this.notes = data
            this.render()
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        notesListUL.innerHTML = ""
        console.log(this.notes);
        this.notes.forEach(note => {
            const li = document.createElement("li")
            li.innerHTML = `
            <h3>${note.topic}</h3>
            <p>${note.text}</p>
            `
            notesListUL.appendChild(li)
        })
    }
    async create(title, text) {
        const id = getId();

        const status = await createNote(text ,id , title)
        await this.getNotes()
    }
    erase() {
        this.notes = []
        notesListUL.innerHTML = ""
    }
}