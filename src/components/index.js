import '../pages/index.css'
import './card'
import './modal'
import './editprofilepopup'
import './addcardpopup'
import {enableValidation} from './validate'



enableValidation('.edit-profile-form', ['.form-nickname-input', '.form-about-input'], '.form__accept-profile-edit')
enableValidation('.card-add-form', ['.form__mesto-input', '.form__mesto-img-url-input'], '.form__accept-profile-edit')

