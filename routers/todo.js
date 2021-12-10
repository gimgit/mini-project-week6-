const express = require("express");
const Todos = require("../models/todos");
const circles = require("../models/circles");
const dateMiddleware = require("../middlewares/date-compare");
const router = express.Router();

//투두리스트 조회 API
router.get("/todos", async (req, res) => {
    const { circles_id } = req.query;
    const circle_detail = await Todos.find({ circles_id: circles_id });

    res.send({ result: circle_detail });
});

//투두리스트 추가 API
//todos에 프로젝트 아이디 컬럼 추가
router.post("/todos", dateMiddleware, async (req, res) => {
    const { todos_id, todo_content, circles_id } = req.body;
    const todo_check = false;
    const circles_detail = await circles.findOne({ circles_id: circles_id });
    const projects_id = circles_detail.projects_id;

    await Todos.create({
        todos_id,
        todo_content,
        circles_id,
        todo_check,
        projects_id,
    });

    const circle_detail = await Todos.find({ circles_id: circles_id });

    res.send({ result: circle_detail });
});

//투두리스트 수정 API
router.put("/todos/:todos_id", dateMiddleware, async (req, res) => {
    const { todos_id } = req.params;
    const { todo_content, circles_id } = req.body;

    await Todos.updateOne(
        {
            todos_id: todos_id,
        },
        {
            $set: {
                todo_content: todo_content,
            },
        }
    );

    const circle_detail = await Todos.find({ circles_id: circles_id });

    res.send({ result: circle_detail });
});

//투두리스트 식제 API
router.delete("/todos/:todos_id", dateMiddleware, async (req, res) => {
    const { todos_id } = req.params;
    const { circles_id } = req.body;

    await Todos.deleteOne({ todos_id: todos_id });

    const circle_detail = await Todos.find({ circles_id: circles_id });

    res.send({ result: circle_detail });
});

//투두리스트 체크박스 수정 API
router.patch("/todos/:todos_id", async (req, res) => {
    const { todos_id } = req.params;
    const { todo_check, circles_id } = req.body;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    const today_date = `${year}-${month}-${date}`;
    const circles_date = await circles.findOne({ circles_id: circles_id });

    if (circles_date.circles_date !== today_date) {
        return res.status(412).send({
            errorMessage: "오늘 TodoList의 체크박스만 변경할 수 있습니다.",
        });
    }

    await Todos.updateOne(
        {
            todos_id: todos_id,
        },
        {
            $set: {
                todo_check: todo_check,
            },
        }
    );

    //circles DB의 check_count 최신화하기
    const todos = await Todos.find({ circles_id: circles_id });
    let todo_check_val = todos.map((todos) => todos.todo_check);
    let count = 0;
    todo_check_val.forEach((get) => {
        if (get === true) {
            count++;
        }
    });

    await circles.updateOne(
        {
            circles_id: circles_id,
        },
        {
            $set: {
                check_count: count,
            },
        }
    );

    const circle_detail = await Todos.find({ circles_id: circles_id });

    res.send({ result: circle_detail });
});

module.exports = router;
