//Selectores
const pacientesInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');


//Objeto de cita
const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

class Notificacion{
    constructor({texto, tipo}){
        this.texto = texto
        this.tipo = tipo

        this.mostrar()
    }
    //metodo
    mostrar(){
        //crear la notificacion

        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        //Eliminar alertas duplicadas
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove();//le ponemos ? comprueba si existe y lo elimino
        

        //Si es de tipo error agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alert.classList.add('bh-green-500');

        //Mensaje de error
        alerta.textContent = this.texto

        //Insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario); //inserta la alerta antes del formulario

        //Quitar despues de 5 segundo
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

class AdminCitas{
    constructor(){
        this.citas = [];
        
    }

    agregar(cita){
        this.citas = [...this.citas, cita]
        console.log(this.citas);
    }
}

//Eventos
pacientesInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);

//funciones
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

const citas = new AdminCitas()

function submitCita(e){
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
    citas.agregar(citaObj)
}

//clases

