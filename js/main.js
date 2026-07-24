// ==========================================
// DYNAMIC PORTFOLIO PROJECTS & SERVICES ENGINE
// ==========================================

let activeModalId = null;

document.addEventListener('DOMContentLoaded', () => {
    initProjectsSection();
    initProjectModal();
    initHistoryModalHandler();
});

// Handle Hardware Back Button / Browser Back Button on Mobile
function initHistoryModalHandler() {
    window.addEventListener('popstate', (e) => {
        if (activeModalId) {
            closeModalSilently(activeModalId);
        }
    });
}

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
        document.body.appendChild(modal);
    }

    let itemsHtml = '';
    category.items.forEach(item => {
        const isGitHub = item.link.includes('github.com');
        const btnText = isGitHub ? 'View Tool on GitHub <i class="fa-brands fa-github"></i>' : 'View Tool <i class="fa-solid fa-arrow-right"></i>';
        const isExternal = item.link.startsWith('http');
        const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        
        itemsHtml += `
            <div style="background: #111111; border: 1px solid #242424; padding: 18px; border-radius: 12px; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <i class="${item.icon}" style="color: var(--accent-primary, #FF4D00); font-size: 1.2rem;"></i>
                    <h4 style="font-size: 1.1rem; font-weight: 700; color: #FFFFFF; margin: 0;">${item.title}</h4>
                </div>
                <p style="font-size: 0.88rem; color: #9E9E9E; margin-bottom: 14px; line-height: 1.5;">${item.description}</p>
                <a href="${item.link}" ${targetAttr} style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-primary, #FF4D00); color: #FFFFFF; font-weight: 700; font-size: 0.85rem; padding: 8px 18px; border-radius: 999px; text-decoration: none;">
                    ${btnText}
                </a>
            </div>
        `;
    });

    modal.innerHTML = `
        <div class="modal-content-box">
            <button onclick="closeCategoryModal(true)" style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.08); border: none; color: #FFFFFF; width: 36px; height: 36px; border-radius: 50%; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;" aria-label="Close Modal">&times;</button>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <i class="${category.icon}" style="color: var(--accent-primary, #FF4D00); font-size: 1.5rem;"></i>
                <h3 style="font-size: 1.3rem; font-weight: 800; color: #FFFFFF; margin: 0;">${category.categoryTitle}</h3>
            </div>
            <p style="color: #9E9E9E; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.5;">${category.description}</p>
            <div>${itemsHtml}</div>
        </div>
    `;

    showModal('projectCategoryModal');
}

