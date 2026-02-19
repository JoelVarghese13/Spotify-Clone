// App Controller - Vanilla JS implementation of React features
(function() {
  // Theme management with localStorage
  const theme = localStorage.getItem('rf-theme') || 'dark';
  document.body.classList.toggle('light-theme', theme === 'light');

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      document.body.classList.toggle('light-theme', newTheme === 'light');
      localStorage.setItem('rf-theme', newTheme);
    });
  }

  // Nav active state
  const houseText = document.querySelector('.house-text');
  const searchText = document.querySelector('.search-text');
  
  if(houseText && searchText) {
    const updateNav = (activeElem) => {
      houseText.classList.toggle('active-nav', activeElem === houseText);
      searchText.classList.toggle('active-nav', activeElem === searchText);
    };
    
    houseText.addEventListener('click', () => updateNav(houseText));
    searchText.addEventListener('click', () => updateNav(searchText));
    
    // Set Home as initial active
    updateNav(houseText);
  }

  // Auth modal
  const modal = document.getElementById('authModal');
  const signupBtn = document.querySelector('.signupbtn');
  const loginBtn = document.querySelector('.loginbtn');
  const modalClose = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');
  
  if(modal && signupBtn && loginBtn) {
    const openModal = (e) => {
      e.preventDefault();
      modal.classList.add('active');
    };
    
    const closeModal = (e) => {
      e.preventDefault();
      modal.classList.remove('active');
    };
    
    signupBtn.addEventListener('click', openModal);
    loginBtn.addEventListener('click', openModal);
    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(overlay) overlay.addEventListener('click', closeModal);
  }

  // Visit counter with localStorage
  const visits = parseInt(localStorage.getItem('rf-visits') || '0', 10) + 1;
  localStorage.setItem('rf-visits', visits);
})();
