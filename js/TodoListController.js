'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }
	//
	processEditItem(index){
		window.todo.model.setEditItem(index);
	}
    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }
	
	processSortItemsByDueDate(){
		if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
			window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
		}
		else {
			window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
		}
	}
    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }
	processDeleteList(){
		window.todo.model.removeList(window.todo.model.listToEdit);
		window.todo.view.hideDialog();
		setTimeout(function(){
			// THIS COULD HAPPEN ANYWHERE SO HIDE ALL THE OTHERS
			window.todo.view.showElementWithId(TodoGUIId.TODO_LIST,false);
			window.todo.view.showElementWithId(TodoGUIId.TODO_ADD,false);
		
			// AND GO HOME
			window.todo.view.showElementWithId(TodoGUIId.TODO_HOME, true);
			document.getElementById("item_description_textfield").value = "";
			document.getElementById("item_assigned_to_textfield").value = "";
			document.getElementById("item_completed_checkbox").value = false;
			window.todo.model.listToEdit.setOwner(document.getElementById("list_owner_textfield").value);
			document.getElementById("list_owner_textfield").value="";
		},100);		
		window.todo.view.hideDialog();
		
		
	}
	processMoveItemUp(index){
		window.todo.model.moveItemUp(index);
		event.cancelBubble = true;
		
	}
	processMoveItemDown(index){
		window.todo.model.moveItemDown(index);
		event.cancelBubble = true;
	}
	processDeleteItem(index){
		window.todo.model.deleteItem(index);
		event.cancelBubble = true;
	}
	processCreateNewItem(){
		
	}
	processEditItem(index){
		window.todo.model.setEditItem(index);
		let description = window.todo.model.listToEdit.items[index].getDescription();
		let assigned_to = window.todo.model.listToEdit.items[index].getAssignedTo();
		let completed = window.todo.model.listToEdit.items[index].isCompleted();
		let due_date = window.todo.model.listToEdit.items[index].getDueDate();
		document.getElementById("item_description_textfield").value = description;
		document.getElementById("item_assigned_to_textfield").value = assigned_to;
		document.getElementById("item_completed_checkbox").checked = completed;
		document.getElementById("item_due_date_picker").value = due_date;
		window.todo.model.goAddItem();
	}
	submit(){
		if(window.todo.model.editItem === null){
			let newItem = new TodoListItem();
			newItem.setDescription(document.getElementById("item_description_textfield").value);
			newItem.setAssignedTo(document.getElementById("item_assigned_to_textfield").value);
			newItem.setDueDate(document.getElementById("item_due_date_picker").value);
			newItem.setCompleted(document.getElementById("item_completed_checkbox").checked);
			window.todo.model.listToEdit.addItem(newItem);
			window.todo.model.goList();
		}else{
			window.todo.model.editItem.setDescription(document.getElementById("item_description_textfield").value);
			window.todo.model.editItem.setAssignedTo(document.getElementById("item_assigned_to_textfield").value);
			window.todo.model.editItem.setDueDate(document.getElementById("item_due_date_picker").value);
			window.todo.model.editItem.setCompleted(document.getElementById("item_completed_checkbox").checked);
			window.todo.model.goList();
			
		}
	}
}