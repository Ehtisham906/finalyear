import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <header className="navbar">
            <Link to={"/"} className="logo">
                <h1>Blood Bank</h1>
            </Link>
            <nav>
                <ul className="flex gap-5">
                    <Link className="hover:underline" to="/"> Home </Link>
                    <Link className="hover:underline" to="/donate">Donate Blood </Link>
                    <Link className="hover:underline" to="/request">Request Blood </Link>
                    <Link className="hover:underline" to="/about">About Us</Link>
                    <Link className="hover:underline" to="/contact">Contact</Link>

                    <Link to='/profile'>
                        {currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' alt="" src={currentUser.avatar} />
                        ) : <li className='text-white hover:underline'>Sign in</li>}

                    </Link>

                </ul>
            </nav>
        </header>
    )
}

export default Header;