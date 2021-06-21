require('colors');

const {inquirerMenu, pausa, leerInput, 
    listadoTareasBorrar, confirmar, 
    mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');

const main = async()=>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){//Cargamos las tareas
       
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //crear opción
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3': // Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': 
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                //Agregamos la lógica para la opción cancelar
                if(id !== '0'){
                    const ok = confirmar('¿Estas seguro que desea borrarlo?')
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada');
                }
            }
                break;
        
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while (opt !== '0');

}

main();