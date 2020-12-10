import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo, TodoSummary } from './models';

@Injectable()
export class TodoDatabase extends Dexie {

    //<modelToStore, typeOfPrimaryKey>
    private todo: Dexie.Table<Todo, string>;

    constructor() {
        //database name
        super('tododb')

        //setup the schema for v1
        this.version(1).stores({
           todo: 'id'//primary key 
        })

        //get a reference to the todo collection
        this.todo = this.table('todo')
    }
    async getTodoSummary(): Promise<TodoSummary[]> {
        return (await this.todo.toArray())
        .map(d => {
            return {
                id: d.id,
                title: d.title
            } as TodoSummary
        })
    }

    async getTodoDetails(id: string): Promise<Todo> {
        return (await this.todo.get(id))
    }

    async deleteTodoDetails(id: string): Promise<any> {
        return (await this.todo.where('id').equals(id).delete())
    }

    async addTodo(t: Todo): Promise<any>{
        //return await this.todo.add(t) //only add if it is not there, error if primary key exists
        return await this.todo.put(t);//insert if its not there, update if it is.
    }
}