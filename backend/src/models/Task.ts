import mongoose, { Schema } from 'mongoose';
import { ITask } from '../types/task';

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    dueDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);