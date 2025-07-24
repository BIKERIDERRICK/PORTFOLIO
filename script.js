const links = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');

// Smooth scroll to section on link click
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });

    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Close navbar on link click in mobile view
    if (window.innerWidth <= 768) {
      navbar.classList.remove('active');
    }
  });
});

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Close navbar when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
    navbar.classList.remove('active');
  }
});

// Update active link based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  document.querySelectorAll('.section').forEach(section => {
    const sectionTop = section.offsetTop - 100; // Adjust for header height
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      const targetId = section.getAttribute('id');
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-target') === targetId);
      });
    }
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      alert('Message sent successfully!'); // Notify user
      contactForm.reset(); // Clear the form
    } else {
      alert('Failed to send message. Please try again.');
    }
  })
  .catch(error => {
    alert('An error occurred. Please try again later.');
    console.error('Error:', error);
  });
});

// Add fade-in animation for home content
document.addEventListener('DOMContentLoaded', () => {
  const homeContent = document.querySelector('.home-content');
  homeContent.style.opacity = '0';
  setTimeout(() => {
    homeContent.style.transition = 'opacity 1s';
    homeContent.style.opacity = '1';
  }, 100);
});