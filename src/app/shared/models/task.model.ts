export interface TaskModel {
  id: number;
  dbId?: string;
  listID: number;
  task: string;
  date: string;
  author: string;
  status: string;
  currentStatus: number;
  editMode: boolean;
}
