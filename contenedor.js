const { promises: fs} = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }
    
    async save(obj){
        try {
            const objs = await this.getAll();
            //console.log(objs)
            let newId = 1;
            if(objs.length > 0){
                newId = objs[objs.length - 1].id + 1;
            }
            const newObj = {...obj, id: newId}
            objs.push(newObj)

            fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            console.log(`Creado exitosamente el producto ${newId}`);
            
        } catch (error) {
            console.log('Error al crear', error);
        }
    };

    async deleteById(idProducto) {
        try {
            const productos = await this.getAll()
            const nuevoArr = await productos.filter(e => e.id != idProducto)
            fs.writeFile(this.archivo, JSON.stringify(nuevoArr, null, 2))
            console.log(`Se borro correctamente el producto con el id: ${idProducto}`);
            return (`Se borro correctamente el producto con el id: ${idProducto}`);
        } catch (error) {
            return error
        }
        
    }

    async getById(idProducto){
        try {
            const productos = await this.getAll()
            const idGet = await productos.filter(x => x.id == idProducto)
            console.log(idGet)
            return idGet
        } catch (error) {
            return error
        }
    }

    async getAll(){
        try {
            const objs = await fs.readFile(this.archivo, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return error;
        }
    }
};


const archivo1 = new Contenedor("./productos.txt")
module.exports = archivo1;
// exports.getAll = archivo1.getAll()

// exports.getRandom = archivo1.getRandom()

// exports.archivo1
