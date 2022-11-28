import { format } from 'date-fns'

export default class task {
    constructor(name, description, dueDate = 'No date', priority, done = false) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; //0 - highest
        this.done = done;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDescription(string) {
        this.description = string;
    }

    getDescription() {
        return this.description;
    }

    setDueDate(date) {
        this.dueDate = date;
    }

    getDueDate() {
        return this.dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getPriority() {
        return this.priority;
    }

    isDone() {
        return this.done;
    }

    toggleDone(){
        this.done = !this.done;
    }

    formatDate() {
        format(this.dueDate, 'dd/MM/yy');
    }
}