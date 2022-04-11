const fs = require('fs')
module.exports = class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async save(object) {
    const allobjects = await this.getAll()
    let newId = 1
    if (allobjects.length != 0) {
      newId = parseInt(allobjects[allobjects.length - 1].id) + 1
    }
    const newObject = {
      title: object.title,
      price: parseInt(object.price),
      thumbnail: object.thumbnail,
      id: newId
    }
    allobjects.push(newObject)
    try {
      await fs.promises.writeFile(`${__dirname}/${this.archivo}`, JSON.stringify(allobjects, null, 2))
      return newObject
    } catch (error) {
      throw new Error(`Ups :C :${error}`)
    }
  }
  async getById(id) {
    const allobjects = await this.getAll()
    console.log("allobjects", id)
    if (allobjects.length == 0) {
      console.log(`Ups :c no encontramos el id: ${id}`)
    } else {
      return await allobjects.find(objetc => objetc.id == id ? objetc : console.log(`Ups :c no encontramos el id: ${id}`))
    }
  }
  async getAll() {
    try {
      //console.log("getAll", `${__dirname}/${this.archivo}`)
      const allobjects = await fs.promises.readFile(`${__dirname}/${this.archivo}`, 'utf-8')
      return JSON.parse(allobjects)
    } catch (error) {
      return []
    }
  }
  async updateById(id, body) {
    const allobjects = await this.getAll()
    try {
      const producto = {
        title: body.title,
        price: body.price,
        thumbnail: body.thumbnail,
        id: id
      };
      const index = allobjects.findIndex(objetc => objetc.id == id)
      if (index == -1) {
        return;
      } else {
        allobjects[index] = producto;
        await fs.promises.writeFile(`${__dirname}/${this.archivo}`, JSON.stringify(allobjects, null, 2))
        return producto;
      }
    } catch (error) {
      throw new Error(`Ups :c : ${error}`)
    }
  }
  async deleteById(id) {
    const allobjects = await this.getAll()
    try {
      const index = allobjects.findIndex(objetc => objetc.id == id)
      if (index == -1) {
        return;
      } else {
        allobjects.splice(index, 1)
        await fs.promises.writeFile(`${__dirname}/${this.archivo}`, JSON.stringify(allobjects, null, 2))
        return id;
      }
    } catch (error) {
      throw new Error(`Ups :c : ${error}`)
    }
  }
  async deleteAll() {
    await fs.promises.writeFile(`${__dirname}/${this.archivo}`, JSON.stringify([], null, 2))
  }
}
//let container = new Contenedor("productos.txt")
async function enciende() {

  /* const save =  await container.save({title:"Torta de helada",price:11, thumbnail:"https://www.tortasdecocina.com/wp-content/uploads/2018/10/torta-de-chocolate-con-queso-y-chocolate-1.jpg"})
  const prods = await container.getById(2)
  const all = await container.getAll() */

  //console.log(prods,save, all)

  /* ejecutando */
  /*  await container.save({title:"Torta de helada",price:11, thumbnail:"https://www.tortasdecocina.com/wp-content/uploads/2018/10/torta-de-chocolate-con-queso-y-chocolate-1.jpg"})
  await container.getById(2)
  await container.getAll()  */
}
/* enciende()  */