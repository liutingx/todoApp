import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models';
import { TodoDatabase } from '../todo.database';
import { TodoComponent } from './todo.component';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  @ViewChild('mytodo') //points to #myTodo on html
  todoRef: TodoComponent
  //@Input() todo: Todo

  todoId = '';
  myTodo: Todo

  constructor(private activatedRoute: ActivatedRoute, private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
    this.todoDB.getTodoDetails(this.todoId)
    .then(result => {
      this.myTodo = result;
      console.log('full details', this.myTodo)
    })
    
  }

  async updateTodo(){
    this.todoRef.todo.id = this.todoId;
    await this.todoDB.addTodo(this.todoRef.todo)
    console.log('update', this.todoRef.todo)
    this.router.navigate(['/'])
  }

  async deleteTodo(){
    await this.todoDB.deleteTodoDetails(this.todoId)
    console.log('delete')
    this.router.navigate(['/'])
  }

}
