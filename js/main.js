// ==========================================
// DYNAMIC PORTFOLIO PROJECTS ENGINE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initProjectsSection();
    initProjectModal();
});

function initProjectsSection() {
    const categoriesContainer = document.getElementById('dynamic-category-cards');
    
    if (typeof projectsData === 'undefined') {
        console.error("projectsData is not defined. Ensure projectsData.js is loaded before main.js");
        return;
    }

    if (!categoriesContainer) return;

    let cardsHtml = '';

    // Render the 3 category cards with direct tap/click handlers
    for (const catKey in projectsData) {
        const cat = projectsData[catKey];
        
        cardsHtml += `
            <div class="service-card project-block-card" onclick="handleCategoryTap('${catKey}')" style="background: var(--bg-card); border: 1px solid var(--border-color, #242424); border-radius: 16px; padding: 32px 28px; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; height: 100%;">
                <div style="width: 56px; height: 56px; background: rgba(255, 77, 0, 0.12); color: var(--accent-primary, #FF4D00); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 20px;">
                    <i class="${cat.icon}"></i>
                </div>
                <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 10px; color: var(--text-main, #FFFFFF);">${cat.categoryTitle}</h3>
                <p style="font-size: 0.95rem; color: var(--text-muted, #9E9E9E); margin-bottom: 0;">${cat.description}</p>
            </div>
        `;
    }

    categoriesContainer.innerHTML = cardsHtml;
}

// Handle tapping a category box
function handleCategoryTap(catKey) {
    const category = projectsData[catKey];
    if (!category || !category.items || category.items.length === 0) return;

    // If category has 1 primary GitHub tool, open it directly in a new tab
    if (category.items.length === 1 && category.items[0].link) {
        const url = category.items[0].link;
        if (url.startsWith('http')) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = url;
        }
    } else {
        // If category has multiple tools, open the modal popup
        openCategoryModal(catKey);
    }
}

// Open modal showing all tools for the selected category
function openCategoryModal(catKey) {
    const category = projectsData[catKey];
    if (!category) return;

    let modal = document.getElementById('projectCategoryModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'projectCategoryModal';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
            z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 24px;
            opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        `;
        document.body.appendChild(modal);
    }

    let itemsHtml = '';
    category.items.forEach(item => {
        const isGitHub = item.link.includes('github.com');
        const btnText = isGitHub ? 'View Tool on GitHub <i class="fa-brands fa-github"></i>' : 'View Tool <i class="fa-solid fa-arrow-right"></i>';
        const isExternal = item.link.startsWith('http');
        const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        
        itemsHtml += `
            <div style="background: #111111; border: 1px solid #242424; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <i class="${item.icon}" style="color: var(--accent-primary, #FF4D00); font-size: 1.2rem;"></i>
                    <h4 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF;">${item.title}</h4>
                </div>
                <p style="font-size: 0.9rem; color: #9E9E9E; margin-bottom: 16px;">${item.description}</p>
                <a href="${item.link}" ${targetAttr} style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-primary, #FF4D00); color: #FFFFFF; font-weight: 700; font-size: 0.85rem; padding: 8px 18px; border-radius: 999px; text-decoration: none;">
                    ${btnText}
                </a>
            </div>
        `;
    });

    modal.innerHTML = `
        <div style="background: #161616; border: 1px solid var(--accent-primary, #FF4D00); max-width: 580px; width: 100%; padding: 36px; border-radius: 16px; position: relative;">
            <button onclick="closeCategoryModal()" style="position: absolute; top: 16px; right: 20px; background: none; border: none; color: #9E9E9E; font-size: 1.8rem; cursor: pointer;">&times;</button>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <i class="${category.icon}" style="color: var(--accent-primary, #FF4D00); font-size: 1.5rem;"></i>
                <h3 style="font-size: 1.4rem; font-weight: 800; color: #FFFFFF;">${category.categoryTitle}</h3>
            </div>
            <p style="color: #9E9E9E; font-size: 0.95rem; margin-bottom: 24px;">${category.description}</p>
            <div>${itemsHtml}</div>
        </div>
    `;

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';

    modal.onclick = (e) => {
        if (e.target === modal) closeCategoryModal();
    };
}

function closeCategoryModal() {
    const modal = document.getElementById('projectCategoryModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
    }
}

function initProjectModal() {}
