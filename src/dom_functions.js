import Task from "./task.js"
import Project from "./project"


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
    } else {
        checkeddiv.classList.add('not-done');
        taskdiv.classList.add('not-done');
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

    projectDiv.lastChild.before(taskdiv);
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

    const addbtn = document.createElement('button');

    addbtn.classList.add('add-task-btn');

    addbtn.textContent = '+ Add task';
    projectDiv.appendChild(addbtn);

    renderTasks(project);


    const sortbtn = document.createElement('button');
    sortbtn.classList.add('sort-btn');
    sortbtn.textContent = 'sort: Date';
    sortbtn.id = '1';
    sortbtn.addEventListener('click', function (e) {
        switch (e.target.id) {
            case '0':
                project.sortByDate();
                derenderTasks();
                renderTasks(project);
                e.target.textContent = 'sort: Date';
                e.target.id = '1';
                break;
            case '1':
                project.sortByPriority();
                derenderTasks();
                renderTasks(project);
                e.target.textContent = 'sort: Priority';
                e.target.id = '2';
                break;
            case '2':
                project.sortAlphabetically();
                derenderTasks();
                renderTasks(project);
                e.target.textContent = 'sort: Alphabetically';
                e.target.id = '0';
                break;
        }
    });
    titlediv.appendChild(sortbtn);
    addbtn.addEventListener('click', function () {
        renderForm(project);
    });
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
    const checkdiv = taskdiv.querySelector('.checkdiv');

    deletebtn.addEventListener('click', function (e) {
        project.deleteTask(task.getName());
        e.target.parentElement.parentElement.remove();
    });
    editbtn.addEventListener('click', function () {
        editTask(task, project);
    });
    detailsbtn.addEventListener('click', function () {
        detailsTask(task);
    });
    checkdiv.addEventListener('click', function () {
        task.toggleDone();
        if (checkdiv.classList.contains('done')) {
            checkdiv.classList.add('not-done');
            taskdiv.classList.add('not-done');
            checkdiv.classList.remove('done');
            taskdiv.classList.remove('done');
        } else {
            checkdiv.classList.add('done');
            taskdiv.classList.add('done');
            checkdiv.classList.remove('not-done');
            taskdiv.classList.remove('not-done');
        }
    });


}

function derenderTasks() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach((task) => task.remove());
}

function renderForm(project) {
    const form = document.querySelector('#task-form');
    const formbtn = document.querySelector('.form-btn');
    const quitbtn = document.querySelector('.quit-btn');
    form.style.display = 'block';
    const formbutton = formbtn.cloneNode(true)
    formbtn.replaceWith(formbutton);
    formbutton.addEventListener('click', function formListener(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const name = form.elements['name'].value;
        const description = form.elements['description'].value;
        const date = form.elements['date'].value;
        let priority = form.elements['priority'].value;
        switch (priority) {
            case 'high':
                priority = 0;
                break;
            case 'medium':
                priority = 1;
                break;
            case 'low':
                priority = 2;
                break;
        }
        const done = form.elements['done'].checked;
        let task = new Task(name, description, new Date(date), priority, done);
        project.addTask(task);
        createTask(task);
        addEventListenerToTask(task, project);
        form.reset();
        form.style.display = 'none';
    });
    quitbtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        form.reset();
        form.style.display = 'none';
    });
}

