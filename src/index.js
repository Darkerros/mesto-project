import './pages/index.css'
import './components/card'
import './components/modal'
import './components/editprofilepopup'
import './components/addcardpopup'
import {enableValidation} from './components/validate'



enableValidation('.edit-profile-form', ['.form-nickname-input', '.form-about-input'], '.form__accept-profile-edit')
enableValidation('.card-add-form', ['.form__mesto-input', '.form__mesto-img-url-input'], '.form__accept-profile-edit')

