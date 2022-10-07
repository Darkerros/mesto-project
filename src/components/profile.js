import * as consts from './consts'
import {avatarElement, profileNameElement} from "./consts";

export const profile = {
    "name" : "",
    "about" : "",
    "avatar" : "",
    "_id" : "",
    "cohort" : ""
}

export function setprofile(newProfile){
    profile.name = newProfile.name
    profile.about = newProfile.about
    profile.avatar = newProfile.avatar
    profile._id = newProfile._id
    profile.cohort = newProfile.cohort
    renderCurrentProfile()
    return {...profile}
}
export function setprofileInfo(name,about){
    profile.name = name
    profile.about = about
    renderCurrentProfile()
    return {...profile}
}
export function updateProfileAvatar(avatarUrl){
    profile.avatar = avatarUrl
    renderCurrentProfile()
}

function renderCurrentProfile(){
    consts.avatarElement.src = profile.avatar
    consts.profileNameElement.textContent = profile.name
    consts.profileAboutElement.textContent = profile.about
}

