import { compareAsc, isToday, isThisWeek } from 'date-fns';

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(newTask) {
    if (this.tasks.find((task) => task.getName() === newTask.getName())) {
      return;
    }
    this.tasks.push(newTask);
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.getName() !== taskName);
  }

  sortByDate() {
    this.tasks.sort((a, b) => compareAsc(a.getDueDate(), b.getDueDate()));
  }

  sortByPriority() {
    this.tasks.sort((a, b) => a.getPriority() - b.getPriority());
  }

  sortAlphabetically() {
    this.tasks.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  getTodayTasks() {
    return this.tasks.filter((task) => isToday(task.getDueDate()));
  }

  getThisWeekTasks() {
    return this.tasks.filter((task) => isThisWeek(task.getDueDate(), 1));
  }
}
