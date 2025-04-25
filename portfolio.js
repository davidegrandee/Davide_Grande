function renderPortfolio() {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        portfolioItems.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('portfolio-item');
            div.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank">View Details</a>
            `;
            portfolioContainer.appendChild(div);
        });
    } else {
        console.warn("Portfolio container not found.");
    }
}

document.addEventListener('DOMContentLoaded', renderPortfolio);