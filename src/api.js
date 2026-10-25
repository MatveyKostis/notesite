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
    const data = await axios.post("/note", {text: text, userid: id, topic: topic})
    return {status: data.data.status, note: data.data.note};
}