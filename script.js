// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}));

// Smooth Scrolling with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Navbar scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// Typewriter Effect - Updated for Dhanasri.K
function typeWriter(element, text, speed = 120) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Cursor blink effect
            let cursorVisible = true;
            const cursorBlink = setInterval(() => {
                element.style.borderRight = cursorVisible ? '2px solid #ec4899' : 'none';
                cursorVisible = !cursorVisible;
            }, 400);
            
            setTimeout(() => clearInterval(cursorBlink), 3000);
        }
    }
    type();
}

// Initialize typewriter on load - Dhanasri's name
window.addEventListener('load', () => {
    const typewriterEl = document.querySelector('.typewriter');
    setTimeout(() => typeWriter(typewriterEl, 'Dhanasri K'), 500);
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px) scale(0.98)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
    
    // Staggered animation for skill categories
    document.querySelectorAll('.skill-category').forEach((skill, index) => {
        skill.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Staggered animation for project cards
    document.querySelectorAll('.project-card').forEach((project, index) => {
        project.style.transitionDelay = `${index * 0.15}s`;
    });
});

// Enhanced Contact Form with validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple client-side validation
        const email = form.querySelector('input[type="email"]').value;
        const name = form.querySelector('input[placeholder="Your Name"]').value;
        const message = form.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#10b981';
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
            
            showNotification('Thank you! I\'ll get back to you soon.', 'success');
        }, 1500);
    });
    
    // Add focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s ease;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Enhanced CV Download - Updated for Dhanasri
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-download"></i> Preparing...';
            this.classList.add('downloading');
            
            // Simulate download preparation
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '#'; // Replace with your actual CV URL
                link.download = 'Dhanasri_K_FullStack_Developer_CV.pdf';
                link.target = '_blank';
                
                // Show download instructions
                showNotification(
                    '📥 CV download started! Check your Downloads folder.<br>Filename: Dhanasri_K_FullStack_Developer_CV.pdf', 
                    'success'
                );
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Reset button
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('downloading');
                    this.classList.add('success');
                    
                    setTimeout(() => {
                        this.classList.remove('success');
                    }, 1500);
                }, 2000);
            }, 800);
        });
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced scroll progress indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #4f46e5, #ec4899);
            z-index: 1001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled + '%';
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addScrollListener = debounce(() => {
    // All scroll-related functions here
}, 10);

// Remove body no-scroll class when swiping/scrolling on mobile
document.addEventListener('touchmove', () => {
    if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
    }
}, { passive: true });

// Preload critical resources
window.addEventListener('load', () => {
    // Lazy load images after hero loads
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => img.loading = 'eager');
});

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeFrame');
    const closeBtn = document.querySelector('.close-video');
    const demoButtons = document.querySelectorAll('.demo-btn');

    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const youtubeLink = button.getAttribute('data-youtube');
            iframe.src = youtubeLink + "?autoplay=1";
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = "";
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            iframe.src = "";
        }
    });

});
