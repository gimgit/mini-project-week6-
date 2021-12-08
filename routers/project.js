const express = require('express');
const projects = require('../models/projects');
const router = express.Router();
const Project = require("../models/projects")
const circle = require("../models/circles")

router.post('/projects', async (req, res) => {
    const user = req.body.userId
    const title = req.body.title
    let newProject = 1;

    try {
        last = await Project.find({}).sort({projects_id:-1}).limit(1);
        newProject = last[0].projects_id + 1;
    } catch(err) {
        newProject = 1;
    }

    const projects = new Project({
        project_title : title,  
        projects_id: newProject, 
        userId: user,
        date: new Date(),  
    });
    await projects.save()



    for (let i=1; i<100; i++){
        let newCircle = i;
        let feedback = ''
        const circles = new circle({
            projects_id: newProject,
            circleIdx: newCircle,
            feedback: feedback
        })
        await circles.save()    
    }
    

    // let circles = new circle({
    //     projects_Id: newProject
    // })
    // await circles.save()
    // let circleIndex = 0
    // for (let i=1; i < 99; i++){
    //     circleIndex += 1 
    //     let circles = new circle({
    //         projects_Id: newProject,
    //         circle_id: circleIndex
    //     })
    //     await circles.save()
    // }

    // const circles = new circle({
    //     projects_Id: newProject, 
    //     // circle_Id: 
    // })


        res.redirect('/login') 
      })

router.get("/projects", async (req, res, next) => {
    // const user = req.body.userId
    try {
        const projects = await Project.find({userId : 'test2' }).sort("projects_Id");  

        res.json({ projects: projects });  
    } catch (err) {
        console.error(err);

        next(err);
    }
    });

    router.delete("/projects/:projects_Id", async (req, res, next) => {
        console.log(req.params)
        // const { projects_Id } = req.params;
        // const project = await Project.findOne({ projects_Id : 11 });
        // console.log(project)
        // if (project.userId !== 'test') {
        //     res.send ({ errorMessage: "access denied" });
    
        //     return;
        // }else { await Project.deleteOne({ _projects_Id : 11 })}
await Project.deleteOne({ projects_Id : 11 })
        
        res.send({ })
    }); 
    // userID 로컬 또는 미들웨어 통해 검증
    // 프론트에서 projectId 받아 삭제 
  module.exports = router;