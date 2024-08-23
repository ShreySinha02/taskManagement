const mongoose = require("mongoose");

// Define the sub-schemas
const assignedToSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId,  required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const activitySchema = mongoose.Schema(
  {
    type: { type: String, enum: ["Bug", "Feature", "comment","in Progress","completed"],required: true },
    comment: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const commentSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const subtaskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    assignedTo: [assignedToSchema],
    comments: [commentSchema],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Main Task Schema that relates all the sub-schemas
const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: [assignedToSchema], // Related to assignedToSchema
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
    progress: {
      percentage: { type: Number, min: 0, max: 100, default: 0 },
    },
    activities: [activitySchema], // Related to activitySchema
    subtasks: [subtaskSchema], // Related to subtaskSchema
    comments: [commentSchema], // Related to commentSchema
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create and export the model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
