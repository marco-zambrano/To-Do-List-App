const newTaskbtn = document.querySelectorAll('.new-task-btn');  // new task buttons
// Page sections
const mainSection = document.getElementById('main');    
const addSection = document.getElementById('add');  

const createTask = (task, date, container) => {
    const fragment = document.createDocumentFragment(); //use fragments, so we dont manipulate the DOM with each creation

    //create the task box
    const taskBox = document.createElement('div');
    taskBox.classList.add('tasks__individual-task');

    //create the input 
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('name', 'task');
    checkBox.setAttribute('id', `${task.slice(0, 5)}`);
    checkBox.classList.add('tasks__individual-checkbox');
    fragment.appendChild(checkBox);

    //create the label 
    const label = document.createElement('label');
    label.setAttribute('for', task.slice(0, 5));
    label.classList.add('tasks__individual-checkbox-label');
    label.innerText = task;
    fragment.appendChild(label);

    //create p for the date
    const paragraph = document.createElement('p');
    paragraph.innerText = date ? date :'No due date';
    fragment.appendChild(paragraph);

    // Create the SVG element
    const svgNS = "http://www.w3.org/2000/svg"; // Namespace for SVG
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('stroke-width', '1');
    svg.setAttribute('id', task.slice(0, 6));

    // Add the paths to the SVG
    const paths = [
        "M4 7l16 0",
        "M10 11l0 6",
        "M14 11l0 6",
        "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
        "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
    ];
    paths.forEach(d => {
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        svg.appendChild(path);
    });
    fragment.appendChild(svg);

    //insert it in the taskBox and in the respective container
    taskBox.appendChild(fragment);
    container.appendChild(taskBox);
}

const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

const setTask = (task, imp, date, cat) => {   
    const importanceContainers = Array.from(document.querySelectorAll('.tasks__tasks-importance-container'));
    const generalTaskContainer = document.getElementById('tasks__tasks-container'); // the container of the category 

    // in case there are categories 
    if (importanceContainers) {
        const importanceBox = importanceContainers.find(cont => cont.id === `${imp}-container`);
        
        //In case this container exits
        if (importanceBox) {
            createTask(task, date, importanceBox);
        } else {    //in case this importance container doesnt exits, we create a new one
            const newImportanceBox = document.createElement('div');
            newImportanceBox.classList.add('tasks__tasks-importance-container');
            newImportanceBox.setAttribute('id', `${imp}-container`);
            // Importance Subtitle
            const subtitle = document.createElement('h2');
            subtitle.classList.add('tasks__tasks-importance-title');
            subtitle.innerText = `${capitalize(imp)}.`;

            newImportanceBox.appendChild(subtitle); //Insert the subtitle
            createTask(task, date, newImportanceBox);   //create the task
            generalTaskContainer.appendChild(newImportanceBox); //and insert it in the generalTaskContainer
        }

    }
    // In case theres no any importance container, so its another category
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



// Categories currently avaible
const selectCategorieContainer = document.querySelectorAll('.categories__categories');
// The categorie titles of my tasks
const taskCategorieTitle = Array.from(document.querySelectorAll('.tasks__categorie-title'));

// CREATING ANOTHER CATEGORIE WRAPP, WE HAVE TO DECLARE INSIDE THAT FUNC, AND NOT ONCE
const categorieWrappers = document.querySelectorAll('.tasks__wrapper'); // the categories containers


const setCategorie = (cat) => {
    //if other buttons are actived, set them by default
    selectCategorieContainer.forEach(categorie => {
        if (categorie.classList.contains('clicked')) {
            categorie.classList.toggle('clicked');
        }
    })

    //search the respective title
    taskCategorieTitle.filter(title => {
        if (title.id === `${cat.innerText.toLowerCase()}-title`) {
            title.innerText = cat.innerText;
        }
    });

    cat.classList.toggle('clicked');    //chenge the color

    // Put display none of every categorie, less the one you clicked
    categorieWrappers.forEach(wrapper => {
        if (wrapper.id !== `${cat.innerText.toLowerCase()}-container`) {
            wrapper.style.display = 'none'; 
        } else {
            wrapper.style.display = 'flex'; 
        }
    })
}   

selectCategorieContainer.forEach(categorie => {
    categorie.addEventListener('click', () => {
        setCategorie(categorie);
    });
})