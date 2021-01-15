class Validator {

   constructor(fieldsErrors) 
   {
      this.fieldsErrors = fieldsErrors;
   }

   isFieldsEmpty(fields)
   {
      let isEmpty = false;
      for (let key in fields) {
         if (fields[key] === '') {
            this.fieldsErrors = {
               ...this.fieldsErrors,
               [key]: {
                  state: true,
                  text: 'es obligatorio.'
               }
            }
            isEmpty = true;
         } 
      }
      if(isEmpty) return [true, this.fieldsErrors];
      return [false];
   }

   fieldsMinValue(fields, min)
   {
      let isMinValue = false;
      for (let key in fields) {
         if (fields[key].length < min && fields[key] !== '') {
            this.fieldsErrors = {
               ...this.fieldsErrors,
               [key]: { 
                  state: true,
                  text: 'debe tener 3 o más caracteres'
               } 
            }
            isMinValue = true;
         }
      }
      if(isMinValue) return [true, this.fieldsErrors];
      return [false];
   }  
}

export default Validator;

// const validateFields = new Validator();
// export { validateFields };