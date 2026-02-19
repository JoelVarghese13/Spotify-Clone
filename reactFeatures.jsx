const { useState, useEffect } = React;

function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('rf-theme') || 'dark');
  const [showModal, setShowModal] = useState(false);
  const [showExtras, setShowExtras] = useState(true);
  const [activeNav, setActiveNav] = useState('Home');
  const [username, setUsername] = useState(() => localStorage.getItem('rf-username') || '');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // apply saved theme
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('rf-theme', theme);
  }, [theme]);

  useEffect(() => {
    // increment visit count on mount
    const v = parseInt(localStorage.getItem('rf-visits') || '0', 10) + 1;
    localStorage.setItem('rf-visits', v);
    setVisits(v);
  }, []);

  function validate(){
    const e = {};
    if(!username || username.trim().length < 2) e.username = 'Enter at least 2 characters';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev){
    ev.preventDefault();
    if(!validate()) return;
    localStorage.setItem('rf-username', username.trim());
    alert('Saved profile — username stored to localStorage');
  }

  return (
    <div style={{background:'transparent', color:'inherit', padding:'12px', borderRadius:8}}>
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
        <nav style={{display:'flex', gap:8}}>
          {['Home','Browse','Radio'].map(n => (
            <button key={n}
              onClick={() => setActiveNav(n)}
              style={{
                padding:'8px 12px',
                borderRadius:6,
                border: activeNav===n ? '2px solid #1db954' : '1px solid rgba(255,255,255,0.06)',
                background: activeNav===n ? 'rgba(29,185,84,0.08)' : 'transparent',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >{n}</button>
          ))}
        </nav>

        <div style={{marginLeft:'auto', display:'flex', gap:8}}>
          <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            style={{padding:8, borderRadius:8, cursor:'pointer'}}>
            Toggle Theme
          </button>
          <button onClick={() => setShowModal(true)} style={{padding:8, borderRadius:8}}>Show Message</button>
        </div>
      </div>

      <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
        <form onSubmit={handleSubmit} style={{minWidth:260, maxWidth:420, padding:12, borderRadius:8, background:'rgba(0,0,0,0.12)'}}>
          <h3 style={{marginBottom:8}}>Profile</h3>
          <label style={{display:'block', fontSize:13}}>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} style={{width:'100%', padding:8, marginBottom:6}} />
          {errors.username && <div style={{color:'#ff6b6b', fontSize:13}}>{errors.username}</div>}

          <label style={{display:'block', fontSize:13, marginTop:8}}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%', padding:8, marginBottom:6}} />
          {errors.email && <div style={{color:'#ff6b6b', fontSize:13}}>{errors.email}</div>}

          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button type="submit" style={{padding:'8px 12px', borderRadius:6}}>Save</button>
            <button type="button" onClick={() => { setUsername(''); setEmail(''); setErrors({}); }} style={{padding:'8px 12px', borderRadius:6}}>Reset</button>
          </div>
          <div style={{fontSize:12, color:'#bfbfbf', marginTop:8}}>Visits: {visits}</div>
        </form>

        <div style={{flex:1, minWidth:220}}>
          <h3 style={{marginTop:0}}>Extras</h3>
          <button onClick={() => setShowExtras(s=>!s)} style={{padding:8, borderRadius:6, marginBottom:8}}>
            {showExtras ? 'Hide' : 'Show'} Tips
          </button>
          {showExtras && (
            <div style={{padding:12, borderRadius:8, background:'rgba(0,0,0,0.08)'}}>
              <p style={{margin:0}}>Tip: Click a nav item to highlight it. Theme and username persist to localStorage.</p>
              <p style={{margin:'8px 0 0 0'}}>Stored username: <strong>{localStorage.getItem('rf-username') || '(empty)'}</strong></p>
            </div>
          )}

          <div style={{marginTop:12}}>
            <h4>Quick Slider</h4>
            <SimpleSlider />
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999}}>
          <div onClick={()=>setShowModal(false)} style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.6)'}}></div>
          <div style={{position:'relative', padding:20, borderRadius:8, background:'#121212', minWidth:280, color:'white'}}>
            <h3 style={{marginTop:0}}>Hello!</h3>
            <p style={{margin:'8px 0'}}>This is a React-style modal triggered by a button.</p>
            <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
              <button onClick={()=>setShowModal(false)} style={{padding:8, borderRadius:6}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SimpleSlider(){
  const images = [
    'https://picsum.photos/seed/1/320/180',
    'https://picsum.photos/seed/2/320/180',
    'https://picsum.photos/seed/3/320/180'
  ];
  const [i, setI] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setI(s => (s+1) % images.length), 3500);
    return ()=> clearInterval(t);
  },[]);
  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <button onClick={()=>setI(s=> (s-1+images.length)%images.length)} style={{padding:6}}>◀</button>
      <img src={images[i]} alt="slide" style={{width:320, height:180, objectFit:'cover', borderRadius:8}} />
      <button onClick={()=>setI(s=> (s+1)%images.length)} style={{padding:6}}>▶</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<App />);
