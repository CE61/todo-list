// Project Card
const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.innerHTML = `<button class="close-icon"></button>
            <p class="card-title">`+title+`</p>
            <p class="card-description">`+description+`</p>
            <svg class="hidden" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>`;

// Project Overview Modal
                const projectOverviewModal = document.createElement("div");
                projectOverviewModal.className = "project-overview-modal";
                projectOverviewModal.innerHTML=`<button class="close-icon"></button>
                <h1 style="font-family: Arial, Helvetica, sans-serif;">To-Do List</h1>
                <button id="add-todo-item"></button>`;

// To-Do Item Form
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

// To-Do Item
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
// no date
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

// Refresh To-Do List Array
function refreshToDoListArray(){
    projectList[currentProjectIndex].toDoItemList = [];
    let itemsArray = Array.from(projectOverviewModal.querySelectorAll(".to-do-item"));
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