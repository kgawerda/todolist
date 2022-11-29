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

    setDone(){
        this.done=true;
    }

    setNotDone(){
        this.done=false;
    }

    toggleDone(){
        this.done = !this.done;
    }

    getFormatDate() {
        let Date=this.dueDate;
        return format(Date, 'dd/MM/yy');
    }

    getDomDate(){
        let Date=this.dueDate;
        return format(Date, 'yyyy-MM-dd');
    }
}