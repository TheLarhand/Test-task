import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/");
    }

    return (
        <Menu mode="horizontal">
            <Menu.Item key="home">
                <Link to="/">About us</Link>
            </Menu.Item>
            {isAuthenticated ? (
                <>
                    <Menu.Item key="profile">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={handleLogout}>
                        Log out
                    </Menu.Item>
                </>

            )
                :



                <Menu.Item key="login">
                    <Link to="/login">Log in</Link>
                </Menu.Item>
            }
        </Menu>
    );
};

export default Navbar;
