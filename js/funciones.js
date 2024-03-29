import { Notificacion } from './clases/Notificacion.js';
import AdminCitas from './clases/AdminCitas.js';
import { citaObj, editando } from './variables.js'
import { formulario, formularioInput, pacientesInput, propietarioInput, emailInput, fechaInput, sintomasInput } from './selectores.js';

const citas = new AdminCitas()//instanciamos

//funciones
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

export function submitCita(e){
    e.preventDefault();
    
    //forma 1 de validaciob
    
    /*const { paciente, propietario, email, fecha, sintomas } = citaObj
    if( paciente.trim() === '' || propietario.trim() === '' || email.trim() === '' || sintomas.trim() === ''){
        console.log('Todos los campos son obligatorio');
        return
    }*/

    //forma 2 de validacion


    //if(Object.values(citaObj).includes('')){//include va a revisar todos los valores de un arreglo pero si uno le ponemos espacio va a tomar como valido
    if(Object.values(citaObj).some(valor => valor.trim() === '')){//some revisa que al menos 1 tenga la condicion 
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return
    }

    if(editando.value){
        citas.editar({...citaObj})
        new Notificacion({
            texto: 'Guardado Correctamente',
            tipo: 'exito'
        })
    } else {
        citas.agregar({...citaObj})//una copia de citaObj
        new Notificacion({
            texto: 'Paciente Registrado',
            tipo: 'exito'
        })
    }

    formulario.reset()
    reiniciarObjectoCita()
    formularioInput.value = 'Registrar Paciente'
    editando.value = false
}

export function reiniciarObjectoCita(){
    //Reiniciar el objeto

    //citaObj.id = generarId();
    /*citaObj.paciente = '';
    citaObj.propietario = '';
    citaObj.email = '';
    citaObj.fecha = '';
    citaObj.sintomas = '';*/

    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    })
}

export function generarId(){
    return Math.random().toString(36).substring(2) + Date.now()
}


export function cargarEdicion(cita){
    Object.assign(citaObj, cita)

    pacientesInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    emailInput.value = cita.email
    fechaInput.value = cita.fecha
    sintomasInput.value = cita.sintomas

    editando.value = true

    formularioInput.value = 'Guardar Cambios'
}