import Sequealize, { Sequelize } from "sequelize";
import { sequelize } from "../database/db";

const Task = sequelize.define(
  "task",
  {
    id: {
      type: Sequealize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequealize.TEXT,
    },
    done: {
      type: Sequealize.BOOLEAN,
    },
    projectid: {
      type: Sequealize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default Task;
