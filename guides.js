document.addEventListener('DOMContentLoaded', () => {
    const navEl = document.getElementById('guide-nav');
    const contentEl = document.getElementById('guide-content-wrapper');
    const headerEl = document.getElementById('guide-header').querySelector('h2');
    let guides = [];

    // Fetches the content for a specific guide and displays it
    async function loadGuideContent(guide) {
        try {
            const response = await fetch(guide.file);
            if (!response.ok) {
                throw new Error(`Failed to fetch guide: ${response.statusText}`);
            }
            const content = await response.text();
            contentEl.innerHTML = content;
            headerEl.textContent = guide.title;
            
            // Re-run any scripts within the loaded content
            const scripts = contentEl.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

        } catch (error) {
            console.error('Error loading guide:', error);
            contentEl.innerHTML = `<div class="text-center text-red-500">Could not load guide content.</div>`;
        }
    }
    
    // Updates the URL hash and active link in the navigation
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

    // Main function to initialize the library
    async function init() {
        try {
            const response = await fetch('guides.json');
            guides = await response.json();
            
            navEl.innerHTML = ''; 
            guides.forEach(guide => {
                const link = document.createElement('a');
                link.href = `#${guide.id}`;
                link.className = 'block px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100';
                link.innerHTML = `
                    <span class="font-semibold block">${guide.title}</span>
                    <span class="text-xs text-gray-500">${guide.description}</span>
                `;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    setActiveGuide(guide.id);
                });
                navEl.appendChild(link);
            });

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

