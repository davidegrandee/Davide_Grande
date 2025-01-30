function toggleSection(id, arrowId) {
    var section = document.getElementById(id);
    var arrow = document.getElementById(arrowId);
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        arrow.textContent = '▲';
    } else {
        section.classList.add('hidden');
        arrow.textContent = '▼';
    }
}