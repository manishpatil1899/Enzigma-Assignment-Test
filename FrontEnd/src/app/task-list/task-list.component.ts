import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  deleteTask(id?: string): void {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onTaskSaved(): void {
    this.selectedTask = null;
    this.loadTasks();
  }
}
