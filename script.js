document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.getElementById('nav-list');

    if (mobileToggle && navList) {
        // Toggle menu on hamburger click
        mobileToggle.addEventListener('click', function () {
            toggleMobileMenu();
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                // If it's the Services dropdown toggle, don't close immediately
                // We check if the parent li has the class 'dropdown' and the link is the toggle itself
                if (this.parentElement.classList.contains('dropdown') && this.getAttribute('href').includes('index.html#services')) {
                    // Allow default behavior or just return to keep open
                    // However, we want the dropdown to be usable. 
                    // In mobile hover doesn't always work well, so often click is needed.
                    // For now, we just don't close the menu.
                    return;
                }

                // For all other links (including dropdown sub-links), close the menu
                if (navList.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });

        function toggleMobileMenu() {
            navList.classList.toggle('active');

            // Toggle icon from bars to times (X)
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    // Hero Slider Placeholder functionality
    // Hero Slider Functionality
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const heroBg = document.querySelector('.hero-bg');
    const heroTitle = document.querySelector('.hero-overlay-box h2');
    const heroSubtitle = document.querySelector('.hero-overlay-box h3');

    const heroBtn = document.querySelector('.hero-content .cta-button');

    const heroSlides = [
        {
            image: 'assets/hero-bg-gray-kitchen.jpg',
            title: 'BUILDING INSPIRED SPACES',
            subtitle: 'EXPLORE OUR RECENT WORKS',
            link: 'kitchen.html',
            ctaText: 'LEARN MORE'
        },
        {
            image: 'assets/hero-bg-bathroom.png',
            title: 'CONTRACTORS WHO LISTEN & UNDERSTAND',
            subtitle: '',
            link: 'bathroom.html',
            ctaText: 'VIEW PROJECTS'
        }
    ];

    let currentSlideIndex = 0;

    function updateHeroContent() {
        const slide = heroSlides[currentSlideIndex];
        if (heroBg) {
            heroBg.style.backgroundImage = `url('${slide.image}')`;
        }
        if (heroTitle) {
            heroTitle.textContent = slide.title;
        }
        if (heroSubtitle) {
            heroSubtitle.textContent = slide.subtitle;
            // Optionally hide if empty to avoid spacing issues, though current CSS handles it okay
            heroSubtitle.style.display = slide.subtitle ? 'block' : 'none';
        }
        if (heroBtn) {
            heroBtn.href = slide.link;
            heroBtn.textContent = slide.ctaText;
        }
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', function () {
            currentSlideIndex--;
            if (currentSlideIndex < 0) {
                currentSlideIndex = heroSlides.length - 1;
            }
            updateHeroContent();
            resetHeroTimer();
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function () {
            currentSlideIndex++;
            if (currentSlideIndex >= heroSlides.length) {
                currentSlideIndex = 0;
            }
            updateHeroContent();
            resetHeroTimer();
        });
    }

    // Hero Auto Slider
    let heroInterval;

    function startHeroTimer() {
        heroInterval = setInterval(() => {
            currentSlideIndex++;
            if (currentSlideIndex >= heroSlides.length) {
                currentSlideIndex = 0;
            }
            updateHeroContent();
        }, 8000); // 8 seconds
    }

    function resetHeroTimer() {
        clearInterval(heroInterval);
        startHeroTimer();
    }

    // Start hero timer if hero exists
    if (heroBg) {
        startHeroTimer();
    }

    // REVIEW CAROUSEL FUNCTIONALITY
    const reviews = [
        {
            text: "Excellent people to work with. This is the second project Greater Dayton completed for us. From start to finish, everything went smoothly. We are very pleased.",
            author: "Kathy & Scott S."
        },
        {
            text: "We are absolutely thrilled with our new kitchen. The team was professional, clean, and finished on time. Highly recommend Apex Builders!",
            author: "Jennifer M."
        },
        {
            text: "The bathroom remodel exceeded our expectations. The attention to detail was fantastic. Will definitely use them again for our basement.",
            author: "David L."
        },
        {
            text: "Professional from start to finish. They handled all the permits and design work, making it stress-free for us. A+ service.",
            author: "Michael & Sarah"
        },
        {
            text: "Our outdoor living space is now the envy of the neighborhood. Great craftsmanship and communication throughout the project.",
            author: "Robert T."
        },
        {
            text: "Reliable, honest, and skilled. It's hard to find good contractors these days, but Apex Builders is the real deal.",
            author: "Emily R."
        }
    ];

    const reviewText = document.getElementById('review-text');
    const reviewAuthor = document.getElementById('review-author');
    const reviewDotsContainer = document.getElementById('review-dots');

    // Only proceed if elements exist
    if (reviewText && reviewAuthor && reviewDotsContainer) {
        let currentReviewIndex = 0;

        // Create Dots
        reviews.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentReviewIndex = index;
                updateReview();
                resetReviewTimer();
            });
            reviewDotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateReview() {
            // Reset classes
            reviewText.classList.remove('slide-in', 'slide-out');
            reviewAuthor.classList.remove('slide-in', 'slide-out');

            // Trigger reflow
            void reviewText.offsetWidth;

            // Slide Out
            reviewText.classList.add('slide-out');
            reviewAuthor.classList.add('slide-out');

            setTimeout(() => {
                reviewText.textContent = reviews[currentReviewIndex].text;
                reviewAuthor.textContent = reviews[currentReviewIndex].author;

                // Update dots
                dots.forEach((dot, index) => {
                    if (index === currentReviewIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                // Slide In
                reviewText.classList.remove('slide-out');
                reviewAuthor.classList.remove('slide-out');

                reviewText.classList.add('slide-in');
                reviewAuthor.classList.add('slide-in');
            }, 500); // Matches CSS animation time
        }

        let reviewInterval;

        function startReviewTimer() {
            reviewInterval = setInterval(() => {
                currentReviewIndex++;
                if (currentReviewIndex >= reviews.length) {
                    currentReviewIndex = 0;
                }
                updateReview();
            }, 8000); // 8 seconds
        }

        function resetReviewTimer() {
            clearInterval(reviewInterval);
            startReviewTimer();
        }

        // Start the timer
        startReviewTimer();
    }
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // In a real app, you would send this data to a server
            alert('Thank you! Your information has been received. We will contact you shortly.');
            contactForm.reset();
        });
    }
});
