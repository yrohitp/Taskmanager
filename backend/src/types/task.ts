export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }