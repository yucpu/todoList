'use strict'
/**
 * TodoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor() {
        this.description = "Unknown";
        this.assignedTo = "Unknown";
        this.completed = false;
		this.dueDate = "Unknown";
    }

    // GETTER/SETTER METHODS

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setAssignedTo(initAssignedTo) {
        this.assignedTo = initAssignedTo;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(initCompleted) {
        this.completed = initCompleted;
    }
	getDueDate(){
		return this.dueDate;
	}
	setDueDate(initDate){
		this.dueDate = initDate;
	}
}