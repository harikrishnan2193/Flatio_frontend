import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"


export const registerAPI = async (users) => {
    return await commonAPI('POST', `${BASE_URL}/users/register`, users, "")
}

export const loginAPI = async (users) => {
    return await commonAPI('POST', `${BASE_URL}/users/login`, users, "")
}

export const cpDataSubmitAPI = async (cpDatas) => {
    return await commonAPI('POST', `${BASE_URL}/cp/addnew`, cpDatas, "")
}

export const getAllCpsAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/cps/all-cps`)
}

export const deleteCpAPI = async (id) => {
    return await commonAPI('DELETE', `${BASE_URL}/cp/delete/${id}`);
}

export const updateCpAPI = async (id, cpData) => {
    return await commonAPI('PUT', `${BASE_URL}/cp/update/${id}`, cpData, "")
}

export const getAllFlatesAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/flates/all-flates`)
}

export const submitProjectAPI = async (formDatas) => {
    return await commonAPI('POST', `${BASE_URL}/form/alldatas`, formDatas);
}

export const getProjectsAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/selected/projects`)
}

export const updateProjectAPI = async (projectId, projectData) => {
    return await commonAPI('PUT', `${BASE_URL}/projects/${projectId}`, projectData);
}

export const getProjectDetailsAPI = async (projectId) => {
    return await commonAPI('GET', `${BASE_URL}/api/projects/${projectId}`)
}

export const submitProjectBookAPI = async (formData) => {
    return await commonAPI('POST', `${BASE_URL}/form/booked`, formData);
}

export const deleteAprojectAPI = async (id) => {
    return await commonAPI('DELETE', `${BASE_URL}/project/delete/${id}`);
}

export const getAllBookingsAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/booking/all-bookings`)
}