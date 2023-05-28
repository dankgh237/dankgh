import {IconUtils} from "./_utils.classes.js";
const inputs = document.querySelectorAll("input");
const clearIcons = document.querySelectorAll(".clearable");

inputs.forEach((input,i)=>input.oninput=e=>{
    if(IconUtils._ct_val(e) === ''){
        if(IconUtils.password(e)) IconUtils._ct_type(e);
        IconUtils._icons(e,2).forEach(icon=>IconUtils.rm(icon));
    }
    else{
        clearIcons[i].classList.add('focus');
        if(IconUtils.password(e)){
            if(!IconUtils.contain(e,2)){
                IconUtils.add(e,1);
                IconUtils.remove(e,2);
            } else {
                IconUtils.add(e,2);
                IconUtils.remove(e,1);
            }
        }
    }
});

inputs.forEach(input=> {
    input.placeholder = "";
    input.addEventListener("focusout",(e)=>
        input.value === ''?input.parentNode.children[0].classList.remove("focus"):null);
        input.addEventListener("focus",e=> input.parentNode.children[0].classList.add("focus"));
        input.addEventListener("focusin",e=> input.parentNode.children[0].classList.add("focus"));
});
document.addEventListener("DOMContentLoaded",(e)=> {
    inputs.forEach(input=>{
        if(input.autocomplete) input.parentNode.children[0].classList.add("focus");
    });

})