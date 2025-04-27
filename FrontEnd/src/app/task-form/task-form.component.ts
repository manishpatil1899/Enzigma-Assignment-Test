import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() taskSaved = new EventEmitter<void>();

  title: string = '';
  description: string = '';
  completed: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.title = this.task.title;
      this.description = this.task.description || '';
      this.completed = this.task.completed;
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.completed = false;
  }

  saveTask(): void {
    if (!this.title.trim()) {
      alert('Title is required');
      return;
    }

    const taskData: Task = {
      title: this.title,
      description: this.description,
      completed: this.completed
    };

    if (this.task && this.task._id) {
      this.taskService.updateTask(this.task._id, taskData).subscribe(() => {
        this.taskSaved.emit();
        this.resetForm();
      });
    } else {
      this.taskService.addTask(taskData).subscribe(() => {
        this.taskSaved.emit();
        this.resetForm();
      });
    }
  }
}
