import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component'
import { FormComponent } from './components/form.component';
import { TodoComponent } from './components/todo.component'
import { TodoDatabase } from './todo.database';
import { TodoDetailsComponent } from './components/todo-details.component'


const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'form', component: FormComponent},
  {path:'todo/:todoId', component: TodoDetailsComponent},
  {path:'**', redirectTo:'/', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    TodoComponent,
    TodoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodoDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
