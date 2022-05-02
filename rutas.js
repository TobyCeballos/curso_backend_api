const Router = require('express');
const router = Router();
const Contenedor = require('./contenedor.js')

router.get('/', (req, res) => {
  res.send('<h1>Bienvenidos al Servidor Express</h1>')
})


router.get('/productos', async (req, res) => {
  const objeto = await Contenedor.getAll()
  res.send(objeto)
})


router.get('/productos/:id', async (req, res) => {

  const obj = await Contenedor.getAll()
  const { id } = req.params
  let object = await Contenedor.getById(id)

  if (isNaN(id)) {
    return res.send({ error: 'El caracter ingresado no es un número' })
  }

  if (id < 1 || id > obj.length) {
    return res.send({ error: 'El numero introducido está fuera de rango' })
  }
  res.json(object)
})


router.post('/productos', async (req, res) => {
  
  res.send(save)
})

router.delete('/productos/:id', async (req, res) => {
  const all = await Contenedor.getAll()
  const { id } = req.params
  let deleted = await Contenedor.deleteById(id)

  if (isNaN(id)) {
    return res.send({ error: 'El caracter ingresado no es un número' })
  }

  if (id < 1 || id > all.length) {
    return res.send({ error: 'El numero introducido está fuera de rango' })
  }
  res.json(deleted)
})

module.exports = router;