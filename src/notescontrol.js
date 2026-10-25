import {notesListUL} from "./html.js"
import {getUserNotes, createNote, deleteNote, patchNote} from "./api.js"
import { getId } from "./auth.js"

export class Notescontrol {
    constructor() {
        this.notes = []
        notesListUL.addEventListener("click", async (e) => {
            if (e.target.classList.contains("deletebutt")) {
                const noteElement = e.target.closest("li")
                if (!noteElement) return
                const noteid = noteElement.getAttribute("id")
                noteElement.remove()
                this.notes = this.notes.filter(note => note.id !== noteid)
                await this.deleteNote(noteid)
            } else if (e.target.classList.contains("editbutt")) {
                const noteElement = e.target.closest("li")
                if (!noteElement) return
                const noteid = noteElement.getAttribute("id")
                const text = noteElement.querySelector("p")?.textContent || ""
                const topic = noteElement.querySelector("h3")?.textContent || ""

                const existingInputDiv = noteElement.querySelector(".inputdiv")
                if (existingInputDiv) {
                    existingInputDiv.remove()
                    return
                }
                const divinput = document.createElement("div")
                divinput.classList.add("inputdiv")
                divinput.innerHTML = `
                    <label>topic: <input type="text" class="topic"></label>
                    <textarea class="input"></textarea>
                    <button class="savebutt">save</button>
                `
                divinput.querySelector(".topic").value = topic
                divinput.querySelector(".input").value = text
                noteElement.appendChild(divinput)
            } else if (e.target.classList.contains("savebutt")) {
                const noteElement = e.target.closest("li")
                if (!noteElement) return
                const noteid = noteElement.getAttribute("id")
                const divinput = noteElement.querySelector(".inputdiv")
                if (divinput) {
                    const text = divinput.querySelector(".input").value
                    const topic = divinput.querySelector(".topic").value
                    await this.patchNote(noteid, text, topic)
                }
            }
        })
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
    async deleteNote(id) {
        const usrid = getId()
        try {

            await deleteNote(usrid, id)
        } catch (e) {
            console.log(e)
        }
    }

    async patchNote(noteId, text, topic) {
        const usrid = getId()
        try {
            await patchNote(usrid, noteId, text, topic)
            await this.getNotes()
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
            <button class="editbutt">edit</button>
            <button class="deletebutt">delete</button>
            `
            li.setAttribute("id", note.id)
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