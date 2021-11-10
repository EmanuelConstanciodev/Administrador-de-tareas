const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.makeProject = async (req, res) => {

//Cheking for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    try {
        const project = new Project(req.body);

        project.creator = req.user.id
        project.save()
        res.json(project)



    } catch (error) {
        console.log(error)
        res.status(500).send('Something wrong') //Add an entorn variable on error messege
    }
}

//Get all projects of the current user
exports.getProjects = async (req, res) => {
    try {
        console.log(req.user)
        const projects = await Project.find({ creator: req.user.id })
        res.json({ projects })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('something wrong')
        
    }
}

exports.upgradeProject = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    const { name } = req.body
    const newProjet = {}

    if (name) {
        newProjet.name = name
    }
    try {
        
        let project = await Project.findById(req.params.id)
        if (!project) {
            
            return res.status(400).json({ msg: 'Project not found' })
            
        }

        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized' })
            
        }

        project = await Project.findByIdAndUpdate({_id: req.params.id }, { $set : newProjet }, { new: true } )
        res.json({project})

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}


//Delete a project by ID 
exports.deleteProject = async (req, res) => {

    try {
        let project = await Project.findById(req.params.id)
        if (!project) {
            
            return res.status(400).json({ msg: 'Project not found' })
            
        }
    
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized' })
            
        }

        await Project.findOneAndRemove( { _id : req.params.id})
        res.json({ msg: 'Project has been deleted' })


    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}