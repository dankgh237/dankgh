const eRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi;
const nRegex = /\w+[\S]+\s\w+.+/gmi,sRegex = /[\w\d]+./gmi,mRegex = sRegex;
const regex = [
     {regexp:nRegex,msg:(input)=>`${input.name || input.id} must be two or more words (firstname lastname)`},
     {regexp:eRegex,msg:(input)=>`${input.name || input.id} must be a valid email (items@mail.net)`},
     {regexp:sRegex,msg:(input)=>`${input.name || input.id} must be at least a word`},
     {regexp:mRegex,msg:(input)=>`${input.name || input.id} must contain at least a word`},
     ];
const limits = [{min:0,max:5},{min:1,max:150},{min:1,max:150},{min:1,max:2000}];


document.addEventListener("DOMContentLoaded",function(e){
     const name = document.querySelector("[name='name']");
     const email = document.querySelector("[name='email']");
     const subject = document.querySelector("[name='subject']");
     const message = document.querySelector("[name='message']");

     const ErrorMsg = (msg,count)=> `<div class="text-msg">${msg}</div><div class="count">${count}</div>`;
     [name,email,subject,message].forEach(function(item) {
          item.parentNode.insertAdjacentHTML("beforeEnd",`<div class="form-text text-muted error-feedback"> ${ErrorMsg('','')}</div>`);
     });

     function EmptyInput(input) {
          let isError = null;
          if(input.value == ''||null||undefined) {
               input.classList.remove('valid'); input.classList.add('invalid');
               input.nextElementSibling.style.cssText = 'color:red';
               input.nextElementSibling.innerHTML = ErrorMsg(
                    `${input.name || input.id} is not allowed to be empty`,input.value.length
                    );
               isError = true
          } else{
               input.classList.remove('invalid');input.classList.add('valid');
               input.nextElementSibling.style.cssText = 'color:green';
               input.nextElementSibling.innerHTML = ErrorMsg('',input.value.length); 
               isError = false;
          };
          
          return isError;
     }

     function MinMax(input,min,max){
          let isError = null;
          if(input.value.length < min) {
               input.classList.remove('valid'); input.classList.add('invalid');
               input.nextElementSibling.style.cssText = 'color:red';
               input.nextElementSibling.innerHTML = ErrorMsg(`${input.name || input.id} should not be less than ${min}`,input.value.length);
               isError = true; 
          }
          else if(input.value.length > max){ 
               input.classList.remove('valid'); input.classList.add('invalid');
               input.nextElementSibling.style.cssText = 'color:red';
               input.nextElementSibling.innerHTML = ErrorMsg(`${input.name || input.id} should not exceed ${max}`,input.value.length);
               isError = true
          } else {
               input.classList.remove('invalid');input.classList.add('valid');
               input.nextElementSibling.style.cssText = 'color:green';
               input.nextElementSibling.innerHTML = ErrorMsg('',input.value.length);
               isError = false;
          }

          return isError;
     };
     
     function MatchPattern(input,regexp,msg) {
          let isError = null;
          if(input.value.match(regexp) == null || undefined || '') {
               input.classList.remove('valid'); input.classList.add('invalid');
               input.nextElementSibling.style.cssText = 'color:red';
               input.nextElementSibling.innerHTML = ErrorMsg(msg,input.value.length);
               isError = true; 
          } else {
               input.classList.remove('invalid');input.classList.add('valid');
               input.nextElementSibling.style.cssText = 'color:green';
               input.nextElementSibling.innerHTML = ErrorMsg('',input.value.length);
               isError = false;
          }
          return isError;    
     }


     [name,email,subject,message].forEach((c,i)=>c.oninput=e=>{
          if(EmptyInput(c)) return EmptyInput(c);
          if(MinMax(c,limits[i].min,limits[i].max)) return MinMax(c,limits[i].min,limits[i].max);
          if(MatchPattern(c,regex[i].regexp,regex[i].msg(c))) return MatchPattern(c,regex[i].regexp,regex[i].msg(c));
     
     });







     
/* ==============================================
      Send Email Message
 =============================================== */
     const inputError = document.querySelector(".input-error");
     const btnSend = document.querySelector(".btn-send");
     [name,email,subject,message].forEach((i)=>i.onfocus=e=>i.classList.remove(...['invalid','valid']));
 
     function closeInputError() {
       inputError.onclick=e=>{
         if(e.target.classList.contains("btn-close-error")){
           inputError.innerHTML = '';
           inputError.classList.remove(...['error','success']);
         }
       }
     }
     closeInputError();
 
btnSend.onclick = async(e)=> {
     e.preventDefault();
     const data = {
       name: name.value,
       email: email.value,
       subject: subject.value,
       message: message.value,
     };
   
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
       inputError.innerHTML = `<div>${resp.success.message}</div> <button class="btn-close-error">&times;</button>`;
       [name,email,subject,message].forEach((i)=>i.value='');
       return;
     }
 
     if(resp.error) {
       inputError.classList.add("error");
       inputError.innerHTML = `<div>${resp.error.message}</div> <button class="btn-close-error">&times;</button>`;
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
       inputError.innerHTML = `<div>${resp.mail_error.message}</div> <button class="btn-close-error">&times;</button>`;
       return;
     }
   };

});


     
  