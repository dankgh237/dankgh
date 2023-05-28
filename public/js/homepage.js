
/* ==============================================
      Send Email Message
 =============================================== */
 $(document).ready(function () {
    const name = document.getElementsByName("name")[0];
    const email = document.getElementsByName("email")[0];
    const subject = document.getElementsByName("subject")[0];
    const message = document.getElementById("message");
    const inputError = document.querySelector(".input-error");

    [name,email,subject,message].forEach((i)=>i.onfocus=e=>i.classList.remove(...['invalid','valid']));


    // name.oninput =e=>console.log(Validate.name(name));
    // email.oninput =e=>console.log(Validate.email(email));
    // subject.oninput =e=>console.log(Validate.subject(subject));
    // message.oninput =e=>console.log(Validate.message(message));

    function closeInputError() {
      inputError.onclick=e=>{
        if(e.target.classList.contains("btn-close-error")){
          inputError.innerHTML = '';
          inputError.classList.remove(...['error','success']);
        }
      }
    }
    closeInputError();



  $(".btn-send").click(async function (e) {
    e.preventDefault();
    console.log(new FormData(document.getElementById("main-contact-form")));
    
    const data = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };
    const formData = new FormData(document.getElementById("main-contact-form"));

    const res = await fetch("/send/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    });
    const resp = await res.json();
    console.log(resp);


    if(resp.success){
      [name,email,subject,message].forEach((i,index)=>i.classList.add("valid"));
      inputError.classList.remove("error");
      inputError.classList.add("success");
      inputError.innerHTML = `<span>${resp.success.message}</span> <button class="btn-close-error">&times;</button>`;
      [name,email,subject,message].forEach((i)=>i.value='');
      return;

    }


    if(resp.error) {
      inputError.classList.add("error");
      inputError.innerHTML = `<span>${resp.error.message}</span> <button class="btn-close-error">&times;</button>`;
      [name,email,subject,message].forEach((i,index)=>
        {i.classList.contains("invalid") && index == 0?i.classList.add("valid"):i.classList.remove("invalid")});
      const errorInputElement = [name,email,subject,message].filter(i=>resp.error.context.label == i.name);
      errorInputElement[0].classList.remove("valid");
      errorInputElement[0].classList.add("invalid");
      console.log(errorInputElement);

 

      return;
    } else {
      [name,email,subject,message].forEach((i,index)=>{
        i.classList.remove("invalid");
        i.classList.add("valid");
      });
      inputError.classList.remove("error");

    }

    if(resp.mail_error) {
      inputError.classList.add("error");
      inputError.innerHTML = `<span>${resp.mail_error.message}</span> <button class="btn-close-error">&times;</button>`;
      return;
    }
  });

});
