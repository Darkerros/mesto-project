import * as consts from './consts'

export const profile = {
    "name" : "",
    "about" : "",
    "avatar" : "",
    "_id" : "",
    "cohort" : ""
}

export function setProfile(newProfile){
    profile.name = newProfile.name
    profile.about = newProfile.about
    profile.avatar = newProfile.avatar
    profile._id = newProfile._id
    profile.cohort = newProfile.cohort
    renderCurrentProfile()
    return {...profile}
}
export function isIncludeCurrentProfile(idList){
    return idList.some(id => profile._id === id)
}
export function isCurrentProfile(id){
    return profile._id === id
}

function renderCurrentProfile(){
    consts.avatarElement.src = profile.avatar
    consts.profileNameElement.textContent = profile.name
    consts.profileAboutElement.textContent = profile.about
}

