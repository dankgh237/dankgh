const btn_sign_in_overlay = document.querySelector("#form-overlay .sign-in-overlay #signIn");
const btn_sign_up_overlay = document.querySelector("#form-overlay .sign-up-overlay #signUp");
const btn_mobile_login = document.querySelector('.mobile-link.login a');
const btn_mobile_register = document.querySelector('.mobile-link.register a');
const sign_in_overlay = document.querySelector("#form-overlay .sign-in-overlay");
const sign_up_overlay = document.querySelector("#form-overlay .sign-up-overlay");
const loginForm = document.querySelector(("#login"));
const registerForm = document.querySelector(("#register"));
const media = window.matchMedia("(max-width:600px)");

if(media.matches){
    btn_sign_in_overlay.onclick = e=>{
        e.preventDefault();
        sign_in_overlay.style.cssText = `z-index:1;transform:translateX(100%);`;
        loginForm.style.cssText = `z-index:4;transform:translateX(0%);`;
        sign_up_overlay.style.cssText = `z-index:3;transform:translateX(100%);`;
        registerForm.style.cssText = `z-index:2;transform:translateX(0%);`;
    };
    btn_mobile_login.onclick=e=>{
        e.preventDefault();
        loginForm.style.cssText = `z-index:1; transform:translateX(100%);`;
        sign_up_overlay.style.cssText = `z-index:4; transform:translateX(0);`;
        registerForm.style.cssText = `z-index:3;transform:translateX(100%);`;
        sign_in_overlay.style.cssText = `z-index:2;transform:translateX(0%);`;
    }
    btn_sign_up_overlay.onclick = e=>{
        sign_up_overlay.style.cssText = `z-index:1;transform:translateX(100%);`;
        registerForm.style.cssText = `z-index:4;transform:translateX(0%);`;
        sign_in_overlay.style.cssText = `z-index:3;transform:translateX(100%);`;
        loginForm.style.cssText = `z-index:2;transform:translateX(0%);`;
    };
    btn_mobile_register.onclick = e=>{
        e.preventDefault();
        registerForm.style.cssText = `z-index:1;transform:translateX(100%);`;
        sign_in_overlay.style.cssText = `z-index:4;transform:translateX(0%);`;
        loginForm.style.cssText = `z-index:3;transform:translateX(100%);`;
        sign_up_overlay.style.cssText = `z-index:2;transform:translateX(0%);`;
    };
}