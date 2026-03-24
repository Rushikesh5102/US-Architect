// Function to close menu on mobile when a link is clicked
function closeMenuOnLinkClick() {
    const defaultCheckbox = document.getElementById('check');
    const links = document.querySelectorAll('nav ul li a');

    if (defaultCheckbox) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                defaultCheckbox.checked = false;
            });
        });
    }
}

// Ensure execution happens after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    closeMenuOnLinkClick();

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        updateThemeIcon(storedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        updateThemeIcon(prefersDark);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme === 'dark');
        });
    }
    
    function updateThemeIcon(isDark) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Scroll Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-3d');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize the Category Gallery Reveal
    initializeCategoryGallery();
    
    // Initialize 3D Image interactions if available
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".about-image-wrapper"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            perspective: 1000,
            scale: 1.02
        });

        VanillaTilt.init(document.querySelectorAll(".hero-content"), {
            max: 3,
            speed: 500,
            scale: 1.05,
            perspective: 1000,
            glare: false
        });
    }
});

// --- Categorized Gallery Reveal Logic ---
const projectCategories = [
    {
        id: 'residential',
        title: 'Residential Architecture',
        description: 'Bespoke independent houses, premium villas, and modern living spaces designed for comfort and elegance.',
        coverImage: './assets/images/projects/3D Visualization_page_2.png',
        images: [
            { src: './assets/images/projects/3D Visualization_page_1.png', caption: 'A modern multi-story apartment featuring biophilic balconies and timber accents.' },
            { src: './assets/images/projects/3D Visualization_page_2.png', caption: 'Luxury premium corner villa with an expansive wrap-around garden and double-height entry.' },
            { src: './assets/images/projects/3D Visualization_page_3.png', caption: 'Contemporary bungalow leveraging natural stone facades to integrate seamlessly with the landscape.' },
            { src: './assets/images/projects/3D Visualization_page_4.png', caption: 'Minimalist twin-house architecture utilizing bold orthogonal concrete forms.' },
            { src: './assets/images/projects/3D Visualization_page_5.png', caption: 'Urban row housing designed for high-density elegance while maximizing natural light.' },
            { src: './assets/images/projects/3D Visualization_page_6.png', caption: 'A striking elevated residential unit featuring automated sun-shading louvers.' }
        ]
    },
    {
        id: 'commercial',
        title: 'Commercial Complexes',
        description: 'Dynamic commercial buildings combining retail, office spaces, and high-visibility street presence.',
        coverImage: './assets/images/projects/3D Visualization_page_7.png',
        images: [
            { src: './assets/images/projects/3D Visualization_page_7.png', caption: 'State-of-the-art corporate headquarters featuring an energy-efficient glass curtain wall.' },
            { src: './assets/images/projects/3D Visualization_page_8.png', caption: 'Mixed-use complex integrating premium retail storefronts on the ground floor with vibrant office suites above.' },
            { src: './assets/images/projects/3D Visualization_page_9.png', caption: 'A bustling multi-level shopping arcade designed to maximize foot traffic and brand visibility.' },
            { src: './assets/images/projects/3D Visualization_page_10.png', caption: 'Boutique architectural office building emphasizing brutalist aesthetics and exposed structural elements.' },
            { src: './assets/images/projects/3D Visualization_page_11.png', caption: 'Modern hospitality facade seamlessly blending guest privacy with expansive urban views.' }
        ]
    },
    {
        id: 'interior',
        title: 'Interior Design',
        description: 'Intricately planned interior spaces, emphasizing material palettes, custom lighting, and functional luxury.',
        coverImage: './assets/images/projects/Interior portfolio_page_1.png',
        images: [
            { src: './assets/images/projects/Interior portfolio_page_1.png', caption: 'A warm, inviting living space characterized by neutral tones, soft ambient lighting, and elegant bespoke minimalist furniture.' },
            { src: './assets/images/projects/Interior portfolio_page_2.png', caption: 'Luxury master bedroom featuring custom wood paneling and a seamless transition to the ensuite.' },
            { src: './assets/images/projects/Interior portfolio_page_3.png', caption: 'An ergonomic home office utilizing natural daylight and floating shelves to maximize spatial efficiency.' },
            { src: './assets/images/projects/Interior portfolio_page_4.png', caption: 'Sleek, modern kitchen with integrated premium appliances, matte black cabinetry, and a monolithic geometric island.' },
            { src: './assets/images/projects/Interior portfolio_page_5.png', caption: 'A tranquil dining area set beneath a statement chandelier, surrounded by biophilic interior accents.' },
            { src: './assets/images/projects/Interior portfolio_page_6.png', caption: 'High-end corporate boardroom designed for acoustic perfection, natural lighting, and executive comfort.' },
            { src: './assets/images/projects/Interior portfolio_page_7.png', caption: 'A boutique retail interior maximizing product display through strategic accent lighting and mirrored spatial surfaces.' },
            { src: './assets/images/projects/Interior portfolio_page_8.png', caption: 'Spa-inspired primary bathroom swathed in premium marble with dual vanity luxury fixtures.' }
        ]
    },
    {
        id: 'visualization',
        title: '3D Visualization',
        description: 'Photorealistic architectural renders, site planning, and spatial visualization for pre-construction clarity.',
        coverImage: './assets/images/projects/3D Visualization_page_12.png',
        images: [
            { src: './assets/images/projects/3D Visualization_page_12.png', caption: 'Photorealistic aerial perspective showcasing the relationship between the proposed structure and the surrounding urban grid.' },
            { src: './assets/images/projects/3D Visualization_page_13.png', caption: 'Detailed twilight render highlighting exterior landscape atmospheric lighting and interior depth.' },
            { src: './assets/images/projects/3D Visualization_page_14.png', caption: 'Close-up material study render emphasizing the texture of the exposed concrete and warm residential timber finishes.' },
            { src: './assets/images/projects/3D Visualization_page_15.png', caption: 'Dynamic "Golden Hour" visualization bringing the architectural massing and volumetric shadows to life before construction begins.' }
        ]
    }
];

