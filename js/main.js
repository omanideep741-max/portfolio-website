// ==========================================
// DYNAMIC PORTFOLIO PROJECTS & SERVICES ENGINE
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

    if (category.items.length === 1 && category.items[0].link) {
        const url = category.items[0].link;
        if (url.startsWith('http')) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = url;
        }
    } else {
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

// ==========================================
// INTERACTIVE SERVICES DETAIL MODAL ENGINE
// ==========================================

function openServiceDetailModal(serviceKey) {
    if (typeof servicesData === 'undefined') {
        console.error("servicesData is missing. Ensure servicesData.js is loaded.");
        return;
    }

    const service = servicesData[serviceKey];
    if (!service) return;

    let modal = document.getElementById('serviceDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'serviceDetailModal';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px);
            z-index: 2500; display: flex; align-items: center; justify-content: center; padding: 20px;
            opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        `;
        document.body.appendChild(modal);
    }

    // Build How I Perform list
    let stepsHtml = '';
    service.howIPerform.forEach(item => {
        stepsHtml += `
            <div style="background: #121212; border-left: 3px solid var(--accent-primary, #FF4D00); border-radius: 8px; padding: 14px 18px; margin-bottom: 12px;">
                <h5 style="color: var(--accent-primary, #FF4D00); font-weight: 700; font-size: 0.95rem; margin-bottom: 4px;">${item.step}</h5>
                <p style="color: #CCCCCC; font-size: 0.88rem; margin: 0; line-height: 1.5;">${item.desc}</p>
            </div>
        `;
    });

    // Build Requirements list
    let reqsHtml = '';
    service.requirements.forEach(req => {
        reqsHtml += `
            <li style="margin-bottom: 8px; font-size: 0.9rem; color: #DDDDDD; display: flex; align-items: flex-start; gap: 10px;">
                <i class="fa-solid fa-square-check" style="color: var(--accent-primary, #FF4D00); margin-top: 3px; font-size: 0.95rem;"></i>
                <span>${req}</span>
            </li>
        `;
    });

    // Build Deliverables list
    let delivHtml = '';
    service.deliverables.forEach(d => {
        delivHtml += `
            <li style="margin-bottom: 8px; font-size: 0.9rem; color: #DDDDDD; display: flex; align-items: flex-start; gap: 10px;">
                <i class="fa-solid fa-circle-check" style="color: #00E676; margin-top: 3px; font-size: 0.95rem;"></i>
                <span>${d}</span>
            </li>
        `;
    });

    // Tools badges
    let toolsHtml = '';
    service.tools.forEach(t => {
        toolsHtml += `<span style="background: rgba(255, 77, 0, 0.12); color: var(--accent-primary, #FF4D00); border: 1px solid rgba(255, 77, 0, 0.3); padding: 4px 12px; border-radius: 999px; font-size: 0.78rem; font-weight: 600; display: inline-block; margin-right: 6px; margin-bottom: 6px;">${t}</span>`;
    });

    const isServicesPage = window.location.pathname.includes('services.html');
    const contactHref = isServicesPage ? 'index.html#contact' : '#contact';

    modal.innerHTML = `
        <div style="background: #181818; border: 1px solid var(--accent-primary, #FF4D00); max-width: 680px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 32px; border-radius: 20px; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.9);">
            <button onclick="closeServiceDetailModal()" style="position: absolute; top: 16px; right: 20px; background: rgba(255,255,255,0.08); border: none; color: #FFFFFF; width: 36px; height: 36px; border-radius: 50%; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center;" aria-label="Close Modal">&times;</button>
            
            <!-- Header -->
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <div style="width: 52px; height: 52px; background: rgba(255, 77, 0, 0.15); color: var(--accent-primary, #FF4D00); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0;">
                    <i class="${service.icon}"></i>
                </div>
                <div>
                    <h3 style="font-size: 1.4rem; font-weight: 800; color: #FFFFFF; margin: 0;">${service.title}</h3>
                    <p style="color: #9E9E9E; font-size: 0.88rem; margin-top: 4px; margin-bottom: 0;">Service Specifications &amp; Scope</p>
                </div>
            </div>

            <p style="color: #DDDDDD; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #282828;">${service.summary}</p>

            <!-- Section 1: How I Perform -->
            <div style="margin-bottom: 24px;">
                <h4 style="color: #FFFFFF; font-size: 1.1rem; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
                    <i class="fa-solid fa-gears" style="color: var(--accent-primary, #FF4D00);"></i> How I Perform
                </h4>
                <div>${stepsHtml}</div>
            </div>

            <!-- Section 2: Requirements -->
            <div style="margin-bottom: 24px; background: #121212; padding: 18px 20px; border-radius: 12px; border: 1px solid #282828;">
                <h4 style="color: #FFFFFF; font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="fa-solid fa-list-check" style="color: var(--accent-primary, #FF4D00);"></i> Prerequisites &amp; Requirements
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0;">${reqsHtml}</ul>
            </div>

            <!-- Section 3: Deliverables -->
            <div style="margin-bottom: 24px; background: #121212; padding: 18px 20px; border-radius: 12px; border: 1px solid #282828;">
                <h4 style="color: #FFFFFF; font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="fa-solid fa-box-open" style="color: #00E676;"></i> Deliverables Provided
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0;">${delivHtml}</ul>
            </div>

            <!-- Section 4: Tools -->
            <div style="margin-bottom: 28px;">
                <h4 style="color: #FFFFFF; font-size: 0.95rem; font-weight: 700; margin-bottom: 10px;">Tools &amp; Frameworks Utilized:</h4>
                <div>${toolsHtml}</div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; border-top: 1px solid #282828; padding-top: 20px;">
                <a href="${contactHref}" onclick="closeServiceDetailModal()" style="display: inline-flex; align-items: center; gap: 10px; background: var(--accent-primary, #FF4D00); color: #FFFFFF; font-weight: 800; font-size: 0.95rem; padding: 12px 28px; border-radius: 999px; text-decoration: none;">
                    Request Service / Contact Me <i class="fa-solid fa-paper-plane"></i>
                </a>
            </div>
        </div>
    `;

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';

    modal.onclick = (e) => {
        if (e.target === modal) closeServiceDetailModal();
    };
}

function closeServiceDetailModal() {
    const modal = document.getElementById('serviceDetailModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
    }
}
