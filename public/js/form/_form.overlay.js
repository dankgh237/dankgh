const btn_sign_in_overlay = document.querySelector("#form-overlay .sign-in-overlay #signIn");
const btn_sign_up_overlay = document.querySelector("#form-overlay .sign-up-overlay #signUp");
const btn_mobile_login = document.querySelector("section#login .mobile-link.login a");
const btn_mobile_register = document.querySelector("section#register .mobile-link.register a");
const form_overlay = document.querySelector("#form-overlay");
const preloader = document.querySelector(".preloader");

const title = (title) => (document.querySelector("title").innerHTML = title);
const login = "| &#10057; DankGh &#10132; Login Form |";
const register = "| &#10057; DankGh &#10132; Registration Form|";


btn_sign_up_overlay.onclick = (e) => (title(register), form_overlay.classList.add("active"));
btn_sign_in_overlay.onclick = (e) => (title(login), form_overlay.classList.remove("active"));
btn_mobile_login.onclick = (e) => (e.preventDefault(), btn_sign_up_overlay.click());
btn_mobile_register.onclick = (e) => (e.preventDefault(), btn_sign_in_overlay.click());