function editTask(task, project) {
    const form = document.querySelector('#task-form');
    const formbtn = document.querySelector('.form-btn');
    const quitbtn = document.querySelector('.quit-btn');
    form.style.display = 'block';
    form.elements['name'].value = task.getName();
    form.elements['description'].value = task.getDescription();
    form.elements['date'].value = task.getDomDate();
    switch (task.getPriority()) {
        case 0:
            form.elements['priority'].value = 'high';
            break;
        case 1:
            form.elements['priority'].value = 'medium';
            break;
        case 2:
            form.elements['priority'].value = 'low';
            break;
    }
    form.elements['done'].checked = task.isDone();

    const formbutton = formbtn.cloneNode(true)
    formbtn.replaceWith(formbutton);
    formbutton.addEventListener('click', function formListener(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        task.setName(form.elements['name'].value);
        task.setDescription(form.elements['description'].value);
        task.setDueDate(new Date(form.elements['date'].value));
        switch (form.elements['priority'].value) {
            case 'high':
                task.setPriority(0);
                break;
            case 'medium':
                task.setPriority(1);
                break;
            case 'low':
                task.setPriority(2);
                break;
        }
        if (form.elements['done'].checked) task.setDone();
        else task.setNotDone();
        derenderTasks(project);
        renderTasks(project);
        form.reset();
        form.style.display = 'none';
    });
    formbutton.textContent = 'Edit task';
    quitbtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        form.reset();
        form.style.display = 'none';
    });
}

function detailsTask(task) {
    const form = document.querySelector('#task-form');
    const formbtn = document.querySelector('.form-btn');
    const quitbtn = document.querySelector('.quit-btn');
    form.style.display = 'block';
    form.elements['name'].value = task.getName();
    form.elements['description'].value = task.getDescription();
    form.elements['date'].value = task.getDomDate();
    switch (task.getPriority()) {
        case 0:
            form.elements['priority'].value = 'high';
            break;
        case 1:
            form.elements['priority'].value = 'medium';
            break;
        case 2:
            form.elements['priority'].value = 'low';
            break;
    }
    form.elements['done'].checked = task.isDone();

    const select = form.querySelector('select');
    const input = Array.from(form.querySelectorAll('input'));
    input.forEach(inp => inp.disabled = true);
    select.disabled = true;

    const formbutton = formbtn.cloneNode(true)
    formbtn.replaceWith(formbutton);
    formbutton.addEventListener('click', function formListener(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        form.reset();
        form.style.display = 'none';
        input.forEach(inp => inp.disabled = false);
        select.disabled = false;
    });
    formbutton.textContent = 'Done';

    quitbtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        form.reset();
        form.style.display = 'none';
    });
}

function createProject() {
    const nav = document.querySelector('nav');
    const newProjectDiv = document.createElement('button');
    const addProjectBtn = document.querySelector('#add-project-btn');
    const input = nav.querySelector('input');

    newProjectDiv.textContent=input.value;

    if(newProjectDiv.textContent) addProjectBtn.before(newProjectDiv);
}


function addProjectBtn(){
    const addProjectBtn = document.querySelector('#add-project-btn');

    addProjectBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.classList.add('project-input');

        const quitbtn = document.createElement('button');
        quitbtn.classList.add('add-project-quit-btn');
        quitbtn.textContent = 'X';
        const donebtn = document.createElement('button');
        donebtn.classList.add('add-project-done-btn');
        donebtn.textContent = 'done';
        addProjectBtn.before(input);

        const btndiv = document.createElement('div');
        btndiv.classList.add('btndiv')
        btndiv.appendChild(donebtn);
        btndiv.appendChild(quitbtn);
        addProjectBtn.before(btndiv);

        donebtn.addEventListener('click', () => {
            createProject();
            btndiv.remove();
            input.remove();
        });
        quitbtn.addEventListener('click', () => {
            btndiv.remove();
            input.remove();
        });

    });
}







function firstRender() {
    
    addProjectBtn();


    let task1 = new Task('A Do something', 'description1', new Date(2022, 10, 30), 2, false);
    let task2 = new Task('B Do something', 'description2', new Date(2022, 10, 28), 0, true);
    let task3 = new Task('D Do something', 'description3', new Date(2022, 0, 2), 1, false);
    let task4 = new Task('C Do something', 'description4', new Date(2022, 11, 2), 0, false);

    let project = new Project('projekty');

    project.addTask(task1);
    project.addTask(task2);
    project.addTask(task3);
    project.addTask(task4);

    renderProject(project);

}
export default firstRender
