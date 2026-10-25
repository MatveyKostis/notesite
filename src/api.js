import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"

export const signInUser = async (username, password) => {
    const data = await axios.post("/auth", {username: username, password: password})
    return data.data
}

export const getUserNotes = async(id) => {
    const user = id
    const data = await axios.get("/note", {params: { user }})
    return data.data;
}

export const createNote = async (text, id, topic) => {
    try {
        const data = await axios.post("/note", {text: text, userid: id, topic: topic})
    } catch (e) {
        console.log(e)
    }
}

export const deleteNote = async (id, noteId) => {
    console.log(id, noteId)
    try {
        const data = await axios.delete("/note", {data: {id: id, noteId: noteId}})
        return data.data;
    } catch (e) {
        console.log(e)
        return e;
    }

}

export const patchNote = async (id, noteId, text, topic) => {
    try {
        const data = await axios.patch("/note", {id: id, noteId: noteId, text: text, topic: topic})
        return data.data;
    } catch (e) {
        console.log(e)
        return e;
    }
}