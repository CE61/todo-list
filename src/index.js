
"use strict";

const projectList = [];
const gridContainer = document.getElementsByClassName("grid-container")[0];
const body = document.getElementsByTagName("body")[0];
const grayOut = document.createElement("div");
grayOut.className = "opaque";
var currentProjectIndex = 0;

window.onload = () => {
    if(window.localStorage != 0){
        loadFromDatabase();
    }
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
    }
}
function projectIsDuplicate(projectTitle){
    for(let i = 0; i<projectList.length;i++){
        if(projectTitle == projectList[i].title){
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
    refreshDatabase();
    console.log(projectList);
    console.log("-----end of log-----");
}
function refreshDatabase(){
    window.localStorage.clear();
    for(let i = 0; i < projectList.length; i++){
        window.localStorage.setItem("project"+i,JSON.stringify(projectList[i]));
        for(let j = 0; j < projectList[i].toDoItemList.length; j++){
            window.localStorage.setItem("project"+i+"item"+j,JSON.stringify(projectList[i].toDoItemList[j]));
        }
    }
}
function loadFromDatabase(){
    let remainder = 0;
    for(let i = 0; i < window.localStorage.length; i++){
        const projectJSON = JSON.parse(window.localStorage.getItem("project"+(i-remainder)));
        let itemListLength = projectJSON.toDoItemList.length;
        const project = new Project(projectJSON.title, projectJSON.description);
        for(let j = 0; j < itemListLength; j++){
            const itemJSON = JSON.parse(window.localStorage.getItem("project"+(i-remainder)+"item"+j));
            const toDoItem = new ToDoItem(itemJSON.priority, itemJSON.title, itemJSON.description, itemJSON.dueDate);
            project.toDoItemList.push(toDoItem);
            remainder++;
            i++;
        }
        projectList.push(project);
        createNewProjectCard(project);
    }

}
function refreshToDoListArray(projectIndex, projectOverviewModal){
    projectList[projectIndex].toDoItemList = [];
    let itemNodeArray = Array.from(projectOverviewModal.querySelectorAll(".to-do-item"));
    itemNodeArray.forEach(toDoItemNode=>{
        let priority = toDoItemNode.querySelectorAll("#priority")[0].textContent;
        let title = toDoItemNode.querySelectorAll("#title")[0].textContent;
        let description = toDoItemNode.querySelectorAll("#description")[0].textContent;
        let dueDate = toDoItemNode.querySelectorAll("#dueDate")[0].textContent;
        const toDoItem = new ToDoItem(priority,title,description,dueDate);

        console.log(toDoItem.title + "- title of toDoItem loaded from modal.");
        projectList[projectIndex].addItem(toDoItem);
    });
    console.log("Refreshed items array!");
    console.log(projectList[projectIndex].toDoItemList);
    refreshDatabase();
}
function refreshToDoList(projectIndex, projectOverviewModal){
    const toDoNodes = projectOverviewModal.querySelectorAll(".to-do-item,.to-do-item-form");
    const addButton = projectOverviewModal.querySelectorAll("#add-todo-item")[0];
    toDoNodes.forEach(toDoNode =>{
        toDoNode.remove();
    });
    addButton.remove();
    for(let i = 0; i < projectList[projectIndex].toDoItemList.length; i++){
        let priority = projectList[projectIndex].toDoItemList[i].priority;
        let title = projectList[projectIndex].toDoItemList[i].title;
        let description = projectList[projectIndex].toDoItemList[i].description;
        let dueDate = projectList[projectIndex].toDoItemList[i].dueDate;

        const toDoItem = createToDoItem(priority, title, description, dueDate);
        const toDoItemCloseButton = toDoItem.querySelectorAll(".close-icon")[0];
        toDoItemCloseButton.addEventListener("click", (e)=>{
            toDoItem.remove();
            refreshToDoListArray(projectIndex,projectOverviewModal);
            e.stopPropagation();
        });
        const toDoItemEditButton = toDoItem.querySelectorAll(".edit-icon")[0];
        toDoItemEditButton.addEventListener("click", (e)=>{
            const toDoItemForm = createToDoItemForm();
            toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value = title;
            toDoItemForm.querySelectorAll("#priority")[0].value = priority;
            toDoItemForm.querySelectorAll("#dueDate")[0].value = dueDate;
            toDoItemForm.querySelectorAll("#description")[0].value = description;

            const toDoItemFormSubmitButton = toDoItemForm.querySelectorAll(".check-icon")[0];
            toDoItemFormSubmitButton.addEventListener("click",()=>{
                let priority = toDoItemForm.querySelectorAll("#priority")[0].value;
                let title = toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value;
                let dueDate = toDoItemForm.querySelectorAll("#dueDate")[0].value;
                let description = toDoItemForm.querySelectorAll("#description")[0].value;
    
                const toDoItem = createToDoItem(priority,title,description,dueDate);
                const toDoItemCloseButton = toDoItem.querySelectorAll(".close-icon")[0];
                toDoItemCloseButton.addEventListener("click", (e)=>{
                    toDoItem.remove();
                    refreshToDoListArray(projectIndex,projectOverviewModal);
                    e.stopPropagation();
                });
                const toDoItemEditButton = toDoItem.querySelectorAll(".edit-icon")[0];
                toDoItemEditButton.addEventListener("click", (e)=>{
                    toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value = title;
                    toDoItemForm.querySelectorAll("#priority")[0].value = priority;
                    toDoItemForm.querySelectorAll("#dueDate")[0].value = dueDate;
                    toDoItemForm.querySelectorAll("#description")[0].value = description;
                    projectOverviewModal.replaceChild(toDoItemForm,toDoItem);
                    e.stopPropagation();
                });
                const itemDescription = toDoItem.querySelectorAll(".item-description")[0];
                toDoItem.addEventListener("click",()=>{
                    if(itemDescription.classList.contains("hidden")){
                        itemDescription.classList.remove("hidden");
                    }else{
                        itemDescription.classList.add("hidden");
                    }
                });
                projectOverviewModal.insertBefore(toDoItem,toDoItemForm);
                toDoItemFormCloseButton.click();
                refreshToDoListArray(projectIndex, projectOverviewModal);
            });
            const toDoItemFormCloseButton = toDoItemForm.querySelectorAll(".close-icon")[0];
            toDoItemFormCloseButton.addEventListener("click",()=>{
                toDoItemForm.remove();
            });
            projectOverviewModal.replaceChild(toDoItemForm,toDoItem);
            e.stopPropagation();
        });
        const itemDescription = toDoItem.querySelectorAll(".item-description")[0];
        toDoItem.addEventListener("click",()=>{
            if(itemDescription.classList.contains("hidden")){
                itemDescription.classList.remove("hidden");
            }else{
                itemDescription.classList.add("hidden");
            }
        });
        projectOverviewModal.appendChild(toDoItem);
    }
    projectOverviewModal.appendChild(addButton);
}
function createProjectOverview(projectIndex){
    const projectOverviewModal = document.createElement("div");
    projectOverviewModal.className = "project-overview-modal";
    projectOverviewModal.innerHTML=`<button class="close-icon"></button>
        <h1 style="font-family: Arial, Helvetica, sans-serif;">To-Do List</h1>
        <button id="add-todo-item"></button>`;
    const closeButton = projectOverviewModal.querySelectorAll(".close-icon")[0];
    closeButton.addEventListener("click",()=>{
        projectOverviewModal.remove();
        body.removeChild(grayOut);
    });

    const addButton = projectOverviewModal.querySelectorAll("#add-todo-item")[0];
    addButton.addEventListener("click",()=>{
        const toDoItemForm = createToDoItemForm();
        const toDoItemFormSubmitButton = toDoItemForm.querySelectorAll(".check-icon")[0];
        toDoItemFormSubmitButton.addEventListener("click",()=>{
            let priority = toDoItemForm.querySelectorAll("#priority")[0].value;
            let title = toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value;
            let dueDate = toDoItemForm.querySelectorAll("#dueDate")[0].value;
            let description = toDoItemForm.querySelectorAll("#description")[0].value;

            const toDoItem = createToDoItem(priority,title,description,dueDate);
            const toDoItemCloseButton = toDoItem.querySelectorAll(".close-icon")[0];
            toDoItemCloseButton.addEventListener("click", (e)=>{
                toDoItem.remove();
                refreshToDoListArray(projectIndex,projectOverviewModal);
                e.stopPropagation();
            });
            const toDoItemEditButton = toDoItem.querySelectorAll(".edit-icon")[0];
            toDoItemEditButton.addEventListener("click", (e)=>{
                toDoItemForm.querySelectorAll("#toDoItemTitle")[0].value = title;
                toDoItemForm.querySelectorAll("#priority")[0].value = priority;
                toDoItemForm.querySelectorAll("#dueDate")[0].value = dueDate;
                toDoItemForm.querySelectorAll("#description")[0].value = description;
                projectOverviewModal.replaceChild(toDoItemForm,toDoItem);
                e.stopPropagation();
            });
            const itemDescription = toDoItem.querySelectorAll(".item-description")[0];
            toDoItem.addEventListener("click",()=>{
                if(itemDescription.classList.contains("hidden")){
                    itemDescription.classList.remove("hidden");
                }else{
                    itemDescription.classList.add("hidden");
                }
            });
            projectOverviewModal.insertBefore(toDoItem,toDoItemForm);
            toDoItemFormCloseButton.click();
            refreshToDoListArray(projectIndex, projectOverviewModal);
        });
        const toDoItemFormCloseButton = toDoItemForm.querySelectorAll(".close-icon")[0];
        toDoItemFormCloseButton.addEventListener("click",()=>{
            toDoItemForm.remove();
        });
        projectOverviewModal.insertBefore(toDoItemForm,projectOverviewModal.lastChild);
    });
    refreshToDoList(projectIndex, projectOverviewModal);
    body.appendChild(projectOverviewModal);
    body.appendChild(grayOut);
}
function createToDoItemForm(){
    const toDoItemForm = document.createElement("div");
    toDoItemForm.className = "to-do-item-form";
    toDoItemForm.innerHTML = `<button class="close-icon"></button>
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
        return toDoItemForm;
}
function createToDoItem(priority, title, description, dueDate){
    const toDoItem = document.createElement("div");
    toDoItem.className = "to-do-item";
    toDoItem.innerHTML = `<button class="close-icon"></button>
        <button class="edit-icon"></button>
        <div class="item-top-info">
            <p class="priority" id="priority">`+priority+`</p>
            <ul><li class="to-do-title" id="title">`+title+`</li></ul>
            <p></p>
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
    return toDoItem;
}
function createNewProject(){
    const newProjectModal = document.createElement("div");
    newProjectModal.className = "new-project-modal";

    const newProjectForm = document.createElement("form");
    newProjectForm.innerHTML = `<label for="projectTitle">Project Title</label><br>
    <input type="text" id="projectTitle" name="projectTitle" placeholder="Enter title of project here."><br>
    <label for="projectDescription">Description</label><br>
    <textarea type="text" id="projectDescription" name="projectDescription" rows="12" cols="38" placeholder="Enter description of project here."></textarea>
    <input class="submit-button" type="button" value="Submit">`

    const closeButton = document.createElement("button");
    closeButton.className = "close-icon";
    closeButton.addEventListener("click",()=>{
        grayOut.remove();
        closeButton.parentElement.remove();
    });

    newProjectModal.appendChild(closeButton);
    newProjectModal.appendChild(newProjectForm);

    const submitButton = newProjectForm.querySelectorAll(".submit-button")[0];
    submitButton.addEventListener("click", ()=>{
        let title = newProjectForm.querySelectorAll("#projectTitle")[0].value;
        let description = newProjectForm.querySelectorAll("#projectDescription")[0].value;
        if(projectIsDuplicate(title)){
            alert("A project with the same title already exists! Please choose a different title.");
        }else{
            const project = new Project(title,description);
            projectList.push(project);
            refreshDatabase();
            console.log(projectList);
            console.log("-----end of log-----");

            createNewProjectCard(project);
            closeButton.click();
        }
    });
    
    body.appendChild(grayOut);
    body.appendChild(newProjectModal);
}
function createNewProjectCard(project){
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `<button class="close-icon"></button>
        <p class="card-title">`+project.title+`</p>
        <p class="card-description">`+project.description+`</p>
        <svg class="hidden" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>`;
    const closeButton = newCard.querySelectorAll(".close-icon")[0];
    closeButton.addEventListener("click",(e)=>{
        e.stopPropagation();
        closeButton.parentElement.remove();
        deleteProject(project.title);
    });
    newCard.addEventListener("click", ()=>{
        for(let i = 0; i < projectList.length; i++){
            if(newCard.querySelectorAll(".card-title")[0].textContent == projectList[i].title){
                currentProjectIndex = i;
                console.log("Project \"" + projectList[i].title + "\" selected");
                i = projectList.length;
                createProjectOverview(currentProjectIndex);
            }
        }
    });
    gridContainer.insertBefore(newCard,gridContainer.firstChild);
}

const newProjectButton = document.getElementById("add-new-project");
newProjectButton.addEventListener("click",()=>{
    createNewProject();
});