const Libro = require("../Models/Libros");

async function readLibroIDMongo(id) {
    const libro = Libro.findById(id);
    return libro;
}

async function readLibrosMongo(query) {
    const libros = Libro.find(query);
    return libros
}
async function createLibroMongo(idUsuario, libro) {
    const libroCreado = Libro.create({ ...libro, idUsuario: idUsuario });
    return libroCreado;
}

async function updateLibroMongo(infLibro, data) {
    const libroActual = Libro.updateOne({_id: infLibro._id }, data);
    return libroActual;
}

async function deleteLibroMongo(id){
    const libroEliminado = Libro.updateOne({_id: id}, {activo: false})
    return libroEliminado;
}

module.exports = { 
    readLibroIDMongo, 
    readLibrosMongo, 
    createLibroMongo,
    updateLibroMongo,
    deleteLibroMongo
};