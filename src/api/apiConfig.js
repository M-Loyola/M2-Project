import api from './api';

export const getAllDrugs = () => {
    return api.get("/api/drug-inventory")
}

export const createDrug = (drugDetails) => {
    return api.post("/api/drug-inventory/create", drugDetails)
}

export const deleteDrug = (productId) => {
    return api.delete(`/api/drug-inventory/delete/${productId}`)
}

export const updateDrug = (productId, drugDetails) => {
    return api.put(`/api/drug-inventory/update/${productId}`, drugDetails)
}

export const getAllUsers = () => {
    return api.get("/api/user-account")
}

export const createUser = (registerDetails) => {
    return api.post("/api/user-account/create",registerDetails)
}

export const getUserByUsername = (username) => {
    return api.get(`/api/user-account/getByName/${username}`)
}