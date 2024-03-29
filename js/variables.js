import { generarId } from "./funciones.js"

let editando = {
    value: false
}

//Objeto de cita
const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

export {
    editando,
    citaObj
}
