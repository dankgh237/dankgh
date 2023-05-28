const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");
const inputError = document.querySelector("section#register .input-error");
const btnRegister = document.querySelector("section#register #btn-submit-register")

document.addEventListener("DOMContentLoaded",function(e){
    /* ==============================================
         Login
    =============================================== */
    closeInputError();

    btnRegister.onclick = async(e)=> {
        e.preventDefault();
        const data = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            "confirm password": confirm_password.value
        };
        const res = await fetch("/register", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(data),
        });
        const resp = await res.json();
        console.log(resp);

        if(resp.success){
            inputError.classList.remove("error");
            inputError.classList.add("success");
            inputError.innerHTML = `<div>${resp.success.message}</div><div><button class="btn-close-error">&times;</button></div>`;
            [firstname,lastname,email,password,confirm_password].forEach((i)=>i.value='');
            // location.href = "http://localhost:3000/login";
            location.pathname = resp.success.url;
            return;
        }
        if(resp.error) {
            inputError.classList.add("error");
            inputError.innerHTML = `<div>${resp.error.message}</div><div><button class="btn-close-error">&times;</button></div>`;
        } else {
            inputError.classList.remove("error");
        }
    };


    function closeInputError() {
        inputError.onclick=e=>{
            if(e.target.classList.contains("btn-close-error")){
                inputError.innerHTML = '';
                inputError.classList.remove(...['error','success']);
            }
        }
    }

});







