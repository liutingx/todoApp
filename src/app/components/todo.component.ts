import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Todo } from '../models'
import { v4 as uuidv4 } from 'uuid'


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  tasksArray: FormArray;

  
  get todo(): Todo {
    const t: Todo = this.todoForm.value as Todo
    t.tasks = t.tasks.map(v => {
      //@ts-ignore
      v.priority = parseInt(v.priority)
      return v;
    })
    return t;
  }
  @Input()
  set todo(t: Todo) {
     
    console.log('todoComponent', typeof(t?.tasks))
    this.todoForm = this.createTodo(t)
    t?.tasks.map(i => {
      const task = this.createTask(i)
      console.log('task', task.value)
      this.tasksArray.push(task)
      console.log('taskarray', this.tasksArray)
    })
    console.log('formvalue', this.todoForm.value)

  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.createTodo();
    
    //this.tasksArray = this.todoForm.get('tasks') as FormArray
  }

  addTask(){
    const task = this.createTask();
    this.tasksArray.push(task)
  }

  deleteTask(index){
    console.log('index of task to delete', index)
    this.tasksArray.removeAt(index)

  }

  private createTodo(todo: Todo = null): FormGroup{
    //const id = uuidv4().toString().substring(0,8);
    this.tasksArray = this.fb.array([])
    return this.fb.group({
      //id: id,
      title: this.fb.control(todo?.title, [Validators.required]),
      tasks: this.tasksArray
    });
  }

  private createTask(task: Task = null): FormGroup{
    return this.fb.group({
      description: this.fb.control(task?.description, [Validators.required]),
      priority: this.fb.control((task?.priority || 0), [Validators.required])
    })
  }
}
