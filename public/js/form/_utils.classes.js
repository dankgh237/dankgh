class IconUtils {
    static contain =(event,pos)=>
        event.currentTarget.parentElement.children[2].children[pos].classList.contains("focus");
    static add =(event,pos)=>
        event.currentTarget.parentElement.children[2].children[pos].classList.add("focus");
    static remove = (event,pos) =>
        event.currentTarget.parentElement.children[2].children[pos].classList.remove("focus");
    static _icons =(event,pos)=>[...event.currentTarget.parentNode.children[pos].children];
    static _ct_type =event=> event.currentTarget.type = 'password';
    static _ct_val =event=> event.currentTarget.value;
    static password =(event)=> event.currentTarget.classList.contains("password");
    static rm =item=>item.classList.remove('focus');
};

class GroupUtils {
    static isClearable =event=>event.target.classList.contains("clearable");
    static password =event=> event.currentTarget.children[1];
    static isPassword=event=>this.password(event).classList.contains("password");
    static emptyPass =event=>this.password(event).value = '';
    static passType =(event)=>this.password(event).type='password';
    static _rm =icon=>icon.classList.remove('focus');
    static _icons =event=>[...event.target.parentNode.children];
    static removeIcons = (event)=>this._icons(event).forEach(icon=>this._rm(icon));
    static isViewPass =event=>event.target.classList.contains("password-visibility-on");
    static isHidePass =event=>event.target.classList.contains("password-visibility-off");
    static _password =(event,type)=>event.target.parentNode.parentNode.children[1].type =type;
    static add =(event,pos)=>event.target.parentNode.children[pos].classList.add("focus");
    static remove = event=>event.target.classList.remove("focus");
    static focusOut = event=>event.currentTarget.children[0].classList.remove("focus");
};

class Reset{
    static form = index => document.forms[index].reset();
    static form_items =event=>[...event.currentTarget.parentNode.parentNode.children[1].children]
    static clearable = event=> this.form_items(event)
        .filter(i=>i.classList.contains("input-group"))
        .map(i=>i.children[2].children[0].click());
    static reset =(event,index)=>{
        event.preventDefault();
        this.form(index);
        this.clearable(event);
    }
}




export {IconUtils,GroupUtils,Reset};