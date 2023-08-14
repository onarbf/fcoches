const  validator = require('validator');

export const validators = {
    email: ({email}: {email: string})=>{
        
        let success = true;
        let messages: string[] = []

        if(validator.isEmpty(email)){
            success = false
            messages.push('El campo email está vacío')
        }


        if(!validator.isEmail(email)){
            success = false
            messages.push('El campo email no es un email')
        }
        
        return [
            success,
            messages && "- " + messages.join("\n- ")
        ]
    },
    password: ({password, repeatedPassword}: {password: string, repeatedPassword: string})=>{
        let success = true;
        let messages: string[] = []

        if(validator.isEmpty(password)){
            success = false
            messages.push('El campo password está vacío')
        }

        if(!validator.isLength(password,{min:5}))
        {
            success = false
            messages.push('El password debe ser mayor de 6 caracteres')
        }

        if(!validator.equals(password, repeatedPassword)){
            success = false
            messages.push('Los passwords no coinciden')
        }

        return [
            success,
            messages && "- " + messages.join("\n- ")
        ]
    },
    username: ({username}: {username: string})=>{
        let success = true;
        let messages: string[] = []

        if(validator.isEmpty(username)){
            success = false
            messages.push('El campo username está vacío')
        }
        if(!validator.isLength(username,{ min: 4, max: 20 })){
            success = false
            messages.push('El username debe tener entre 4 y 20 letras')
        }

        if(!validator.isLowercase(username)){
            success = false
            messages.push('Solo puedes usar minúsculas para el username')
        }


        return [
            success,
            messages && "- " + messages.join("\n- ")
        ]
    },
    title: ({title}: {title: string})=>{
        let success = true;
        let messages: string[] = []

        if(validator.isEmpty(title)){
            success = false
            messages.push('El campo título está vacío')
        }
        if(!validator.isLength(title,{ min: 4, max: 150 })){
            success = false
            messages.push('El título debe tener entre 4 y 150 letras')
        }

        return [
            success,
            messages && "- " + messages.join("\n- ")
        ]
    },
    body: ({body}: {body: string})=>{
        console.log('body',body)
        let success = true;
        let messages: string[] = []

        if(validator.isEmpty(body)){
            console.log('body',body)
            success = false
            messages.push('El cuerpo está vacío')
        }
        if(!validator.isLength(body,{ min: 4, max: 4000 })){
            console.log('body',body)
            success = false
            messages.push('El cuerpo debe tener entre 4 y 40000 letras')
        }
        console.log('body',body)
        return [
            success,
            messages && "- " + messages.join("\n- ")
        ]
    }
    
} 