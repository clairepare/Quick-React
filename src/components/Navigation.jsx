import { NavLink } from 'react-router-dom';
import 'Navigation.css';

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav>
    <NavLink to="/" className={activation}>Courses</NavLink>
    <NavLink to="/edit/:id" className={activation}>Edit</NavLink>
  </nav>
);

export default Navigation;