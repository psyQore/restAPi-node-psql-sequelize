import Project from "../models/Project";

export async function getProjects(req, res) {
  try {
    const projects = await Project.findAll();
    res.json({
      data: projects,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createProject(req, res) {
  // req.body: datos que llegaran cuando alguien visite esta ruta
  //   console.log(req.body); para probar si funciona
  const { name, priority, description, deliverydate } = req.body;
  try {
    const newProject = await Project.create(
      {
        name,
        priority,
        description,
        deliverydate,
      },
      {
        fields: ["name", "priority", "description", "deliverydate"],
      }
    );
    if (newProject) {
      return res.json({
        message: "Project created successfully",
        data: newProject,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }
}

export async function getOneProject(req, res) {
  // Aqui recibes el id de req.params;
  const { id } = req.params;
  const project = await Project.findOne({
    where: {
      id,
    },
  });
  res.json({
    data: project,
  });
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  const deleteRowCount = await Project.destroy({
    where: {
      id,
    },
  });
  res.json({
    message: "project Deleted succesfully",
    count: deleteRowCount,
  });
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { name, priority, description, deliverydate } = req.body;

  const projects = await Project.findAll({
    attributes: ["id", "name", "priority", "description", "deliverydate"],
    where: {
      id,
    },
  });

  if (projects.length > 0) {
    projects.forEach(async (project) => {
      await project.update({
        name,
        priority,
        description,
        deliverydate,
      });
    });
  }

  return res.json({
    message: "Project Updates Successfully",
    date: projects,
  });
}
