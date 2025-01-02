const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#2d3748', color: 'white', padding: '16px 0', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', position: 'fixed', width: '100%', top: '0', left: '0', zIndex: 50 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ fontSize: '24px', fontWeight: '600', color: 'white' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Eventic</a>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Home</a>
          <a href="/login" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Login</a>
          <a href="/events" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Events</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
