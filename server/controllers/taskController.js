const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

//make a new task

exports.makeTask = async (req, res) => {
    
    //Cheking for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }



    try {
        

        const { project } = req.body
        const projectFounded = await Project.findById(project)
       
        if (!projectFounded) {
            return res.status(404).json({ msg: 'Project not found' })
        }
        
        if (projectFounded.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized' })
            
        }
            
        const task = new Task(req.body)
        console.log(task)
        await task.save()
        res.json({ task })


        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internar server error')
    }

}



//Get tasks by project

exports.getTasks = async (req, res) => {

    try {
        const { project } = req.body
        const projectFounded = await Project.findById(project)
       
        if (!projectFounded) {
            return res.status(404).json({ msg: 'Project not found' })
        }
        
        if (projectFounded.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized' })
            
        }

        const taks = await Task.find({ project })
        res.json({ taks })


    } catch (error) {
        console.log(error)
        res.status(500).send('Internar server error')
        
    }

}

//Update a task
exports.updateTasks = async ( req,res ) => {
    try {
        const { project, name, state } = req.body
        const projectFounded = await Project.findById(project)
       
        let task = await Task.findById(req.params.id)
        
        if (!task) {
            return res.status(404).json({msg: 'This task doenst exist'})
        }
        if (projectFounded.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized' })
            
        }
           
        const newTask = {};

        if (name) newTask.name = name
         
        if (state) newTask.state = state
         
        task = await Task.findOneAndUpdate({_id : req.params.id}, newTask, {new: true} );

        res.json({ task })






     
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internar server error')
        
    }
}





//Delete a task
exports.deleteTasks = async ( req,res ) => {
    try {
        const { project } = req.body
        const projectFounded = await Project.findById(project)
       
        let task = await Task.findById(req.params.id)
        
        if (!task) {
            return res.status(404).json({msg: 'This task doenst exist'})
        }
        if (projectFounded.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized' })
            
        }
           
        

        
         
        task = await Task.findOneAndRemove({_id : req.params.id});
        //It's returning the deleted taks, pay attention to in the future you could be able to make a kind of sistem for keeping safe the deleted taks until you got deleted it.
        res.json({ task })






     
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internar server error')
        
    }
}