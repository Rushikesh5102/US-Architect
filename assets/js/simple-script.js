// US Architects - Core Logic & Interactive Enhancements
document.addEventListener('DOMContentLoaded', function () {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const updateIcon = (isDark) => {
        if (!themeIcon) return;
        if (isDark) { // Sun icon for switching back to light
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else { // Moon icon for switching to dark
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    };

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme === 'dark');
    } else {
        updateIcon(systemPrefersDark);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                (!document.documentElement.hasAttribute('data-theme') && systemPrefersDark);

            const newTheme = isCurrentlyDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme === 'dark');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- Hero Parallax Effect ---
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');

    if (heroBg && hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            window.requestAnimationFrame(() => {
                heroBg.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            window.requestAnimationFrame(() => {
                heroBg.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
        });
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const submitButton = contactForm.querySelector('.submit-button');
            const buttonText = submitButton.querySelector('.button-text');
            const buttonLoading = submitButton.querySelector('.button-loading');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) return;

            // Show loading state
            if (buttonText) buttonText.style.display = 'none';
            if (buttonLoading) buttonLoading.style.display = 'inline-block';
            submitButton.disabled = true;

            const scriptURL = "https://formsubmit.co/ajax/ar.uttara52a@gmail.com";

            fetch(scriptURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `New Lead: ${name} via US Architects Website`,
                    _template: "table"
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        contactForm.style.display = 'none';
                        if (formSuccess) {
                            formSuccess.style.display = 'block';
                            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        throw new Error("Submission failed");
                    }
                })
                .catch(err => {
                    console.error("Form error:", err);
                    alert("Sorry, there was an error sending your message. Please try again or call us directly.");
                })
                .finally(() => {
                    if (buttonText) buttonText.style.display = 'inline-block';
                    if (buttonLoading) buttonLoading.style.display = 'none';
                    submitButton.disabled = false;
                });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- 3D Scroll Animations ---
    const scrollObserverOptions = {
        threshold: 0.15
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    document.querySelectorAll('.animate-3d').forEach(el => scrollObserver.observe(el));

    // --- Seamless Gallery Initialization ---
    initializeSeamlessGallery();

    // --- 3D Tilt Initialization ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".about-intro, .about-philosophy, .about-vision, .contact-form-container"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
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

function initializeSeamlessGallery() {
    setupTrack('gallery-track-interior', 18, 'Interior portfolio_page_', 'Interior Design');
    setupTrack('gallery-track-visualization', 15, '3D Visualization_page_', '3D Visualization');

    function setupTrack(trackId, pageCount, prefix, altPrefix) {
        const track = document.getElementById(trackId);
        if (!track) return;
        const container = track.closest('.gallery-container');
        if (!container) return;

        let initialHTML = '';
        for (let i = 1; i <= pageCount; i++) {
            initialHTML += `
                <div class="gallery-item">
                    <img src="./assets/images/projects/${prefix}${i}.png" alt="${altPrefix} ${i}" loading="lazy">
                </div>
            `;
        }
        track.innerHTML = initialHTML;

        // Clone for infinite scroll
        const originalItems = Array.from(track.querySelectorAll('.gallery-item'));
        originalItems.forEach(item => {
            track.insertBefore(item.cloneNode(true), track.firstChild);
            track.appendChild(item.cloneNode(true));
        });

        const allItems = Array.from(track.querySelectorAll('.gallery-item'));
        const itemWidth = 220; // Adjusted for better control
        const totalOriginalWidth = pageCount * itemWidth;
        container.scrollLeft = totalOriginalWidth;

        let isPaused = false;
        let isDown = false;
        let startX, scrollLeft;
        const autoScrollSpeed = 0.5;

        function updateGallery() {
            if (!isPaused && !isDown) {
                container.scrollLeft += autoScrollSpeed;
            }

            if (container.scrollLeft <= 0) {
                container.scrollLeft = totalOriginalWidth;
            } else if (container.scrollLeft >= totalOriginalWidth * 2) {
                container.scrollLeft = totalOriginalWidth;
            }

            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            allItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(itemCenter - containerCenter);
                let scale = 1 - (distance / (containerRect.width / 1.5)) * 0.15;
                item.style.transform = `scale(${Math.max(0.85, Math.min(1, scale))})`;
            });
            requestAnimationFrame(updateGallery);
        }
        requestAnimationFrame(updateGallery);

        container.addEventListener('mouseenter', () => isPaused = true);
        container.addEventListener('mouseleave', () => isPaused = false);
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        window.addEventListener('mouseup', () => isDown = false);
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        // Lightbox
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');

        allItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (lightboxImg && lightbox) {
                    lightboxImg.src = img.src;
                    if (lightboxCaption) lightboxCaption.textContent = img.alt;
                    lightbox.style.display = 'flex';
                    setTimeout(() => lightbox.classList.add('active'), 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 400);
            document.body.style.overflow = 'auto';
        };
        document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
}
