export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innertHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innertHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tiposDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError= {
    nombre: {
        valueMissing: "El campo de nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo de correo no puede estar vacío",
        typeMismatch: "Este correo no es válido",
    },
    password: {
        valueMissing: "El campo de contraseña no puede estar vacío",
        patternMismatch: "La contraseña debe contener al menos 6 caracteres y máximo 12, pueden ser mayúscual o minúscula, debe contener un número, y un carácter especial.",
    },
    nacimiento: {
        valueMissing: "El campo de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad.",
    },
    numero: {
        valueMissing: "El campo de número no puede estar vacío",
        patternMismatch: "El formato válido para número es XXXXXXXXXX",
    },
    direccion: {
        valueMissing: "El campo de direccion no puede estar vacío",
        patternMismatch: "El campo dirección debe contener al menos 10 carácteres",
    },
    ciudad: {
        valueMissing: "El campo de ciudad no puede estar vacío",
        patternMismatch: "El campo ciudad debe contener al menos 4 carácteres",
    },
    municipio: {
        valueMissing: "El campo de municipio no puede estar vacío",
        patternMismatch: "El campo municipio debe contener al menos 4 carácteres",
    }
};

const validadores = {
    nacimiento: (input) => fechaNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tiposDeError.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
};

function fechaNacimiento (input) {
    const fechaCliente= new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){//si no es verdadero, es decir, false.
        mensaje= "Debes tener al menos 18 años de edad."
    }
    input.setCustomValidity(mensaje);
};

function mayorEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
};  