import 'https://unpkg.com/cally';
// Create an export function that executes this script in the main page
export function initializateAddScript() {
    const cancelBtn = document.getElementById('cancel-btn');
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
            calendarContainer.style.display = 'none';
        }

        addSelect.focus();

    })

}










// const taskTextArea = document.getElementById('add__task-textarea'); //Text Area
// const addTaskbtn = document.getElementById('add-task-btn'); // add task button
// const importanceRadio = document.querySelectorAll('input[name="priority"]');

// addTaskbtn.addEventListener('click', () => {
//     console.log('add a task working');

//     let taskContent = null;
//     let importance = null;

//     if (taskTextArea.value) {
//         taskContent = taskTextArea.value;
//     } else {
//         alert('ingrese algo papito lindo');
//     }

//     importanceRadio.forEach(radio => {
//         if (radio.checked) {
//             importance = radio.id;
//         }
//     })

//     const task = {taskContent, importance};

//     localStorage.setItem('taskObj', JSON.stringify(task));
// })