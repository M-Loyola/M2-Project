import * as apiConfig from "../api/apiConfig";

export const fetchAllDrugs = async () => {
    return await apiConfig.getAllDrugs()
}
export const createDrugHook = async (drugDetailsObject) => {
    await apiConfig.createDrug(drugDetailsObject)
}

export const deleteDrugHook = async (productId) => {
    await apiConfig.deleteDrug(productId)
}

export const updateDrugHook = async (productId, drugDetailsObject) => {
    await apiConfig.updateDrug(productId, drugDetailsObject)
}

export const getAllUsersHook = async () => {
    return await apiConfig.getAllUsers()
}

export const createUserHook = async (registryDetailsObject) => {
    return await apiConfig.createUser(registryDetailsObject)
}

export const getUserByUsernameHook = async (username) => {
    return await apiConfig.getUserByUsername(username)
}