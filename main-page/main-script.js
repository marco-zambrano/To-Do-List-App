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



const setTask = () => {
    if (localStorage.getItem('taskObj')) {
        const variable = JSON.parse(localStorage.getItem('taskObj'));
        console.log(variable);
    } else {
        console.log('no');
    }
}






const setCategorieTitle = (title) => {
    taskCategorieTitle.innerText = title;
}   
selectCategorieContainer.forEach(categorie => {
    categorie.addEventListener('click', () => {
        // console.log(categorie.innerText);
        setCategorieTitle(categorie.innerText);
    } )
})














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
            const {initializateAddScript} = await import('../sections/add-task/add-script.js');
            initializateAddScript();    //here it executes
        }
    } catch (error) {
        console.error('Error: ', error);
        addSection.innerHTML = 'Something went wrong opening this content';
    }
}   

newTaskbtn.forEach(btn => {
    btn.addEventListener('click', loadAddSection);
});
