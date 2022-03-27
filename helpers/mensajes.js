const { rejects } = require('assert');

require('colors');



const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('========================'.green);
        console.log(' Seleccione una opcion  '.red);
        console.log('========================\n'.green);
        // para hacer la slash inversa es (alt Gr + tecla de interrogacion (?) \)

        console.log(`${'1.'.yellow} ${'Crear una tarea'.magenta}`);
        console.log(`${'2.'.yellow} ${'listar tareas'.magenta}`);
        console.log(`${'3.'.yellow} ${'listar tareas completas'.magenta}`);
        console.log(`${'4.'.yellow} ${'listar tareas pendientes'.magenta}`);
        console.log(`${'5.'.yellow} ${'Completar tarea(s)'.magenta}`);
        console.log(`${'6.'.yellow} ${'Borrar tarea'.magenta}`);
        console.log(`${'7.'.yellow} ${'Salir\n'.yellow}`);


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });



}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout

        });

        readline.question(`\nPresione ${'Enter'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })

    });

}

module.exports = {
    mostrarMenu

}
