const Tarea = require('./tarea')

class Tareas {

    _listado = {};

    //Con el método get convertimos el obejto en un array
    get listadoArr() {

        const listado = [];
        //Obtenemos la key de una nueva tarea
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){

        this._listado = {};
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea (desc = ''){

        const tarea = new Tarea(desc);
        //Creamos el método para apuntar al ID de la tarea
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log('\n');
        // Creamos la lógica para mostrar la lista de tarea de forma legible
        // ForEach recibe dos argumentos el segundo es el indice
        this.listadoArr.forEach((tarea, i)=>{
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas (completadas = true){
        console.log('\n');
        let contador = 0;
        this.listadoArr.forEach((tarea, i)=>{
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if(completadas){
                //Mostramos tareas completadas
                if(completadoEn){
                contador += 1;
                console.log(`${(contador + '.').green}. ${desc} :: ${completadoEn.green}`);
                }
            }
            else{
                //Mostramos tareas pendientes
                if(!completadoEn){
                contador += 1;
                console.log(`${(contador + '.').green}. ${desc} :: ${estado}`);
                }
            }
            
        });
    }

    
    toggleCompletadas = (ids = [])=>{
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;