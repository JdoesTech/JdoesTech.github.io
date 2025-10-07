// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate sections on scroll
const sections = document.querySelectorAll('.fade-in');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Animate progress bars on scroll
const skillItems = document.querySelectorAll('.skill-item .progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('style').split('width: ')[1];
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    const width = item.style.width;
    item.style.width = '0%';
    item.setAttribute('data-width', width);
    skillObserver.observe(item);
});

// Contact form validation and submission simulation
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = '#ff0000';
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = 'Please enter a valid email.';
        formMessage.style.color = '#ff0000';
        return;
    }

    // Simulate submission
    formMessage.textContent = 'Message sent successfully! (Simulation)';
    formMessage.style.color = '#00ff00';
    form.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}