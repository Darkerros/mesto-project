
const autorizationToken = 'fb67a6f2-1294-49f9-bf70-71dc37364dd5'
const cohortId = 'plus-cohort-15'

const methods = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    UPDATE: "UPDATE",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

const endpointAndMethodGenerator = {
    getcards: () => {
        return {endpoint: 'cards', method: methods.GET}
    },
    addCards: () => {
        return {endpoint: 'cards', method: methods.POST}
    },
    removeCard: (cardID) => {
        return {endpoint: `cards/${cardID}`, method: methods.DELETE}
    },
    getprofile: () => {
        return {endpoint: 'users/me', method: methods.GET}
    },
    updateProfile: () => {
        return {endpoint: 'users/me', method: methods.PATCH}
    },
    updateAvatar: () => {
        return {endpoint: 'users/me/avatar', method: methods.PATCH}
    },
    installLike: (cardID) => {
        return {endpoint: `cards/likes/${cardID}`, method: methods.PUT}
    },
    deleteLike: (cardID) => {
        return {endpoint: `cards/likes/${cardID}`, method: methods.DELETE}
    },
}

const apiConfig = {
    headers: {
        'Authorization': autorizationToken,
        'Content-Type': 'application/json',
    },
    baseurl: `https://nomoreparties.co/v1/${cohortId}/`
}

function createRequest(endpointSettings, body = '') {
    const reqSettings = {
        headers: apiConfig.headers,
        method: endpointSettings.method,
    }
    methods !== methods.GET && body ?  reqSettings.body = JSON.stringify(body): false


    return fetch(apiConfig.baseurl + endpointSettings.endpoint,reqSettings)
        .then(res => {
            if (res.ok) return res.json();
            return  Promise.reject(res);
        })
}

export function getCards() {
    const requestSettings = endpointAndMethodGenerator.getcards()
    return createRequest(requestSettings)
}
export function addCard(name,link){
    const requestSettings = endpointAndMethodGenerator.addCards()
    return createRequest(requestSettings,{name: name,link : link})
}
export function deleteCard(cardId){
    const requestSettings = endpointAndMethodGenerator.removeCard(cardId)
    return createRequest(requestSettings)
}

export function installLike(cardId){
    const requestSettings = endpointAndMethodGenerator.installLike(cardId)
    return createRequest(requestSettings)
}
export function deleteLike(cardId){
    const requestSettings = endpointAndMethodGenerator.deleteLike(cardId)
    return createRequest(requestSettings)
}

export function getProfile() {
    const requestSettings = endpointAndMethodGenerator.getprofile()
    return createRequest(requestSettings)
}
export function updateProfile(name,about) {
    const requestSettings = endpointAndMethodGenerator.updateProfile()
    return createRequest(requestSettings,{name,about})
}

export function updateAvatar(avatarUrl){
    const requestSettings = endpointAndMethodGenerator.updateAvatar()
    return createRequest(requestSettings,{avatar: avatarUrl})
}