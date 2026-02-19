const { useState, useEffect } = React;

function AppController(){
  const [theme, setTheme] = useState(() => localStorage.getItem('rf-theme') || 'dark');
  const [activeNav, setActiveNav] = useState('Home');
  const [username, setUsername] = useState(() => localStorage.getItem('rf-username') || '');
  const [visits, setVisits] = useState(0);

  // Apply theme to body on mount and when theme changes
  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('rf-theme', theme);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('rf-theme') || 'dark';
    document.body.classList.toggle('light-theme', savedTheme === 'light');
  }, []);

  // Track visits
  useEffect(() => {
    const v = parseInt(localStorage.getItem('rf-visits') || '0', 10) + 1;
    localStorage.setItem('rf-visits', v);
    setVisits(v);
  }, []);

  // Setup theme toggle button
  useEffect(() => {
    const themeBtn = document.getElementById('themeToggle');
    if(!themeBtn) return;
    const handleThemeClick = (e) => {
      e.preventDefault();
      setTheme(t => t === 'dark' ? 'light' : 'dark');
    };
    themeBtn.addEventListener('click', handleThemeClick);
    return () => themeBtn.removeEventListener('click', handleThemeClick);
  }, []);

  // Setup nav active state
  useEffect(() => {
    const houseText = document.querySelector('.house-text');
    const searchText = document.querySelector('.search-text');
    
    if(houseText && searchText){
      const updateNav = (nav) => {
        houseText.classList.toggle('active-nav', nav === 'Home');
        searchText.classList.toggle('active-nav', nav === 'Search');
        setActiveNav(nav);
      };
      
      houseText.addEventListener('click', () => updateNav('Home'));
      searchText.addEventListener('click', () => updateNav('Search'));
      
      // Set initial active state
      updateNav('Home');
      
      return () => {
        houseText.removeEventListener('click', () => updateNav('Home'));
        searchText.removeEventListener('click', () => updateNav('Search'));
      };
    }
  }, []);

  // Setup auth modal
  useEffect(() => {
    const modal = document.getElementById('authModal');
    const signupBtn = document.querySelector('.signupbtn');
    const loginBtn = document.querySelector('.loginbtn');
    const modalClose = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');
    
    if(!modal || !signupBtn || !loginBtn) return;
    
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
    
    return () => {
      signupBtn.removeEventListener('click', openModal);
      loginBtn.removeEventListener('click', openModal);
      if(modalClose) modalClose.removeEventListener('click', closeModal);
      if(overlay) overlay.removeEventListener('click', closeModal);
    };
  }, []);

  return null; // This component manages existing UI, no visual output
}

const root = ReactDOM.createRoot(document.getElementById('react-controller-root'));
root.render(<AppController />);

