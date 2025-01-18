import 'https://unpkg.com/cally';
const calendarContainer = document.getElementById('calendar');




// Create an export function that executes this script in the main page
export function initializateAddScript() {
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        mainSection.style.display = 'flex';
        addSection.innerHTML = '';
    });    
}




const taskTextArea = document.getElementById('add__task-textarea'); //Text Area
const addTaskbtn = document.getElementById('add-task-btn'); // add task button
const importanceRadio = document.querySelectorAll('input[name="priority"]');

addTaskbtn.addEventListener('click', () => {
    console.log(calendarContainer.value);
    


    // let taskContent = null;
    // let importance = null;

    // if (taskTextArea.value) {
    //     taskContent = taskTextArea.value;
    // } else {
    //     alert('ingrese algo papito lindo');
    // }

    // importanceRadio.forEach(radio => {
    //     if (radio.checked) {
    //         importance = radio.id;
    //     }
    // })

    // const task = {taskContent, importance};

    // localStorage.setItem('taskObj', JSON.stringify(task));
})