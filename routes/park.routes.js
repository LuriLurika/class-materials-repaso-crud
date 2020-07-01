const express = require('express')
const Park = require('../models/park.model')
const router = express.Router()

//CREAR PARQUES

router.get('/new', (req, res) => res.render('parks/new-park.hbs'))
router.post('/new', (req, res) => {
    
    const { name, description } = req.body
    
    Park 
        .create({ name, description })
        .then(response => {
            res.redirect('/parks/new')
        })
        .catch(err => console.log("Error en la BBDD", err))
    
    
})

//VER PARQUES

router.get('/', (req, res) => {
    Park.find()
        
        .then(allParks => {
            res.render('parks/park-index', {allParks})})
        .catch(err => console.log('Error', err))

})

//VER DETALLES

router.get('/:parkId', (req, res) => {

    Park

        .findById(req.params.parkId)
        .then(thePark => res.render('parks/park-details', thePark))
        .catch(err => console.log('Error', err))
})

//ELIMINAR

router.get('/:id/remove', (req, res) => {

    Park

        .findByIdAndRemove(req.params.id)
        .then(thePark => res.redirect(`/parks`))
        .catch(err => console.log("Error en la BBDD", err))
})

//EDITAR

router.get('/edit/:id', (req, res) => {

    Park
        .findById(req.params.id)
        .then(thePark => res.render('parks/park-edit', { thePark}))
        .catch(err => console.log("Error en la BBDD", err))
})

router.post('/edit/:parkId', (req, res) => {

    const { name, description, active} = req.body
    
    
    Park
        
        .findByIdAndUpdate(req.params.parkId, {name, description, active}, {new: true})
        .then(thePark => res.redirect(`/parks`))
        .catch(err => console.log("Error en la BBDD", err))
})



module.exports = router