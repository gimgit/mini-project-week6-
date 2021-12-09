const express = require("express");
// const projects = require("../models/projects");
const router = express.Router();
const Project = require("../models/projects");
const Todos = require("../models/todos");
const circle = require("../models/circles");
const todos = require("../models/todos");
// const circles = require("../models/circles");

router.post("/projects", async (req, res) => {
    const user = "kim";
    // const user = req.body.userId
    // const user = req.body.userId
    const title = req.body.title;
    let newProject = 1;

    try {
        last = await Project.find({}).sort({ projects_id: -1 }).limit(1);
        newProject = last[0].projects_id + 1;
    } catch (err) {
        newProject = 1;
    }

    const projects = new Project({
        project_title: title,
        projects_id: newProject,
        userId: user,
        date: new Date(),
    });
    await projects.save();

    //circle 99개 생성

    let num = 0;
    let newDate = new Date();
    for (let i = 1; i < 100; i++) {
        // let newCircle = i;
        let feedback = "";
        newDate.setDate(newDate.getDate() + num);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const date = newDate.getDate();
        const new_date = `${year}-${month}-${date}`;
        if (i >= 1) {
            num = 1;
        }

        const circles = new circle({
            projects_id: newProject,
            // circle_idx: newCircle,
            circles_id: `${user}_${newProject}_${i}`,
            feedback: feedback,
            circles_date: new_date,
            check_count: 0,
        });
        await circles.save();
    }

    res.redirect("/");
});

router.get("/projects", async (req, res, next) => {
    // const user = req.body.userId
    try {
        const projects = await Project.find({ userId: "kim" }).sort(
            "projects_Id"
        );
        res.json({ projects: projects });
    } catch (err) {
        console.error(err);

        next(err);
    }
});


router.delete("/projects/:projects_id", async (req, res, next) => {
    const { projects_id } = req.params;



  await Project.deleteOne({ projects_id: projects_id });
  await circle.deleteMany({ projects_id: projects_id });
  await todos.deleteMany({ projects_id: projects_id });
  res.send({});

});

router.put("/projects/:projects_id", async (req, res, next) => {
    const { projects_id } = req.params;
    const { project_title} = req.body;
    await Project.updateOne({
        projects_id: projects_id 
        },
        {$set: {
            project_title : project_title
            }
        });
    res.send({});
  });

  
// userID 로컬 또는 미들웨어 통해 검증
// 프론트에서 projectId 받아 삭제
module.exports = router;
