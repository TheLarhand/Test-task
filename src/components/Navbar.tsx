import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useEffect } from "react";
import { logout } from "../api/api";

const Navbar = ({ isAuthenticated, setIsAuthenticated }: { isAuthenticated: boolean; setIsAuthenticated: (auth: boolean) => void }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"));
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logout(); 
            if (response?.success) {
                setIsAuthenticated(false);
                navigate("/");
            } else {
                console.error("Logout failed: ", response?.data?.message);
            }
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };
    

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
            ) : (
                <Menu.Item key="login">
                    <Link to="/login">Log in</Link>
                </Menu.Item>
            )}
        </Menu>
    );
};

export default Navbar;
