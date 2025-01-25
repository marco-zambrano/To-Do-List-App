import 'https://unpkg.com/cally';
// Create an export function that executes this script in the main page
export function initializateAddScript() {
    const cancelBtn = document.getElementById('cancel-btn');
    const mainSection = document.getElementById('main');
    const addSection = document.getElementById('add');

    cancelBtn.addEventListener('click', () => {
        mainSection.style.display = 'flex';
        addSection.innerHTML = '';
    });
    
    // Fater atributes to apply style to its respective children
    const buttonsFather = document.querySelector('#relative-for-btns');
    const atributesFather = document.querySelector('.add__atributes-container');
    //calendar svg
    const calendarSvg = document.getElementById('calendar-svg');  
    const calendarContainer = document.getElementById('add__atribute__calendar');  
    //categories svg
    const categoriesContainer = document.getElementById('categories-svg');  //svg
    const addSelect = document.querySelector('select[name="add__categorie__selector"]');  //select  
    
    calendarSvg.addEventListener('click', () => {
        calendarSvg.classList.toggle('svg-clicked');
        if (categoriesContainer.classList.contains('svg-clicked')) categoriesContainer.classList.toggle('svg-clicked');
        // switch calendar container display
        calendarContainer.style.display = window.getComputedStyle(calendarContainer).display === 'none' ? 'block' : 'none';
        //gives its children the active propieties
        atributesFather.classList.toggle('active');
        buttonsFather.classList.toggle('active');
    })
    
    categoriesContainer.addEventListener('click', () => {  
        categoriesContainer.classList.toggle('svg-clicked');
        // desactivate calendar svg and hide the calendar
        if (calendarSvg.classList.contains('svg-clicked')) {
            calendarSvg.classList.toggle('svg-clicked');
            atributesFather.classList.toggle('active');
            buttonsFather.classList.toggle('active');
            calendarContainer.style.display = 'none';
        }
        addSelect.focus();  //focus select
    })
    // In case select get or loses focus
    addSelect.addEventListener('blur', () => {
        if (categoriesContainer.classList.contains('svg-clicked')) {
            categoriesContainer.classList.toggle('svg-clicked');
        }
    })
    addSelect.addEventListener('focus', () => {
        if (!categoriesContainer.classList.contains('svg-clicked')) {
            categoriesContainer.classList.toggle('svg-clicked');
        }
    })
}


export const getData = new Promise((resolve, reject) => {
    const logic = () => {
        const addTaskbtn = document.getElementById('add-task-btn'); // add task button
        const taskTextArea = document.getElementById('add__task-textarea'); //Text Area
        const importanceRadio = document.querySelectorAll('input[name="priority"]');
        const calendar = document.getElementById('calendar'); //calendar
        const addSelect = document.querySelector('select[name="add__categorie__selector"]');  //select  
        
        let data = {};  // here we'll save all the information
    
        if (!addTaskbtn) {
            console.error('addTaskbtn no encontrado');
            return;
        }
    
        addTaskbtn.addEventListener('click', () => {
            //verifications
            if (!taskTextArea.value) {
                alert('Please enter a task');
                return;
            }
            if (addSelect.value === 'Select a category') {
                alert('Please select a category');
                return;
            }
            //get the radio checked
            importanceRadio.forEach(radio => {
                if (radio.checked) {
                    data['importance'] = radio.id;
                }
            });
            data['task'] = taskTextArea.value;
            data['dueDate'] = calendar.value;
            data['categorie'] = addSelect.value;
    
            // export the data
            resolve(data);
        });
    }
    
    //In case the DOM is loading 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', logic)
    } else {
        logic();
    }
});