// Toggle project sections
function toggleContent(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.arrow');

    if (content && arrow) {
        content.classList.toggle('hidden');
        arrow.textContent = content.classList.contains('hidden') ? '▼' : '▲';
    } else {
        console.error(`Element with ID "${id}" or arrow not found.`);
    }
}