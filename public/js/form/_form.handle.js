import {GroupUtils, Reset} from "./_utils.classes.js";
const inputGroups = document.querySelectorAll(".input-group");
const btn_resets = document.querySelectorAll("button[type='reset']");

inputGroups.forEach(group=>{
    group.addEventListener("click",(e)=>{
        if(GroupUtils.isClearable(e)){
            GroupUtils.emptyPass(e);
            GroupUtils.removeIcons(e);
            GroupUtils.focusOut(e);
            if(GroupUtils.isPassword(e)) GroupUtils.passType(e);
        }
        if(GroupUtils.isViewPass(e)){
            GroupUtils._password(e,'text');
            GroupUtils.remove(e);
            GroupUtils.add(e,2);
        }
        if(GroupUtils.isHidePass(e)){
            GroupUtils._password(e,'password');
            GroupUtils.remove(e);
            GroupUtils.add(e,1);
        }
    })
});

btn_resets.forEach((reset,i)=> reset.onclick=e=> Reset.reset(e,i));