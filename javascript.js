"use strict";

class Project{
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.toDoItemArray = [];
    }
    checkCompletion(){
        if(this.toDoItemArray.every((toDoItem)=>{toDoItem.isFinished===true})){
            return true;
        }else{
            return false;
        }
    }
    addToDoItem(title, description, dueDate, priority, notes, isFinished){
        const newToDoItem = new toDoItem(title, description, dueDate, priority, notes, isFinished);
        this.toDoItemArray.push(newToDoItem);
    }
}
class toDoItem{
    constructor(title, description, dueDate, priority, notes, isFinished){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isFinished = false;
    }
}



const projectList = [];