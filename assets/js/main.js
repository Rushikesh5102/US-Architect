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
        const iconHTML = isDark
            ? '<svg id="themeIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
            : '<svg id="themeIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        themeToggle.innerHTML = iconHTML;
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
            { src: './assets/images/projects/3D Visualization_page_2.png', caption: 'Luxury premium corner villa with an expansive wrap-around garden and double-height entry.' },
            { src: './assets/images/projects/3D Visualization_page_3.png', caption: 'Contemporary bungalow leveraging natural stone facades to integrate seamlessly with the landscape.' },
            { src: './assets/images/projects/3D Visualization_page_5.png', caption: 'Urban row housing designed for high-density elegance while maximizing natural light.' },
            { src: './assets/images/projects/3D Visualization_page_6.png', caption: 'A striking elevated residential unit featuring automated sun-shading louvers.' }
        ]
    },
    {
        id: 'commercial',
        title: 'Commercial Complexes',
        description: 'Dynamic commercial buildings combining retail, office spaces, and high-visibility street presence.',
        coverImage: './assets/images/projects/3D Visualization_page_4.png',
        images: [
            { src: './assets/images/projects/3D Visualization_page_4.png', caption: 'Dynamic commercial building combining retail and café spaces with high-visibility street presence.' }
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
            { src: './assets/images/projects/Interior portfolio_page_8.png', caption: 'Spa-inspired primary bathroom swathed in premium marble with dual vanity luxury fixtures.' },
            { src: './assets/images/projects/1.png', caption: 'Premium interior visualization detailing elegant spatial arrangement.' },
            { src: './assets/images/projects/2.png', caption: 'Elegant architectural interior blending natural materials with modern forms.' },
            { src: './assets/images/projects/3.png', caption: 'Sophisticated interior layout focusing on lighting and material harmony.' },
            { src: './assets/images/projects/4.png', caption: 'Luxury bespoke interior visualization with integrated furnishings.' },
            { src: './assets/images/projects/5.png', caption: 'Modern room design showcasing refined finishes and textures.' },
            { src: './assets/images/projects/6.png', caption: 'Contemporary living space defined by natural light and structural minimalism.' }
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

// --- Contact Form Submission Logic ---
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (!form || !successMessage) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop default HTML GET submission and page reload
        
        const submitBtn = form.querySelector('.submit-button');
        const btnText = form.querySelector('.button-text');
        const btnLoading = form.querySelector('.button-loading');
        
        // Step 1: Form Validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        // Basic Regex patterns
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/; // Basic 10-digit validation
        
        form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        let isValid = true;
        
        if (!name) {
            document.getElementById('name-error').textContent = 'Name is required.';
            isValid = false;
        }
        if (!email || !emailPattern.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
        }
        if (!phone || !phonePattern.test(phone)) {
            document.getElementById('phone-error').textContent = 'Please enter a valid 10-digit phone number.';
            isValid = false;
        }
        if (!message) {
            document.getElementById('message-error').textContent = 'Message cannot be empty.';
            isValid = false;
        }
        
        if (!isValid) return; // Stop if validation fails
        
        // Step 2: UI Loading State
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        
        // Step 3: Prepare JSON Payload for Google Apps Script
        const payload = JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        });
        
        // --- GOOGLE APPS SCRIPT INTEGRATION ---
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzNgdB_o2zpPOK5DUsiZgAvI_Yc0PgN_KPqzzSHmlzokwPy1TdVRpgkOfLyS--OnpA2xA/exec';
        
        fetch(scriptURL, { 
            method: 'POST', 
            // text/plain avoids CORS preflight blocking on Google Scripts while allowing JSON parse backend
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: payload 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccess();
            } else {
                console.error('Google Script Error:', data.error);
                alert("Sorry, there was an issue sending your message. Please try again.");
                resetButton();
            }
        })
        .catch(error => {
            console.error('Fetch Error!', error.message);
            alert("Sorry, there was a network issue. Please try again.");
            resetButton();
        });
        
        function showSuccess() {
            form.style.display = 'none'; // Hide the entire form
            successMessage.style.display = 'block'; // Show Confirmation Pop Up
            
            resetButton();
            form.reset();
        }
        
        function resetButton() {
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        }
    });
}

// Attach listener cleanly
document.addEventListener('DOMContentLoaded', initializeContactForm);
