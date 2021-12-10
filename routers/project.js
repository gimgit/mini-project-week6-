const express = require("express");
// const projects = require("../models/projects");
const router = express.Router();
const Project = require("../models/projects");
const Todos = require("../models/todos");
const circle = require("../models/circles");
const todos = require("../models/todos");

// const circles = require("../models/circles");

router.post("/projects", async (req, res) => {
    const { userId } = req.body;
    const { project_title } = req.body;
    let newProject = 1;

    let check_title = project_title.split(" ");

    if (check_title[0] === "") {
        res.status(412).send({
            errorMessage: "공란은 입력할 수 없습니다.",
        });
    }

    try {
        last = await Project.find({}).sort({ projects_id: -1 }).limit(1);
        newProject = last[0].projects_id + 1;
    } catch (err) {
        newProject = 1;
    }

    const projects = new Project({
        project_title: project_title,
        projects_id: newProject,
        userId: userId,
        date: new Date(),
    });
    await projects.save();

    //circle 99개 생성

    let num = 0;
    let newDate = new Date();
    const utc = newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);
    for (let i = 1; i < 100; i++) {
        // let newCircle = i;
        let feedback = "";
        kr_curr.setDate(kr_curr.getDate() + num);
        const year = kr_curr.getFullYear();
        const month = kr_curr.getMonth() + 1;
        const date = kr_curr.getDate();
        const new_date = `${year}-${month}-${date}`;
        if (i >= 1) {
            num = 1;
        }

        const circles = new circle({
            projects_id: newProject,
            circles_id: `${userId}_${newProject}_${i}`,
            feedback: feedback,
            circles_date: new_date,
            check_count: 0,
        });
        await circles.save();
    }

    const result = await Project.find({ userId: userId });

    res.send(result);
});

router.get("/projects", async (req, res, next) => {
    const { userId } = req.query;
    try {
        const projects = await Project.find({ userId: userId }).sort(
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
    const { userId } = req.body;

    await Project.deleteOne({ projects_id: projects_id });
    await circle.deleteMany({ projects_id: projects_id });
    await todos.deleteMany({ projects_id: projects_id });

    const result = await Project.find({ userId: userId });

    res.send(result);
});

router.put("/projects/:projects_id", async (req, res, next) => {
    const { projects_id } = req.params;
    const { userId, project_title } = req.body;

    let check_title = project_title.split(" ");

    if (check_title[0] === "") {
        res.status(412).send({
            errorMessage: "공란은 입력할 수 없습니다.",
        });
    }

    await Project.updateOne(
        {
            projects_id: projects_id,
        },
        {
            $set: {
                project_title: project_title,
            },
        }
    );

    const result = await Project.find({ userId: userId });

    res.send(result);
});

// userID 로컬 또는 미들웨어 통해 검증
// 프론트에서 projectId 받아 삭제
module.exports = router;
