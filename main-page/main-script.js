const newTaskbtn = document.querySelectorAll('.add-task-btn');
const addSection = document.getElementById('add');
const mainSection = document.getElementById('main');

newTaskbtn.forEach(btn => {
    btn.addEventListener('click', () => {
        addSection.style.display = 'flex';
        mainSection.style.display = 'none';
    })
})
