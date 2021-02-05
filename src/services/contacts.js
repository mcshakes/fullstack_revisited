import axios from "axios";

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseURL, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

export default {
    getAll: getAll,
    create: create,
    update: update

}
