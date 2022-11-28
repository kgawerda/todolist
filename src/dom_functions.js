import Task from "./task.js"
import Project from "./project"
import { de } from "date-fns/locale";

function createTask(task) {
    const projectDiv = document.querySelector('.project-div');
    const taskdiv = document.createElement('div');
    const checkeddiv = document.createElement('div');
    const tasktitle = document.createElement('div');
    const editbtn = document.createElement('button');
    const datediv = document.createElement('div');
    const deletebtn = document.createElement('button');
    const detailsbtn = document.createElement('button');

    const rightdiv = document.createElement('div');
    const leftdiv = document.createElement('div');

    taskdiv.classList.add('task');
    taskdiv.id = task.getName().replace(/\s/g, "");
    switch (task.getPriority()) {
        case 0:
            taskdiv.classList.add('priority-high');
            break;
        case 1:
            taskdiv.classList.add('priority-medium');
            break;
        case 2:
            taskdiv.classList.add('priority-low');
            break;
    }

    if (task.isDone()) {
        checkeddiv.classList.add('done');
        taskdiv.classList.add('done');
        checkeddiv.textContent = 'Done';
    } else {
        checkeddiv.classList.add('not-done');
        taskdiv.classList.add('not-done');
        checkeddiv.textContent = 'Not done';
    }


    tasktitle.textContent = task.getName();
    datediv.textContent = task.getFormatDate();
    deletebtn.textContent = 'delete';
    editbtn.textContent = 'edit';
    detailsbtn.textContent = 'details'

    detailsbtn.classList.add('details-btn');
    editbtn.classList.add('edit-btn');
    deletebtn.classList.add('delete-btn');
    leftdiv.classList.add('task-left');
    rightdiv.classList.add('task-right');

    checkeddiv.classList.add('checkdiv');
    tasktitle.classList.add('titlediv');
    datediv.classList.add('datediv');

    leftdiv.appendChild(checkeddiv);
    leftdiv.appendChild(tasktitle);
    rightdiv.appendChild(detailsbtn);
    rightdiv.appendChild(editbtn);
    rightdiv.appendChild(datediv);
    rightdiv.appendChild(deletebtn);


    taskdiv.appendChild(leftdiv);
    taskdiv.appendChild(rightdiv);

    projectDiv.appendChild(taskdiv);
}

function renderProject(project) {
    const projectDiv = document.querySelector('.project-div');
    const projectTitle = document.createElement('h1');


    const titlediv = document.createElement('div');
    titlediv.classList.add('titlediv')
    titlediv.appendChild(projectTitle);


    projectTitle.textContent = project.getName();
    projectDiv.appendChild(titlediv);
    projectDiv.id = project.getName().replace(/\s/g, "");

    renderTasks(project);


    const sortbtn = document.createElement('button');
    sortbtn.classList.add('sort-btn');
    sortbtn.textContent = 'sort: Date';
    sortbtn.id = '1';
    sortbtn.addEventListener('click', function (e) {
        switch (e.target.id) {
            case '0':
                console.log('0')
                project.sortByDate();
                derenderTasks();
                renderTasks(project);
                e.target.textContent = 'sort: Date';
                e.target.id = '1';
                break;
            case '1':
                console.log('1');
                project.sortByPriority();
                derenderTasks();
                renderTasks(project);
                e.target.textContent = 'sort: Priority';
                e.target.id = '2';
                break;
            case '2':
                console.log('2');
                project.sortAlphabetically();
                derenderTasks();
                renderTasks(project);
                e.target.textContent = 'sort: Alphabetically';
                e.target.id = '0';
                break;
        }
    });
    titlediv.appendChild(sortbtn);

}

function renderTasks(project) {
    project.tasks.forEach(task => {
        createTask(task);
        addEventListenerToTask(task, project);
    });
}


function addEventListenerToTask(task, project) {
    const taskdiv = document.querySelector('#' + task.getName().replace(/\s/g, ""));
    const deletebtn = taskdiv.querySelector('.delete-btn');
    const editbtn = taskdiv.querySelector('.edit-btn');
    const detailsbtn = taskdiv.querySelector('.details-btn');

    deletebtn.addEventListener('click', function (e) {
        project.deleteTask(task.getName());
        e.target.parentElement.parentElement.remove();
    });
    editbtn.addEventListener('click', function () {

    });
    detailsbtn.addEventListener('click', function () {

    });


}

function derenderTasks() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach((task) => task.remove())
    /*
    while (projectDiv.firstChild-1) {
        projectDiv.removeChild(projectDiv.lastChild);
    }*/
}

export default renderProject
