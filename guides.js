document.addEventListener('DOMContentLoaded', () => {
    const navEl = document.getElementById('guide-nav');
    const contentEl = document.getElementById('guide-content-wrapper');
    const headerEl = document.getElementById('guide-header').querySelector('h2');
    let guides = [];

    /**
     * Fetches the content for a specific guide, displays it, and executes its scripts.
     * When new HTML content is loaded, any <script> tags within it are not automatically
     * executed by the browser. This function finds, recreates, and replaces the script
     * tags to ensure their code runs, which is essential for initializing the
     * interactive elements of each guide. It then calls the guide-specific
     * initialization function (e.g., `window.init_connect_workbook`).
     * @param {object} guide - The guide object, containing its id, title, and file path.
     */
    async function loadGuideContent(guide) {
        try {
            const response = await fetch(guide.file);
            if (!response.ok) {
                throw new Error(`Failed to fetch guide: ${response.statusText}`);
            }
            const content = await response.text();
            contentEl.innerHTML = content;
            headerEl.textContent = guide.title;
            
            // Re-run any scripts within the loaded content to define the init functions
            const scripts = contentEl.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Now, run the guide's specific initialization script
            const initFunctionName = `init_${guide.id.replace(/-/g, '_')}`;
            if (typeof window[initFunctionName] === 'function') {
                window[initFunctionName]();
            }

        } catch (error) {
            console.error('Error loading guide:', error);
            contentEl.innerHTML = `<div class="text-center text-red-500">Could not load guide content.</div>`;
        }
    }
    
    /**
     * Updates the URL hash, styles the active link in the navigation, and triggers the loading of the selected guide.
     * @param {string} guideId - The unique identifier of the guide to activate.
     */
    function setActiveGuide(guideId) {
        window.location.hash = guideId;
        document.querySelectorAll('#guide-nav a').forEach(a => {
            if (a.getAttribute('href') === `#${guideId}`) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });

        const selectedGuide = guides.find(g => g.id === guideId);
        if (selectedGuide) {
            loadGuideContent(selectedGuide);
        }
    }

    /**
     * Main initialization function for the guide library.
     * It fetches the list of available guides from `guides.json`, populates the
     * navigation menu, and loads the initial guide based on the URL hash or defaults to the first guide.
     */
    async function init() {
        try {
            const response = await fetch('guides.jsonc');
            guides = await response.json();
            
            navEl.innerHTML = ''; 
            guides.forEach(guide => {
                const link = document.createElement('a');
                link.href = `#${guide.id}`;
                link.className = 'block px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100';
                link.innerHTML = `
                    <span class="font-semibold block">${guide.title}</span>
                `;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    setActiveGuide(guide.id);
                });
                navEl.appendChild(link);
            });

            // Load guide from hash or default to the first one
            const currentHash = window.location.hash.substring(1);
            const guideToLoad = guides.find(g => g.id === currentHash) || guides[0];
            if (guideToLoad) {
                setActiveGuide(guideToLoad.id);
            }

        } catch (error) {
            console.error('Failed to initialize guide library:', error);
            navEl.innerHTML = '<div class="p-4 text-sm text-red-500">Failed to load guides manifest.</div>';
        }
    }

    init();
});

