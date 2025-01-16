// Create an export function 
export function initializateAddScript() {
    const cancelBtn = document.getElementById('cancel-btn');
    
    cancelBtn.addEventListener('click', () => {
        console.log('cancel works');
        mainSection.style.display = 'flex';
        addSection.innerHTML = '';
    });
    
    console.log(cancelBtn);
}