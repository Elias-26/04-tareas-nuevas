const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');


//aqui en el menú se puede hacer cambios de colores a las letras y numeros
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que Quieres Hacer?',
        /**TIP: para editar multilineas solo manten pulsado ALT y con el cursos selecciona las partes donde quieres 
        editar o colocar lo que quieres para que no despercies tiempo yendo uno en uno*/
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea` //si se quiere hacer un cambio de color es en el "name" ya que este es el que se muestra en la pantala
            },
            {
                value: '2',
                name: `${'2.'.green} listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]

    }
];




const inquirerMenu = async () => {

    console.clear();// tiene la funcion de borrar todo antes de mostrar el resultado en la pantalla y no muestre todo el "historial" y se mueste mas limpio el codigo. 

    console.log('========================'.green);
    console.log(' Seleccione una opcion  '.yellow);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);


    return opcion;

}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiona ${'enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}
//crear funciones se hace const
const leerInput = async (message) => {
    //para el question siempre debe de ir un valor en el message 
    // es por ello que se va a utilizar el validate para definir una funcion dentro del mismo objeto. 
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            //el value.length hara que si el valor es igual a cero pedira que se ingrese un valor

            validate(value) {
                if (value.length === 0) {
                    return 'por favor ingresa un valor ';
                    //pero el return true significa que la validacion la paso perfecto
                }
                return true;

            }

        }
    ];
    //para utilizar el question se tiene que coloar una constante (const) 

    const { desc } = await inquirer.prompt(question);
    // la question desestructura un objeto, asi que colocaremos el desc para desestructurar esa parte
    return desc;


}
//cada que querramos utilizar el await usaremos un async 

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Alto. Casi la cagas !!! (cancelar)'

    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    //formato del await a usar     const { opcion } = await inquirer.prompt(preguntas);

    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


const MostrarListadoCheckList = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            /*se agrega un checked para seleccionar las tareas */
            // (checked: true) haremos un cambio en este ya que con el true, se muestran todas las tareas completadas
            // se agregara algo ma especifico. 
            checked: (tarea.completadoEn) ? true : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    

    //formato del await a usar     const { opcion } = await inquirer.prompt(preguntas);

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}



module.exports = {
    //siempre debemos de asegurar de que se Exporten
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    MostrarListadoCheckList
}


