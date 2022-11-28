import Task from "./task.js"
import Project from "./project"

let task1 = new Task('atitle1','description1', new Date(2022,10,30), 2);
let task2 = new Task('btitle2','description2', new Date(2022,10,28), 3);
let task3 = new Task('dtitle3','description3', new Date(2022,0,2), 1);
let task4 = new Task('ctitle4','description4', new Date(2022,11,2), 3);

let project = new Project('projekty');

project.addTask(task1);
project.addTask(task2);
project.addTask(task3);
project.addTask(task4);

