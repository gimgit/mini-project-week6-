const express = require("express");
const Todos = require("../schemas/todos");
const circles = require("../schemas/circles");
const router = express.Router();

//투두리스트 조회 API
router.get("/todos", async (req, res) => {
  const { circles_id } = req.query;
  const circle_detail = await Todos.find({ circles_id: circles_id });

  res.send({ result: circle_detail });
});

//투두리스트 추가 API
router.post("/todos", async (req, res) => {
  const { todos_id, todo_content, circles_id } = req.body;
  const todo_check = false;

  await Todos.create({
    todos_id,
    todo_content,
    circles_id,
    todo_check,
  });

  res.send({
    result: "success",
  });
});

//투두리스트 수정 API
router.put("/todos/:todos_id", async (req, res) => {
  const { todos_id } = req.params;
  const { todo_content } = req.body;

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

  res.send();
});

//투두리스트 식제 API
router.delete("/todos/:todos_id", async (req, res) => {
  const { todos_id } = req.params;

  await Todos.deleteOne({ todos_id: todos_id });

  res.send();
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
  const circles_date = await circles.findOne({ circles_id: circles_id }).date;

  if (circles_date !== today_date) {
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

  res.send();
});

module.exports = router;
