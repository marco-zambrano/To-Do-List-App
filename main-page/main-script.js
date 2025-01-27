// CREATE TASK  AND LOAD CONTENT SECTION
const mainSection = document.getElementById('main');    
const addSection = document.getElementById('add');  
const newTaskbtn = document.querySelectorAll('.new-task-btn');  // new task buttons
let categorieWrappers = document.querySelectorAll('.tasks__wrapper'); // the categories containers

const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

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

const setTask = (task, imp, date, cat) => {   
    
    
    
    // categorieWrappers = document.querySelectorAll('.tasks__wrapper');   //category div
    // console.log('Creating task: ', categorieWrappers);


    const importanceContainers = Array.from(document.querySelectorAll('.tasks__tasks-importance-container'));
    const generalTaskContainer = document.getElementById('tasks__tasks-container'); // the container of the category saves different importance divs

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
    } else {
        alert('No importance containers avaible');
    }
    // In case theres no any importance container, so its another category
}

// Load the add-task section and gets its information
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

        //  Execute the logic exported from the script
        script.onload = async () => {
            try {
                const {initializateAddScript, getData, createOptions} = await import('../sections/add-task/add-script.js');
                initializateAddScript();    //for the dinamical display changer
                createOptions();
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



// CATEGORY SECTION
let selectCategorieContainer = document.querySelectorAll('.categories__categories'); // Categories currently avaible

const openCategorie = (cat) => {
    //if other buttons are actived, set them by default color
    selectCategorieContainer.forEach(categorie => {
        if (categorie.classList.contains('clicked')) {
            categorie.classList.toggle('clicked');
        }
    })
    cat.classList.toggle('clicked');    //chenge the color

    categorieWrappers = document.querySelectorAll('.tasks__wrapper'); // update the categories containers
    // Put display none of every categorie, less the one you clicked
    categorieWrappers.forEach(wrapper => {
        if (wrapper.id !== `${cat.innerText.toLowerCase()}-container`) {
            wrapper.style.display = 'none'; 
        } else {
            wrapper.style.display = 'flex'; 
        }
    })
} 

//hear the father container, in case the buttons amount changes (DOM changes)
const categorieBtnContainer = document.getElementById('categories__categories-container');
categorieBtnContainer.addEventListener('click', (event) => {
    const categorie = event.target.closest('.categories__categories');
    if (categorie) {
        openCategorie(categorie);
    }
})

//  Create categorie btn
const addCategorieBtn = document.getElementById('categories__add-btn');
// Dialog 
const fog = document.getElementById('fog');
const dialogContainer = document.getElementById('dialog');
const dialogInput = document.getElementById('dialog__input');
const dialogCancelBtn = document.getElementById('dialog__cancel-btn');  // cancel btn
const dialogCreateBtn = document.getElementById('dialog__create-btn');  //create btn

//change the dialog display
const changeDialogDisplay = () => {
    dialogInput.value = '';
    dialogContainer.classList.toggle('visible');
    fog.classList.toggle('visible');
}
// Open the dialog
addCategorieBtn.addEventListener('click', () => {
    changeDialogDisplay();
})

// FUNCTION TO CHECK
const createCategoryDom = (cat) => {
    // Main container
    const taskSection = document.getElementById('tasks');
    
    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('tasks__wrapper');
    wrapper.setAttribute('id', `${cat.innerText.toLowerCase()}-container`);
    wrapper.style.display = 'none';

    // Header
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('tasks__categorie-container');

    // Header - h2
    const headerTitle = document.createElement('h2');
    headerTitle.setAttribute('id', `${cat.innerText.toLowerCase()}-title`);
    headerTitle.classList.add('tasks__categorie-title');
    headerTitle.innerText = cat.innerText + '.';
    headerContainer.appendChild(headerTitle);

    // Header - button
    const headerBtn = document.createElement('button');
    headerBtn.classList.add('tasks__categorie-new-task-btn', 'new-task-btn');
    headerBtn.innerText = '+ New Task';
    headerContainer.appendChild(headerBtn);

    // Add header to wrapper
    wrapper.appendChild(headerContainer);

    // Body
    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('tasks__tasks-container');
    bodyContainer.setAttribute('id', 'tasks__tasks-container');

    // Importance Container
    const importanceContainer = document.createElement('div');
    importanceContainer.classList.add('tasks__tasks-importance-container');
    importanceContainer.setAttribute('id', 'normal-container');

    // Importance Title
    const importanceTitle = document.createElement('h2');
    importanceTitle.classList.add('tasks__tasks-importance-title');
    importanceTitle.innerText = 'Normal.';
    importanceContainer.appendChild(importanceTitle);

    // Individual Task Container
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('tasks__individual-task');

    // Input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'tarea';
    checkbox.id = 'example';
    checkbox.classList.add('tasks__individual-checkbox');
    taskContainer.appendChild(checkbox);

    // Label
    const label = document.createElement('label');
    label.htmlFor = 'example';
    label.classList.add('tasks__individual-checkbox-label');
    label.textContent = 'Example task';
    taskContainer.appendChild(label);

    // Paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = 'No due date';
    taskContainer.appendChild(paragraph);

    // SVG Icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('stroke-width', '1');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.id = 'example';

    // Add SVG paths
    const pathData = [
        { d: 'M4 7l16 0' },
        { d: 'M10 11l0 6' },
        { d: 'M14 11l0 6' },
        { d: 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' },
        { d: 'M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' }
    ];

    pathData.forEach(data => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', data.d);
        svg.appendChild(path);
    });

    taskContainer.appendChild(svg);
    importanceContainer.appendChild(taskContainer);
    bodyContainer.appendChild(importanceContainer);

    // Add body to wrapper
    wrapper.appendChild(bodyContainer);
    taskSection.appendChild(wrapper);
    
};

const createCategorieBtn = () => {
    const inputValue = capitalize(dialogInput.value);
    // empty input
    if (!inputValue) {
        alert('Please insert the categorie name first');
        return;
    }

    const currentCategorieBtn = Array.from(document.querySelectorAll('.categories__categories'));
    //check if the categorie wont be repeated
    const isCategorieRepeated  = currentCategorieBtn.some(cat => cat.innerText.toLowerCase() === inputValue.toLowerCase());
    if (isCategorieRepeated) {
        alert('This categorie already exits, please insert another one');
        return;
    }
    
    //create and insert categorie btn
    const newBtn = document.createElement('button');
    newBtn.classList.add('categories__categories');
    newBtn.innerText = inputValue;
    categorieBtnContainer.appendChild(newBtn);
    selectCategorieContainer = document.querySelectorAll('.categories__categories');    //update this declaration

    changeDialogDisplay();  //Close the dialog
    createCategoryDom(newBtn); //Create the DOM of the category

    // SEND THE INFO TO ADD SCRIPT
}

dialogCreateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createCategorieBtn();
})

dialogCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    changeDialogDisplay();
})