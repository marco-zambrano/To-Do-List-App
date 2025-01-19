import 'https://unpkg.com/cally';
// Create an export function that executes this script in the main page
export function initializateAddScript() {
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        mainSection.style.display = 'flex';
        addSection.innerHTML = '';
    });    
}

const calendarSvg = document.getElementById('calendar-svg');  
const calendarContainer = document.getElementById('add__atribute__calendar');  
// Fater atributes to apply style to its respective children
const buttonsFather = document.querySelector('#relative-for-btns');
const atributesFather = document.querySelector('.add__atributes-container');

calendarSvg.addEventListener('click', () => {
    // switch calendar container display
    if (window.getComputedStyle(calendarContainer).display === 'none') {
        calendarContainer.style.display = 'block';
    } else {
        calendarContainer.style.display = 'none';
    }
    //gives its children the active propieties
    atributesFather.classList.toggle('active');
    buttonsFather.classList.toggle('active');
})


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