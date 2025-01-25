const newTaskbtn = document.querySelectorAll('.new-task-btn');  // new task buttons
// Page sections
const mainSection = document.getElementById('main');    
const addSection = document.getElementById('add');  
// Categories currently avaible
const selectCategorieContainer = document.querySelectorAll('.categories__categories');
// the Categorie Title of my tasks
const taskCategorieTitle= document.getElementById('tasks__categorie-title');
//here we save all the tasks
const taskContainer = document.getElementById('tasks__tasks-container');
// task containers for manipulation
const importanceContainers = Array.from(document.querySelectorAll('.tasks__tasks-importance-container'));

const setTask = (task, imp, date, cat) => {
    // in case there are categories 
    if (importanceContainers) {
        const importanceBox = importanceContainers.find(cont => cont.id === `${imp}-container`);
        //In case this container exits
        if (importanceBox) {
            const fragment = document.createDocumentFragment(); //use fragments, so we dont manipulate the DOM with each creation
            //create the task box
            const taskBox = document.createElement('div');
            taskBox.classList.add('tasks__individual-task');
            //create the input 
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.setAttribute('name', 'mi-checkbox');
            checkBox.setAttribute('id', `${task.slice(0, 5)}`);
            checkBox.classList.add('tasks__individual-checkbox');
            fragment.appendChild(checkBox);
            //create the label 
            const label = document.createElement('label');
            label.setAttribute('for', checkBox.id);
            label.classList.add('tasks__individual-checkbox-label');
            label.innerText = task;
            fragment.appendChild(label);
            //create p for the date
            const paragraph = document.createElement('p');
            paragraph.innerText = date ? date :'No due date';
            fragment.appendChild(paragraph);

            //insert it in the taskBox and in the importance container
            taskBox.appendChild(fragment);
            importanceBox.appendChild(taskBox);
        } else {    //in case this container doesnt exits
            console.log('no existe');
        }
    }
    // In case it doesnt exits, we have to create it
}


// Load the add-task section
const loadAddSection = async () => {
    mainSection.style.display = 'none';
    try {
        const response = await fetch('../sections/add-task/add-task.html');
        if (!response.ok) throw new Error("File couldn't be loaded");

        const html = await response.text();
        addSection.innerHTML = html;
        addSection.style.display = 'flex';

        //Check if this page script already exist.
        // If we add it again, it will declare the variables over and over, making problems.
        const existingScript = document.querySelector('script[src="../sections/add-task/add-script.js"]');
        if (existingScript) {
            existingScript.remove(); // delete the current script
        }

        // create and load a new script 
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '../sections/add-task/add-script.js';
        document.body.appendChild(script);  

        //  execute the logic exported from the script
        script.onload = async () => {
            try {
                const {initializateAddScript, getData} = await import('../sections/add-task/add-script.js');
                initializateAddScript();    //for the dinamical display changer
                const data = await getData(); // new task functions that gets the promise that resolves the data
                const {task, importance, dueDate, categorie} = data;
                // function to create the task
                setTask(task, importance, dueDate, categorie);
            } catch (err) {
                console.error('Error found: ', err);
            }
        }
    } catch (error) {
        console.error('Error: ', error);
        addSection.innerHTML = 'Something went wrong opening this content';
    }
}  

newTaskbtn.forEach(btn => {
    btn.addEventListener('click', loadAddSection);
});




//THIS WORKS
// const setCategorieTitle = (title) => {
//     taskCategorieTitle.innerText = title;
// }   
// selectCategorieContainer.forEach(categorie => {
//     categorie.addEventListener('click', () => {
//         // console.log(categorie.innerText);
//         setCategorieTitle(categorie.innerText);
//     } )
// })