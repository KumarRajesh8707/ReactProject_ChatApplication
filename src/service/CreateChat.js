import axios from "axios";
export const CreateChat = async (chatData) => {
    try {
        const response = await axios.post('http://localhost:8080/userChat/createChat', chatData)
        return response.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
