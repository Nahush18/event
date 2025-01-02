import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#2d3748', color: 'white', padding: '16px 0', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', position: 'fixed', width: '100%', top: '0', left: '0', zIndex: 50 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ fontSize: '24px', fontWeight: '600', color: 'white' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Eventic</Link>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
          <Link href="/login" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Login</Link>
          <Link href="/events" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Events</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
