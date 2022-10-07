(()=>{"use strict";var e=document.querySelectorAll(".popup"),t=document.querySelector(".profile").querySelector(".profile__add-button"),n=document.querySelector("#popup-add-card"),r=n.querySelector(".form"),o=n.querySelector(".form__accept"),c=r.querySelector("#form__mesto-input"),i=r.querySelector("#form__mesto-img-url-input"),u=document.querySelector("#popup-edit-profile"),a=u.querySelector(".form"),s=a.querySelector("#form-nickname-input"),l=a.querySelector("#form-about-input"),d=a.querySelector(".form__accept-profile-edit"),f=document.querySelector(".profile").querySelector(".profile__edit-btn"),p=document.querySelector(".profile").querySelector(".profile__name"),m=document.querySelector(".profile").querySelector(".profile__about"),v=document.querySelector("#card-template").content.querySelector(".card"),_=document.querySelector("#popup-selected-card"),y=_.querySelector(".popup__image"),h=_.querySelector(".popup__img-description"),S=document.querySelector(".elements"),b=document.querySelector("#popup-error"),q=b.querySelector(".form__error"),E=(document.querySelector("#popup-error"),document.querySelector("#popup-update-avatar")),g=E.querySelector(".form"),L=E.querySelector("#form__mesto-avatar-url-input"),k=E.querySelector(".form__accept"),C=document.querySelector(".profile__avatar-group"),T=document.querySelector(".profile__avatar");function P(e){e.classList.add("popup_open"),document.addEventListener("keydown",O)}function j(e){e.classList.remove("popup_open"),document.removeEventListener("keydown",O)}function O(e){"Escape"===e.key&&j(document.querySelector(".popup_open"))}function x(e){q.textContent=e,P(b)}function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){w(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B={name:"",about:"",avatar:"",_id:"",cohort:""};function G(e){return B.name=e.name,B.about=e.about,B.avatar=e.avatar,B._id=e._id,B.cohort=e.cohort,U(),D({},B)}function U(){T.src=B.avatar,p.textContent=B.name,m.textContent=B.about}var H,M={GET:"GET",PUT:"PUT",POST:"POST",UPDATE:"UPDATE",PATCH:"PATCH",DELETE:"DELETE"},N={headers:{Authorization:"fb67a6f2-1294-49f9-bf70-71dc37364dd5","Content-Type":"application/json"},baseurl:"https://nomoreparties.co/v1/".concat("plus-cohort-15","/")};function z(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n={headers:N.headers,method:e.method};return M!==M.GET&&t&&(n.body=JSON.stringify(t)),fetch(N.baseurl+e.endpoint,n).then((function(e){return e.ok?e.json():Promise.reject(e)}))}function J(e){S.prepend(e)}function F(e){var t,n=v.cloneNode(!0),r=n.querySelector(".card__image"),o=n.querySelector(".card__description-text"),c=n.querySelector(".card__remove-icon"),i=n.querySelector(".card__description-like"),u=n.querySelector(".card__description-like-count"),a=e.owner._id,s=e.likes.map((function(e){return e._id}));return u.textContent=s.length,r.src=e.link,r.alt=e.name,o.textContent=e.name,s.some((function(e){return B._id===e}))&&i.classList.add("card__description-like_active"),t=a,B._id===t?c.addEventListener("click",(function(t){return function(e,t){(function(e){return z({endpoint:"cards/".concat(e),method:M.DELETE})})(t).then((function(t){e.target.closest(".card").remove()})).catch((function(e){return e.json().then((function(e){x(e.message)}))}))}(t,e._id)})):c.classList.add("card__remove-icon_type_hidden"),i.addEventListener("click",(function(t){return function(e,t,n){e.classList.contains("card__description-like_active")?function(e){return z({endpoint:"cards/likes/".concat(e),method:M.DELETE})}(t).then((function(t){n.textContent=t.likes.length,e.classList.remove("card__description-like_active")})).catch((function(e){return e.json().then((function(e){x(e.message)}))})):function(e){return z({endpoint:"cards/likes/".concat(e),method:M.PUT})}(t).then((function(t){n.textContent=t.likes.length,e.classList.add("card__description-like_active")})).catch((function(e){return e.json().then((function(e){x(e.message)}))}))}(i,e._id,u)})),r.addEventListener("click",(function(t){return n=e.name,r=e.link,y.src=r,y.alt=n,h.textContent=n,void P(_);var n,r})),n}function I(e){var t=!e.validity.patternMismatch,n=e.validity.valid;return t&&!n?{valid:!1,message:e.validationMessage}:t||n?t&&n?{valid:!0,message:""}:void 0:{valid:!1,message:e.dataset.errorMsg}}function K(e){e.setAttribute("disabled","disabled")}function Q(e,t){e.textContent=t}function R(e){var t,n;e.preventDefault(),(t=s.value,n=s.value,z({endpoint:"users/me",method:M.PATCH},{name:t,about:n})).then((function(e){!function(e,t){B.name=e,B.about=t,U(),D({},B)}(e.name,e.about),j(u),K(d)})).catch((function(e){return e.json().then((function(e){j(u),K(d),x(e.message)}))}))}function V(e){e.preventDefault();var t=c.value,r=i.value;Q(o,"Идет сохранение"),function(e,t){return z({endpoint:"cards",method:M.POST},{name:e,link:t})}(t,r).then((function(e){Q(o,"Успешно"),K(o),setTimeout((function(){j(n),J(F(e)),Q(o,"Сохранить"),x(error.message)}),1e3)})).catch((function(e){return e.json().then((function(e){Q(o,"Не удалось добавить карточку"),K(o),setTimeout((function(){j(n),Q(o,"Сохранить"),x(e.message)}),1e3)}))}))}function W(e){e.preventDefault();var t=L.value;Q(k,"Сохраняю..."),function(e){return z({endpoint:"users/me/avatar",method:M.PATCH},{avatar:e})}(t).then((function(e){Q(k,"Успешно"),K(k),G(e),j(E),Q(k,"Сохранить"),L.value=""})).catch((function(e){return e.json().then((function(e){j(E),K(k),x(e.message),Q(k,"Сохранить"),L.value=""}))}))}H={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__accept",inactiveButtonClass:"form__accept_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input__error_visible"},document.querySelectorAll(H.formSelector).forEach((function(e){return function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("."+t.id+"-error"),o=I(t);o.valid?function(e,t,n){e.textContent="",t.classList.remove(n.inputErrorClass)}(r,t,n):function(e,t,n,r){e.textContent=t,n.classList.add(r.inputErrorClass)}(r,o.message,t,o),o.valid}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!I(e).valid}))}(e)?(t.removeAttribute("disabled"),t.classList.remove(n.inactiveButtonClass)):(t.setAttribute("disabled","disabled"),t.classList.add(n.inactiveButtonClass))}(n,r,t)}))}))}(e,H)})),t.addEventListener("click",(function(){c.value="",i.value="",P(n)})),r.addEventListener("submit",(function(e){return V(e)})),f.addEventListener("click",(function(){return function(e){var t={name:p.textContent,about:m.textContent};s.value=t.name,l.value=t.about,P(e)}(u)})),a.addEventListener("submit",(function(e){return R(e)})),C.addEventListener("click",(function(){P(E)})),g.addEventListener("submit",(function(e){return W(e)})),e.forEach((function(e){return e.addEventListener("mousedown",(function(t){return function(e,t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-btn"))&&j(e)}(e,t)}))})),Promise.all([z({endpoint:"users/me",method:M.GET}),z({endpoint:"cards",method:M.GET})]).then((function(e){var t;G(e[0]),(t=e[1].reverse())&&t.forEach((function(e){return J(F(e))}))})).catch((function(e){return e.json().then((function(e){return x(e.message)}))}))})();