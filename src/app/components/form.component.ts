import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDatabase } from '../todo.database';
import { TodoComponent } from './todo.component';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('myTodo') //points to #myTodo on html
  todoRef: TodoComponent

  constructor(private router: Router, private todoDB: TodoDatabase) { }

  ngOnInit(): void {
  }

  async addToDo(){
    //generate id, take first 8 characters
    const id = uuidv4().toString().substring(0,8);
    //get the new todo from the form
    const todo = this.todoRef.todo;
    //set the id to the new todo
    todo.id = id;

    //save to database
    await this.todoDB.addTodo(todo)

    //navigate to /
    this.router.navigate(['/']);
  }
}
