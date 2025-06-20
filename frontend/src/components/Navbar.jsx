import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setToken } = useContext(BookContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className='flex gap-3 justify-end p-5 bg-amber-950 text-white'>
      <Link to="/">Home</Link> | <Link to="/books">Books</Link>
      {user ? (
        <>
          {" "} | <Link to={`/profile/${user._id}`}>{user.name}</Link>
          {" "} | <button onClick={handleLogout} className="underline hover:text-gray-300">Logout</button>
        </>
      ) : (
        <> | <Link to="/login">Login</Link></>
      )}
    </nav>
  );
};

export default Navbar;
