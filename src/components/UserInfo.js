
export default class UserInfo {
    constructor({nameElementSelector, aboutSelector, avatarSelector,apiGetUserFn,apiSetUserInfoFn}) {
        this._nameElement = document.querySelector(nameElementSelector)
        this._aboutElement = document.querySelector(aboutSelector)
        this._avatarElement = document.querySelector(avatarSelector)

        this._getUserFn = apiGetUserFn
        this._setUserInfoFn = apiSetUserInfoFn

        this.name = ''
        this.about = ''
        this.avatar = ''
        this._id = ''
        this.cohort = ''
    }

    getUserInfo() {
        return this._getUserFn().then(userInfo => {
            this.name = userInfo.name
            this.about = userInfo.about
            this.avatar = userInfo.avatar
            this._id = userInfo._id
            this.cohort = userInfo.cohort
            this._render()
            return {...userInfo}
        })
    }

    setUserInfo(name,about) {
        return this._setUserInfoFn({name: name,about : about}).then(userInfo => {
            this.name = userInfo.name
            this.about = userInfo.about
            this._render()
            return {...userInfo}
        })
    }

    _render(){
        this._nameElement.textContent = this.name
        this._aboutElement.textContent = this.about
        this._avatarElement.src = this.avatar
    }

    isIncludeCurrentProfile(idList) {
        return idList.some(id => this._id === id)
    }

    isCurrentProfile(id) {
        return this._id === id
    }
}