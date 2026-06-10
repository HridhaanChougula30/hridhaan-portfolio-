document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     DYNAMIC HEADER CLOCK (IST)
     ========================================================================== */
  const osIndicator = document.querySelector('.os-indicator');
  if (osIndicator) {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const timeString = formatter.format(new Date());
      osIndicator.textContent = `SYS: 2.6.10 // ${timeString} IST`;
    };
    
    // Initial call and set interval
    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ==========================================================================
     CLIPBOARD COPY FUNCTIONALITY
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Add check icon and message
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    
    // Append to container
    toastContainer.appendChild(toast);
    
    // Auto remove after 3s
    setTimeout(() => {
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 2500);
  };

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            showToast(`COPIED TO CLIPBOARD // ${textToCopy}`);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
            showToast('FAILED TO COPY');
          });
      }
    });
  });

  /* ==========================================================================
     ACTIVE NAVIGATION LINK STATE ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--accent)';
            link.style.backgroundColor = 'var(--accent-light)';
          } else {
            link.style.color = '';
            link.style.backgroundColor = '';
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Reset active state for Home when scrolling back to hero
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.backgroundColor = '';
      });
    }
  });

});
