// Highlight active nav link on scroll and smooth scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');
  
    function changeActiveLink() {
      let index = sections.length;
  
      while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
  
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  
    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
  
    // Smooth scroll for nav links
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href').substring(1);
        const target = document.getElementById(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Animate sections on scroll
    const observerOptions = {
      threshold: 0.2,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  });
  
  document.querySelectorAll('.show-more-btn').forEach(button => {
      button.addEventListener('click', () => {
        const controlsId = button.getAttribute('aria-controls');
        const content = document.getElementById(controlsId);
    
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
    
        if (isExpanded) {
          content.classList.add('hidden');
          button.textContent = '▼ Show More';
        } else {
          content.classList.remove('hidden');
          button.textContent = '▲ Show Less';
        }
      });
    });