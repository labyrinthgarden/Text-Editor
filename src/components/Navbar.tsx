import { useState, useRef, useEffect } from 'react';

type NavbarProps = {
  onFontColorChange: (color: string) => void;
  onEditorFontColorChange: (color: string) => void;
  onBgColorChange: (color: string) => void;
  onEditorBgColorChange: (color: string) => void;
};

function Navbar({
  onFontColorChange,
  onEditorFontColorChange,
  onBgColorChange,
  onEditorBgColorChange,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div style={{ display: 'flex' }}>
        <button className="navbar-button">File</button>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
        <button className="navbar-button" onClick={toggleMenu}>...</button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className='dropdown-button'>
              <label>Font color:</label>
              <input type="color" onChange={e => onFontColorChange(e.target.value)} />
            </div>
            <div className='dropdown-button'>
              <label>Editor font color:</label>
              <input type="color" onChange={e => onEditorFontColorChange(e.target.value)} />
            </div>
            <div className='dropdown-button'>
              <label>Bg color:</label>
              <input type="color" onChange={e => onBgColorChange(e.target.value)} />
            </div>
            <div className='dropdown-button'>
              <label>Editor bg color:</label>
              <input type="color" onChange={e => onEditorBgColorChange(e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
