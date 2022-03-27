const Tarea = require('./tarea');


class Tareas { //se crea una clase 

    _listado = {
        'abc': 123
    }; //se crea una propiedad llamada _listado------------

    //se maneja como objeto cuando esta entre llaves ({})
    // se maneja como un arreglo cuando esta entre corchetes([])

    //hare el cambio en el codigo para que en pantalla se vea mas limpio cuando se listan las tareas y no tan bisarro 
    get listadoArr() {// se usa un get para retornar un arreglo----------

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            //cambiamos "console.log(key);" por const tarea =  this._listado[key]; para que sea un objeto y con el .push nos muestre el resultado 
            const tarea = this._listado[key];//se extrae la tarea que ya se contiene-----------
            //para que aparezcan los litados inseramnos los listados con el siguiente comando 
            listado.push(tarea);// se añande al listado-----

        });

        return listado;// el listado es el que se retorna o se muestra --------
    }
    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }



    }


    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;

        });
    }


    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }


    listadoCompleto() {

        console.log();//esta hace la funcion de un espacio en la pantalla entre litar tareas y la numeracion de ellas 

        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            //console.log(idx);
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) //si completadoEn existe 
                ? 'Completado'.green //se va a mostrar completado 
                : 'pendiente'.red; //del caso contrario 
            //console.log(`${ idx } ${desc} ::: ${ estado }`); que el resultado seria igual al siguiente
            //1._  Alma :: Completada/ Pendiente
            console.log(`${idx} ${desc} ::: ${estado}`);
        });
    }

    listarPendientesCompletadas(Completadas = true) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                 ? 'Completado'.green
                                 : 'Pendiente'.red;
            if (Completadas) {
                //mostrar las copletadas 
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} ::: ${completadoEn.yellow}`);
                }

            } else {
                //mostrar pendientes 
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} ::: ${estado}`);
                }

            }

        });




    }

    toggleCompletadas(ids = []) {


        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()

            }
        });

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
              
            }

        });


    }

}


module.exports = Tareas;