function initializeCategoryGallery() {
    const categoryGrid = document.getElementById('category-grid');
    const categoryReveal = document.getElementById('category-reveal');
    const revealGallery = document.getElementById('reveal-gallery');
    const revealTitle = document.getElementById('reveal-title');
    const revealDescription = document.getElementById('reveal-description');
    const backBtn = document.getElementById('back-to-categories');
    
    // Lightbox Elements
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentLightboxImages = [];
    let currentImageIndex = 0;

    if (!categoryGrid || !categoryReveal) return;

    // 1. Render Category Cover Cards
    projectCategories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-image">
                <img src="${category.coverImage}" alt="${category.title}" loading="lazy">
                <div class="category-overlay">
                    <span class="view-text">View Gallery</span>
                </div>
            </div>
            <div class="category-info">
                <h3>${category.title}</h3>
            </div>
        `;
        
        card.addEventListener('click', () => openCategory(category));
        categoryGrid.appendChild(card);
    });

    // 2. Handle Reveal Navigation
    function openCategory(category) {
        // Populate Reveal Content
        if(revealTitle) revealTitle.textContent = category.title;
        if(revealDescription) revealDescription.textContent = category.description;
        
        // Populate Images Grid
        revealGallery.innerHTML = '';
        currentLightboxImages = category.images; // Set global array for lightbox to consume
        
        category.images.forEach((imgData, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal-item';
            
            // Add image and description caption
            item.innerHTML = `
                <img src="${imgData.src}" alt="${imgData.caption}" loading="lazy">
                <div class="reveal-item-caption">${imgData.caption}</div>
            `;
            
            // Attach lightbox click
            item.addEventListener('click', () => openLightbox(index));
            revealGallery.appendChild(item);
        });

        // Animate out category grid
        categoryGrid.classList.add('fade-out');
        setTimeout(() => {
            categoryGrid.style.display = 'none';
            categoryReveal.style.display = 'block';
            
            // Trigger reflow
            void categoryReveal.offsetWidth; 
            
            // Animate in reveal view
            categoryReveal.classList.add('active');
        }, 300); // 300ms CSS transition
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Animate out reveal view
            categoryReveal.classList.remove('active');
            setTimeout(() => {
                categoryReveal.style.display = 'none';
                categoryGrid.style.display = 'grid'; // CSS grid
                
                // Trigger reflow
                void categoryGrid.offsetWidth;
                
                // Animate in category grid
                categoryGrid.classList.remove('fade-out');
            }, 300);
        });
    }

    // --- 3. Lightbox Engine ---
    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
        if (currentLightboxImages.length === 0) return;
        
        // Loop bounds
        if (currentImageIndex < 0) currentImageIndex = currentLightboxImages.length - 1;
        else if (currentImageIndex >= currentLightboxImages.length) currentImageIndex = 0;
        
        const file = currentLightboxImages[currentImageIndex];
        lightboxImg.src = file.src;
        if (lightboxCaption) lightboxCaption.textContent = file.caption;
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 400);
        document.body.style.overflow = 'auto'; // allow page scroll
    }

    if (lightbox) {
        document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', e => { 
            if (e.target === lightbox) closeLightbox(); 
        });
        
        if (lightboxPrev) lightboxPrev.addEventListener('click', e => { 
            e.stopPropagation(); 
            currentImageIndex--; 
            updateLightboxImage(); 
        });
        
        if (lightboxNext) lightboxNext.addEventListener('click', e => { 
            e.stopPropagation(); 
            currentImageIndex++; 
            updateLightboxImage(); 
        });
        
        document.addEventListener('keydown', e => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                else if (e.key === 'ArrowLeft') { currentImageIndex--; updateLightboxImage(); }
                else if (e.key === 'ArrowRight') { currentImageIndex++; updateLightboxImage(); }
            }
        });
    }
}
