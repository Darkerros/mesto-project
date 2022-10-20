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

class Api {
    constructor(baseUrl = 'https://nomoreparties.co/v1/cohort-42/',
                authorization = 'fb67a6f2-1294-49f9-bf70-71dc37364dd5',
                headers = {}) {
        this.baseUrl = baseUrl
        this._authorization = authorization
        this.headers = {
            authorization: this._authorization,
            'Content-Type': 'application/json',
            ...headers
        }
    }

    createRequest(endpointSettings, body = '') {

        const reqSettings = {
            headers: this.headers,
            method: endpointSettings.method,
        }
        methods !== methods.GET && body ? reqSettings.body = JSON.stringify(body) : false


        return fetch(this.baseUrl + endpointSettings.endpoint, reqSettings)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res);
            })
    }

    getCards() {
        const requestSettings = endpointAndMethodGenerator.getcards()
        return this.createRequest(requestSettings)
    }

    addCard(name, link) {
        const requestSettings = endpointAndMethodGenerator.addCards()
        return this.createRequest(requestSettings, {name: name, link: link})
    }

    deleteCard(cardId) {
        const requestSettings = endpointAndMethodGenerator.removeCard(cardId)
        return this.createRequest(requestSettings)
    }

    installLike(cardId) {
        const requestSettings = endpointAndMethodGenerator.installLike(cardId)
        return this.createRequest(requestSettings)
    }

    deleteLike(cardId) {
        const requestSettings = endpointAndMethodGenerator.deleteLike(cardId)
        return this.createRequest(requestSettings)
    }

    getProfile() {
        const requestSettings = endpointAndMethodGenerator.getprofile()
        return this.createRequest(requestSettings)
    }

    updateProfile(name, about) {
        const requestSettings = endpointAndMethodGenerator.updateProfile()
        return this.createRequest(requestSettings, {name, about})
    }

    updateAvatar(avatarUrl) {
        const requestSettings = endpointAndMethodGenerator.updateAvatar()
        return this.createRequest(requestSettings, {avatar: avatarUrl})
    }
}