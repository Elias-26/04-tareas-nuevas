require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
/* para saber si una importacion no se esta utilizando aun en el codigo 
solo se tiene que ver en el color de la letra, ya que se mostrara de una manera
mas opaca en el color del mismo cofigo */
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    MostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {


    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { //aqui es donde se deben sargan las tareas 
        //establecer las tareas(solo funciona para leer las tareas)
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //esto imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion 
                //utilizaremos aqui el leerInput 
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc); /** anterior a este comando estaba cons.log (desc); para mostrar el mensaje de la descripcion
               al colocar tareas.crearTarea(desc); se hace que se listen las tareas con forme se van agregando a la lista */
                break;

            case '2':
                tareas.listadoCompleto();
                //console.log( tareas.listadoArr );
                break;
            case '3': //listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': //listar pendientes 
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //Completar | pendientes Tareas
                const ids = await MostrarListadoCheckList(tareas.listadoArr);
                //console.log(ids); se sustituye para llamar al toggle de tareas.completadoEn
                tareas.toggleCompletadas(ids);
                break;

            case '6': //borrar tareas 
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');

                    }

                }
                break;

        }


        guardarDB(tareas.listadoArr);
        await pausa();


    } while (opt !== '0');


    //pausa();


}


main();

