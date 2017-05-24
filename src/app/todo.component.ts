import { Component, Output, EventEmitter, OnInit } from '@angular/core';


import { ToDo, ToDoParts, ToDoScans } from './locdb';
import { MOCK_TODOBRS } from './mock-todos';

import { LocdbService } from './locdb.service';

@Component({
  selector: 'todolist',
  templateUrl: 'todo.component.html' ,
  providers: [ LocdbService ]
})

export class TodoComponent implements OnInit {
  title = 'Todo Management';
  //scans: ToDoScans[];// = TodoComponent.extractScans(MOCK_TODOBRS);
  scans: scanentries[];
  //unprocessed: ToDoScans[];
  // unprocessed: scanentries[];

  selectedTodo: ToDoScans;
  todolist : ToDo[] = [];
  unprocessed: ToDo[] = [];

  @Output() todo: EventEmitter<ToDoScans> = new EventEmitter();


  onclickheading(){
    console.log("asd");

  }


  constructor ( private locdbService: LocdbService ) {}

  onSelect(scan: ToDoScans): void {
    if ( scan.status === 'NOT_OCR_PROCESSED' )
    {
      console.log("Starting processing");
      scan.status = "OCR_PROCESSING";
      this.locdbService.triggerOcrProcessing(scan._id).subscribe(
        (message) => scan.status = 'OCR_PROCESSED'
      ) 
    }
    else
    {
      this.selectedTodo = scan;
      console.log('Todo item selected', scan._id);
      this.todo.next(scan);
    }
  }

  ngOnInit() {
    console.log('Retrieving TODOs from backend');
    this.fetchScans();
  }

  fetchScans() {
    console.log("Fetching todo scans from backend");
    // this.locdbService.getToDo(true).subscribe( (todos) => {this.scans = TodoComponent.extractScans(<ToDo[]>todos);
    //   console.log("fetch scans", todos);
    // } );
    // this.locdbService.getToDo(false).subscribe( (todos) => {this.unprocessed = TodoComponent.extractScans(<ToDo[]>todos)} );
        this.locdbService.getToDo(true).subscribe( (todos) => {this.todolist = <ToDo[]>todos} );
        this.locdbService.getToDo(false).subscribe( (todos) => {this.unprocessed = <ToDo[]>todos} );
  }

  all_todos() {
    return this.todolist.concat(this.unprocessed);
  }


  prettyStatus(scan: ToDoScans) {
    if ( scan.status === 'OCR_PROCESSED' )
      return 'OCR processed';
    if ( scan.status === 'NOT_OCR_PROCESSED' )
      return 'not OCR processed';
    return 'Processing'
  }

  processScan(scan: ToDoScans) {
    if ( scan.status === 'NOT_OCR_PROCESSED' )
    {
      console.log("Starting processing");
      scan.status = "OCR_PROCESSING";
      this.locdbService.triggerOcrProcessing(scan._id).subscribe(
        (message) => scan.status = 'OCR_PROCESSED'
      ) 
    }
    else
    {
      alert('Already processing...')
    }
  }

  private static extractScans(todos: ToDo[]): scanentries[] {
    //private static extractScans(todos: ToDo[]): ToDoScans[] {
    console.log('DEPRECATION WARNING');
    console.log('Input to extractScans', todos);
    // if (!todos) return [];
    //let flat_scans: ToDoScans[] = [];
    let flat_scans: scanentries[] = [];
    // Ugly loop //
    for (let todo of todos) {
      console.log(todo);
      console.log(todo._id);
      let scanentry = new scanentries(todo._id)
      for (let child of todo.children) {
        console.log(child);
        for (let scan of child.scans) {
          scanentry.scans.push(scan);
        }
      }
      flat_scans.push(scanentry);
    }
    //    Fancy function //
    // let flat_scans: ToDoScans[] = todos.map(
    //   t => <ToDoParts[]>t.children
    // ).reduce(
    //   (acc,val) => acc.concat(val)
    // ).map(
    //   p => <ToDoScans[]>p.scans
    // ).reduce(
    //   (acc,val) => acc.concat(val)
    // )
    console.log('Extracted flat list of scans', flat_scans);
    return flat_scans;
  }

  printit(a: any){
    console.log("----------------------------------------");
    console.log(a);
  }
}

class scanentries {
  scans: ToDoScans[] = [];
  rootresourceid: string;
  isCollapsed = true;
  constructor(r: string){
    this.rootresourceid = r;      
  }
}
