class Validate {
    static emptyInput(inputElement) {
      return inputElement.value == "" || null
        ? `"${
            inputElement.id || inputElement.name
          }" is not allowed to be empty`
        : "";
    };

    static minMax(inputElement, min = 0, max = 100) {
      return inputElement.value.length <=  min
        ? `"${
            inputElement.id || inputElement.name
          }" must be more than ${min} characters `
        : inputElement.value.length >= max
        ? `"${
            inputElement.id || inputElement.name
          }" must not exceed ${max} characters `
        : "";
    }

    static matchEmail(email) {
      const regex = /[\w<>,"*&^%$#!~`';:\/\\]+@\w+.\w{2,5}/gm;
      return !email.value.match(regex) || email.value.match(regex) == null
        ? "please enter a valid email"
        : "";
    }
    static name(name){
      return this.emptyInput(name) != '' || null ? this.emptyInput(name):
      this.minMax(name) != "" || null ? this.minMax(name):""
    }
    static email(email){
     return this.emptyInput(email) != '' || null ? this.emptyInput(email):
      this.minMax(email) != "" || null ? this.minMax(email):
       this.matchEmail(email) !=''||null? this.matchEmail(email):""
    }
    static subject(subject){
      emptyInput(subject) != '' || null ? emptyInput(subject):
      minMax(subject) != "" || null ? minMax(subject):""
    }
    static message(message){
      emptyInput(message) != '' || null ? emptyInput(message):
      minMax(message) != "" || null ? minMax(message):""
    }

  }
export {Validate};