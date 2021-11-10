const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')
// Make projects
// api/projects
//Post new project
router.post('/',
    auth,
    [
        check('name', 'The name of the project is obligatory').not().isEmpty()
    ],
    projectController.makeProject
)
//Get all projects
router.get('/',
 //First checking authentication, then get all projects from this user
    auth,          
    projectController.getProjects
)
//upgradre project
router.put('/:id',
    auth,
    [
        check('name', 'The name of the project is obligatory').not().isEmpty()
    ],
    projectController.upgradeProject
)

//upgradre project
router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router
