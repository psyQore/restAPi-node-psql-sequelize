import Task from "../models/Tasks";

export async function createTask(req, res) {
  const { name, done, projectid } = req.body;
  const newTask = await Task.create(
    {
      name,
      done,
      projectid,
    },
    {
      fields: ["name", "done", "projectid"],
    }
  );
  res.json({
    message: "New task created",
  });
}
export async function getTasks(req, res) {
  const tasks = await Task.findAll({
    attributes: ["id", "projectid", "name", "done"],
    order: [["id", "DESC"]],
  });
  res.json({ tasks });
}
export async function updateTask(req, res) {
  const { id } = req.params;
  const { projectid, name, done } = req.body;

  const task = await Task.findOne({
    attributes: ["name", "projectid", "done", "id"],
    where: {
      id,
    },
  });

  const updatedTask = await Task.update(
    {
      name,
      done,
      projectid,
    },
    {
      where: { id },
    }
  );
  res.json({
    message: "Task updated",
    updatedTask,
  });
}
export async function deleteTask(req, res) {
  const { id } = req.params;
  await Task.destroy({
    where: {
      id,
    },
  });
  res.json({
    message: "Tasks Deleted",
  });
}
export async function getOneTask(req, res) {
  const { id } = req.params;
  const task = await Task.findOne({
    where: {
      id,
    },
    attributes: ["id", "projectid", "name", "done"],
  });
  res.json(task);
}

export async function getTasksByProject(req, res) {
  const { projectid } = req.params;
  const tasks = await Task.findAll({
    attributes: ["id", "projectid", "name", "done"],
    where: {
      projectid,
    },
  });
  res.json({ tasks });
}
