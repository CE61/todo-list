"use strict";

const body = document.getElementsByTagName("body")[0];

const projectList = [];
var currentProjectIndex = 0;

function projectIsDuplicate(project){
    for(let i = 0; i<projectList.length;i++){
        if(project.title == projectList[i].title){
            return true;
        }
    }
    return false;
}
function deleteProject(projectTitle){
    for(let i = 0; i<projectList.length; i++){
        if(projectTitle === projectList[i].title){
            projectList.splice(i,1);
        }
    }
    console.log(projectList);
}
class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.toDoItemList = [];
    }
    addItem(toDoItem){
        this.toDoItemList.push(toDoItem);
    }    
    removeItem(index){
        this.toDoItemList.splice(index,1);
    }
}
class ToDoItem{
    constructor(priority, title, description, dueDate){
        this.priority = priority;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.beingEdited = false;
    }
}

const addProjectButton = document.getElementById("add-new-project");
addProjectButton.addEventListener("click", ()=>{
    
    const grayOut = document.createElement("div");
    grayOut.className = "opaque";

    const content = document.createElement("div");
    content.className = "new-project-modal";

    const closeButton = document.createElement("button");
    closeButton.className = "close-icon";
    closeButton.addEventListener("click",()=>{
        grayOut.remove();
        closeButton.parentElement.remove();
    });

    const newProjectForm = document.createElement("form");
    newProjectForm.innerHTML = `<label for="projectTitle">Project Title</label><br>
    <input type="text" id="projectTitle" name="projectTitle" placeholder="Enter title of project here."><br>
    <label for="projectDescription">Description</label><br>
    <textarea type="text" id="projectDescription" name="projectDescription" rows="12" cols="38" placeholder="Enter description of project here."></textarea>
    <input class="submit-button" type="button" value="Submit">`
    content.appendChild(closeButton);
    content.appendChild(newProjectForm);

    body.appendChild(grayOut);
    body.appendChild(content);

    const submitButton = newProjectForm.querySelectorAll(".submit-button")[0];
    submitButton.addEventListener("click", ()=>{
        let title = newProjectForm.querySelectorAll("#projectTitle")[0].value;
        let description = newProjectForm.querySelectorAll("#projectDescription")[0].value;
        const project = new Project(title,description);
        if(projectIsDuplicate(project)){
            alert("A project with the same title already exists! Please choose a different title.");
        }else{
            projectList.push(project);
            console.log(title + " - project added " + projectList + "\n Project: " + projectList[projectList.indexOf(project)] + "index: " + projectList.indexOf(project));
            
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.innerHTML = `<button class="close-icon"></button>
            <p class="card-title">`+title+`</p>
            <p class="card-description">`+description+`</p>
            <svg class="hidden" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>`;
            const newCardCloseButton = newCard.querySelectorAll(".close-icon")[0];
            newCardCloseButton.addEventListener("click",(e)=>{
                e.stopPropagation();
                newCardCloseButton.parentElement.remove();
                deleteProject(newCardCloseButton.parentElement.querySelectorAll(".card-title")[0].textContent);
                console.log(newCardCloseButton.parentElement.querySelectorAll(".card-title")[0].textContent);
                
            });
            newCard.addEventListener("click",()=>{
                for(let i = 0; i < projectList.length; i++){
                    if(newCard.querySelectorAll(".card-title")[0] == projectList[i].title){
                        currentProjectIndex = i;
                        i = projectList.length;
                        console.log("Project loading...");
                    }
                }
                console.log("\"" + projectList[currentProjectIndex].title + "\" has been loaded")
                const projectOverviewModal = document.createElement("div");
                projectOverviewModal.className = "project-overview-modal";
                projectOverviewModal.innerHTML=`<button class="close-icon"></button>
                <h1 style="font-family: Arial, Helvetica, sans-serif;">To-Do List</h1>
                <button id="add-todo-item"></button>`;
                const projectOverviewCloseButton = projectOverviewModal.querySelectorAll(".close-icon")[0];
                projectOverviewCloseButton.addEventListener("click",()=>{
                    projectOverviewCloseButton.parentElement.remove();
                    body.removeChild(grayOut);
                });
                const addTodoItemButton = projectOverviewModal.querySelectorAll("#add-todo-item")[0];
                addTodoItemButton.addEventListener("click",()=>{
                    const toDoItemForm = document.createElement("div");
                    toDoItemForm.className = "to-do-item-form";
                    toDoItemForm.innerHTML = 
                    `<button class="close-icon"></button>
                    <button class="check-icon"></button>
                    <div class="item-top-info">
                        <label for="priority" style="margin-right: 4px;">Priority Level</label>
                        <select name="priority" id="priority">
                            <option value="!">1</option>
                            <option value="!!">2</option>
                            <option value="!!!">3</option>
                        </select>
                        <input type="text" id="toDoItemTitle" name="toDoItemTitle" style="font-size:28px; width: 428px; margin-left: 12px; margin-right: 12px;" placeholder="Enter title here.">
                        <p>Due on</p>
                        <input type="date" name="dueDate" id="dueDate" style="margin-left:8px;">
                    </div>
                    <div class="item-bottom-info">
                        <textarea style="resize: none;" class="item-description" name="description" id="description" cols="30" rows="10" placeholder="Enter description here."></textarea>
                    </div>`;
                    const toDoItemFormCloseButton = toDoItemForm.querySelectorAll(".close-icon")[0];
                    toDoItemFormCloseButton.addEventListener("click",()=>{
                        toDoItemFormCloseButton.parentElement.remove();
                    });
                    const toDoItemFormSubmitButton = toDoItemForm.querySelectorAll(".check-icon")[0];
                    const toDoItem = new ToDoItem("","","","");
                    toDoItemFormSubmitButton.addEventListener("click",()=>{
                        let priority = toDoItemForm.querySelectorAll("#priority")[0].value;
                        let title = toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value;
                        let dueDate = toDoItemForm.querySelectorAll("#dueDate")[0].value;
                        let description = toDoItemForm.querySelectorAll("#description")[0].value;

                        toDoItem.priority = priority;
                        toDoItem.title = title;
                        toDoItem.dueDate = dueDate;
                        toDoItem.description = description;
                        
                        const newTodoItem = document.createElement("div");
                        newTodoItem.className = "to-do-item";
                        newTodoItem.classList.add("cauliflower");
                        if(dueDate==""||dueDate==null){
                            newTodoItem.innerHTML = 
                            `
                                <button class="close-icon"></button>
                                <button class="edit-icon"></button>
                                <div class="item-top-info">
                                    <p class="priority" id="priority">`+priority+`</p>
                                    <ul><li class="to-do-title" id="title">`+title+`</li></ul>
                                    <p></p>
                                    <p id="dueDate"></p>
                                    <svg class="hidden" style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                    </svg>
                                </div>
                                <div class="item-bottom-info">
                                    <div class="item-description hidden">
                                        <p id="description">`+description+`</p>
                                    </div>
                                </div>
                            `;
                        }else{
                            newTodoItem.innerHTML = `
                                <button class="close-icon"></button>
                                <button class="edit-icon"></button>
                                <div class="item-top-info">
                                    <p class="priority" id="priority">`+priority+`</p>
                                    <ul><li class="to-do-title" id="title">`+title+`</li></ul>
                                    <p>Due on</p>
                                    <p id="dueDate">`+dueDate+`</p>
                                    <svg class="hidden" style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                    </svg>
                                </div>
                                <div class="item-bottom-info">
                                    <div class="item-description hidden">
                                        <p id="description">`+description+`</p>
                                    </div>
                                </div>
                            `;
                        }
                        const newToDoItemCloseButton = newTodoItem.querySelectorAll(".close-icon")[0];
                        newToDoItemCloseButton.addEventListener("click", (e)=>{
                            //let nodes = Array.from(projectOverviewModal.querySelectorAll(".to-do-item"));
                            //let index = nodes.indexOf(newToDoItemCloseButton.parentElement);
                            newToDoItemCloseButton.parentElement.remove();
                            //projectList[currentProjectIndex].removeItem(index);
                            refreshToDoListArray();
                            e.stopPropagation();

                            for(let i = 0; i < projectList[currentProjectIndex].toDoItemList.length; i++){
                                console.log("Element " + i + " Title: " + projectList[currentProjectIndex].toDoItemList[i].title);
                            }
                            console.log("----- end of log -----");
                        });
                        const newToDoItemEditButton = newTodoItem.querySelectorAll(".edit-icon")[0];
                        newToDoItemEditButton.addEventListener("click", (e)=>{
                            toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value = title;
                            toDoItemForm.querySelectorAll("#priority")[0].value = priority;
                            toDoItemForm.querySelectorAll("#dueDate")[0].value = dueDate;
                            toDoItemForm.querySelectorAll("#description")[0].value = description;

                            newTodoItem.parentElement.replaceChild(toDoItemForm,newTodoItem);
                            e.stopPropagation();
                            //toDoItem.beingEdited = true;
                            refreshToDoListArray();

                            for(let i = 0; i < projectList[currentProjectIndex].toDoItemList.length; i++){
                                console.log("Element " + i + " Title: " + projectList[currentProjectIndex].toDoItemList[i].title);
                            }
                            console.log("----- end of log -----");
                        });
                        const itemDescriptions = newTodoItem.getElementsByClassName("item-description");
                        itemDescriptions[0].parentElement.parentElement.addEventListener("click",()=>{
                            if(itemDescriptions[0].classList.contains("hidden")){
                                itemDescriptions[0].classList.remove("hidden");
                            }else{
                                itemDescriptions[0].classList.add("hidden");
                            }
                        });
                        projectOverviewModal.insertBefore(newTodoItem,toDoItemForm)
                        refreshToDoListArray();
                        toDoItemForm.remove();
                        // if(!toDoItem.beingEdited){
                        //     projectList[currentProjectIndex].addItem(toDoItem);
                        // }else{
                        //     toDoItem.beingEdited = false;
                        //     project.toDoItemList.splice(project.toDoItemList.indexOf(toDoItem),1,new ToDoItem(priority,title,description,dueDate));
                        // }
                        console.log("Length of pushed Project to do list: " + projectList[currentProjectIndex].toDoItemList.length);
                        for(let i = 0; i < projectList[currentProjectIndex].toDoItemList.length; i++){
                            console.log("Element " + i + " Title: " + projectList[currentProjectIndex].toDoItemList[i].title);
                        }
                        console.log(projectList[currentProjectIndex]);
                        console.log("----- end of log -----");
                    });
                    projectOverviewModal.insertBefore(toDoItemForm,projectOverviewModal.lastChild);
                });
                function refreshToDoListArray(){
                    projectList[currentProjectIndex].toDoItemList = [];
                    let itemsArray = Array.from(projectOverviewModal.querySelectorAll(".cauliflower"));
                    itemsArray.forEach(toDoItem=>{
                        let priority = toDoItem.querySelectorAll("#priority")[0].textContent;
                        let title = toDoItem.querySelectorAll("#title")[0].textContent;
                        let description = toDoItem.querySelectorAll("#description")[0].textContent;
                        let dueDate = toDoItem.querySelectorAll("#dueDate")[0].textContent;
                        const todoItem = new ToDoItem(priority,title,description,dueDate);

                        console.log(todoItem.title + "- title of toDoItem loaded from modal.");
                        projectList[currentProjectIndex].toDoItemList.push(toDoItem);
                    });
                    console.log("Refreshed items array!");
                }
                function refreshToDoList(){
                    projectList[currentProjectIndex].toDoItemList.forEach(toDoItem=>{
                        const newTodoItem = document.createElement("div");
                        newTodoItem.className = "to-do-item";
                        newTodoItem.classList.add("cauliflower");
                        newTodoItem.innerHTML = `
                                <button class="close-icon"></button>
                                <button class="edit-icon"></button>
                                <div class="item-top-info">
                                    <p class="priority" id="priority">`+toDoItem.priority+`</p>
                                    <ul><li class="to-do-title" id="title">`+toDoItem.title+`</li></ul>
                                    <p>Due on</p>
                                    <p id="dueDate">`+toDoItem.dueDate+`</p>
                                    <svg class="hidden" style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                    </svg>
                                </div>
                                <div class="item-bottom-info">
                                    <div class="item-description hidden">
                                        <p id="description">`+toDoItem.description+`</p>
                                    </div>
                                </div>
                        `;
                        projectOverviewModal.appendChild(newTodoItem);
                        const newToDoItemCloseButton = newTodoItem.querySelectorAll(".close-icon")[0];
                        newToDoItemCloseButton.addEventListener("click", (e)=>{
                            //let nodes = Array.from(projectOverviewModal.querySelectorAll(".to-do-item"));
                            //let index = nodes.indexOf(newToDoItemCloseButton.parentElement);
                            newToDoItemCloseButton.parentElement.remove();
                            //projectList[currentProjectIndex].removeItem(index);
                            refreshToDoListArray();
                            e.stopPropagation();
    
                            for(let i = 0; i < projectList[currentProjectIndex].toDoItemList.length; i++){
                                    console.log("Element " + i + " Title: " + projectList[currentProjectIndex].toDoItemList[i].title);
                                }
                            console.log("----- end of log -----");
                        });
                        const newToDoItemEditButton = newTodoItem.querySelectorAll(".edit-icon")[0];
                        newToDoItemEditButton.addEventListener("click", (e)=>{
                            toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value = title;
                            toDoItemForm.querySelectorAll("#priority")[0].value = priority;
                            toDoItemForm.querySelectorAll("#dueDate")[0].value = dueDate;
                            toDoItemForm.querySelectorAll("#description")[0].value = description;
    
                            newTodoItem.parentElement.replaceChild(toDoItemForm,newTodoItem);
                            e.stopPropagation();
                            //toDoItem.beingEdited = true;
                            refreshToDoListArray();
    
                            for(let i = 0; i < projectList[currentProjectIndex].toDoItemList.length; i++){
                                console.log("Element " + i + " Title: " + projectList[currentProjectIndex].toDoItemList[i].title);
                            }
                            console.log("----- end of log -----");
                        });
                        const itemDescriptions = newTodoItem.getElementsByClassName("item-description");
                        itemDescriptions[0].parentElement.parentElement.addEventListener("click",()=>{
                            if(itemDescriptions[0].classList.contains("hidden")){
                                itemDescriptions[0].classList.remove("hidden");
                            }else{
                                itemDescriptions[0].classList.add("hidden");
                            }
                        });
                    });
                }
                body.appendChild(projectOverviewModal);
                body.appendChild(grayOut);
                refreshToDoList(); // Refreshing the overview modal with to-do items from the correct project in the projectList array.
            });

            const gridContainer = document.getElementsByClassName("grid-container")[0];
            gridContainer.insertBefore(newCard,gridContainer.firstChild);
            grayOut.remove();
            closeButton.parentElement.remove();
        }
    });
});