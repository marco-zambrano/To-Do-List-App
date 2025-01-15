

// Función para cargar el contenido del diálogo
function loadDialog(file) {
    const dialog = document.getElementById('dialog-container');
    const dialogContent = document.getElementById('dialog-content');
    
    // Cargar el contenido HTML dinámicamente
    fetch(file)
    .then((response) => {
        if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${file}`);
        }
        return response.text();
    })
    .then((html) => {
        dialogContent.innerHTML = html; // Insertar el contenido en el diálogo
        dialog.showModal(); // Mostrar el diálogo
    })
    .catch((error) => {
        dialogContent.innerHTML = `<p style="color:red;">${error.message}</p>`;
        dialog.showModal();
    });
}



  // Abrir Dialog
document.getElementById('new-task').addEventListener('click', () => {
    loadDialog('../dialogs/add.html')
});