function closeCategoryModal(useHistory = true) {
    if (useHistory && activeModalId === 'projectCategoryModal') {
        history.back();
    } else {
        closeModalSilently('projectCategoryModal');
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
        document.body.appendChild(modal);
    }

    // Build How I Perform list
    let stepsHtml = '';
    service.howIPerform.forEach(item => {
        stepsHtml += `
            <div style="background: #121212; border-left: 3px solid var(--accent-primary, #FF4D00); border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
                <h5 style="color: var(--accent-primary, #FF4D00); font-weight: 700; font-size: 0.9rem; margin-bottom: 4px;">${item.step}</h5>
                <p style="color: #CCCCCC; font-size: 0.85rem; margin: 0; line-height: 1.5;">${item.desc}</p>
            </div>
        `;
    });

    // Build Requirements list
    let reqsHtml = '';
    service.requirements.forEach(req => {
        reqsHtml += `
            <li style="margin-bottom: 8px; font-size: 0.88rem; color: #DDDDDD; display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;">
                <i class="fa-solid fa-square-check" style="color: var(--accent-primary, #FF4D00); margin-top: 2px; font-size: 0.9rem; flex-shrink: 0;"></i>
                <span>${req}</span>
            </li>
        `;
    });

    // Build Deliverables list
    let delivHtml = '';
    service.deliverables.forEach(d => {
        delivHtml += `
            <li style="margin-bottom: 8px; font-size: 0.88rem; color: #DDDDDD; display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;">
                <i class="fa-solid fa-circle-check" style="color: #00E676; margin-top: 2px; font-size: 0.9rem; flex-shrink: 0;"></i>
                <span>${d}</span>
            </li>
        `;
    });

    // Tools badges
    let toolsHtml = '';
    service.tools.forEach(t => {
        toolsHtml += `<span style="background: rgba(255, 77, 0, 0.12); color: var(--accent-primary, #FF4D00); border: 1px solid rgba(255, 77, 0, 0.3); padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-right: 6px; margin-bottom: 6px;">${t}</span>`;
    });

    const contactHref = '#contact';

    modal.innerHTML = `
        <div class="modal-content-box">
            <button onclick="closeServiceDetailModal(true)" style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.08); border: none; color: #FFFFFF; width: 36px; height: 36px; border-radius: 50%; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;" aria-label="Close Modal">&times;</button>
            
            <!-- Header -->
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px; padding-right: 32px;">
                <div style="width: 48px; height: 48px; background: rgba(255, 77, 0, 0.15); color: var(--accent-primary, #FF4D00); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;">
                    <i class="${service.icon}"></i>
                </div>
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: #FFFFFF; margin: 0; line-height: 1.3;">${service.title}</h3>
                    <p style="color: #9E9E9E; font-size: 0.82rem; margin-top: 2px; margin-bottom: 0;">Scope &amp; Methodology Specifications</p>
                </div>
            </div>

            <p style="color: #DDDDDD; font-size: 0.9rem; line-height: 1.55; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #282828;">${service.summary}</p>

            <!-- Section 1: How I Perform -->
            <div style="margin-bottom: 20px;">
                <h4 style="color: #FFFFFF; font-size: 1rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-gears" style="color: var(--accent-primary, #FF4D00);"></i> How I Perform
                </h4>
                <div>${stepsHtml}</div>
            </div>

            <!-- Section 2: Requirements -->
            <div style="margin-bottom: 20px; background: #121212; padding: 14px 16px; border-radius: 12px; border: 1px solid #282828;">
                <h4 style="color: #FFFFFF; font-size: 0.98rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-list-check" style="color: var(--accent-primary, #FF4D00);"></i> Prerequisites &amp; Requirements
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0;">${reqsHtml}</ul>
            </div>

            <!-- Section 3: Deliverables -->
            <div style="margin-bottom: 20px; background: #121212; padding: 14px 16px; border-radius: 12px; border: 1px solid #282828;">
                <h4 style="color: #FFFFFF; font-size: 0.98rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-box-open" style="color: #00E676;"></i> Deliverables Provided
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0;">${delivHtml}</ul>
            </div>

            <!-- Section 4: Tools -->
            <div style="margin-bottom: 22px;">
                <h4 style="color: #FFFFFF; font-size: 0.88rem; font-weight: 700; margin-bottom: 8px;">Tools &amp; Frameworks Utilized:</h4>
                <div>${toolsHtml}</div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; border-top: 1px solid #282828; padding-top: 16px;">
                <a href="${contactHref}" onclick="closeServiceDetailModal(true)" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: var(--accent-primary, #FF4D00); color: #FFFFFF; font-weight: 800; font-size: 0.9rem; padding: 12px 24px; border-radius: 999px; text-decoration: none; width: 100%; max-width: 320px;">
                    Request Service / Contact Me <i class="fa-solid fa-paper-plane"></i>
                </a>
            </div>
        </div>
    `;

    showModal('serviceDetailModal');
}

function closeServiceDetailModal(useHistory = true) {
    if (useHistory && activeModalId === 'serviceDetailModal') {
        history.back();
    } else {
        closeModalSilently('serviceDetailModal');
    }
}

// Helper: Show Modal & Handle History State
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    activeModalId = modalId;
    history.pushState({ modalId: modalId }, '');

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';
    document.body.style.overflow = 'hidden';

    modal.onclick = (e) => {
        if (e.target === modal) {
            if (modalId === 'serviceDetailModal') closeServiceDetailModal(true);
            else if (modalId === 'projectCategoryModal') closeCategoryModal(true);
        }
    };
}

// Helper: Close Modal without history.back recursion
function closeModalSilently(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
    }
    document.body.style.overflow = '';
    if (activeModalId === modalId) {
        activeModalId = null;
    }
}
