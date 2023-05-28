document.addEventListener("DOMContentLoaded",function(e){
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    const inputError = document.querySelector("section#login .input-error");
    const btnLogin = document.querySelector("section#login #btn-submit-login");

    /* ==============================================
         Login
    =============================================== */
    closeInputError();

    btnLogin.onclick = async(e)=> {
        e.preventDefault();
        const data = {
            email: email.value,
            password: password.value,
        };
        const res = await fetch("/login", {
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
            [email,password].forEach((i)=>i.value='');
            // location.href = "http://localhost:3000/quizzes";
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
            };
        }
    };
});







