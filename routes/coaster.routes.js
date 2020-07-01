const express = require('express')
const router = express.Router()
const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

//CREAR COASTERS

router.get('/new', (req, res) => {
    Park.find()
        
        .then(allParks => res.render('coasters/new-coaster', { allParks }))
         
        .catch(err => console.log('Error', err))
        
})

router.post('/new', (req, res) => {

    const { name, description, inversions, length, park } = req.body
    console.log(req.body.park)
    
    Coaster
        .create({ name, description, inversions, length, park })
    
        .then(response => {
            res.redirect('/coasters/new')
        })
        .catch(err => console.log("Error en la BBDD", err))
})

//LISTADO DE COASTERS

router.get('/', (req, res) => {
    Coaster.find()
        .populate('park')
        .then(allCoasters => {
            res.render('coasters/coasters-index', { allCoasters })})
        
        .catch(err => console.log('Error', err))
    
})

//VER DETALLES

router.get('/:coasterId', (req, res) => {

    Coaster
        
        .findById(req.params.coasterId)
        .populate('park')
        .then(theCoaster => res.render('coasters/coaster-details', theCoaster))
        .catch(err => console.log('Error', err))
})

//ELIMINAR

router.get('/:id/remove', (req, res) => {

    Coaster
        
        .findByIdAndRemove(req.params.id)
        .then(theCoaster => res.redirect(`/coasters`))
        .catch(err => console.log("Error en la BBDD", err))
})

//EDITAR

router.get('/edit/:id', (req, res) => {

    Coaster
        .findById(req.params.id)
        .then(theCoaster => {
            Park
                .find()
                .then(allParks => {
                    console.log(theCoaster)
                    res.render('coasters/coaster-edit', { allParks, theCoaster })
                })
 
})
    
        .catch(err => console.log("Error en la BBDD", err))
})


router.post('/edit/:coasterId', (req, res) => {

    const { name, description, inversions, length, park } = req.body
    
    
    Coaster
        
        .findByIdAndUpdate(req.params.coasterId, {name, description, inversions, length, park}, {new: true})
        .then(theCoaster => res.redirect(`/coasters`))
        .catch(err => console.log("Error en la BBDD", err))
})



module.exports = router