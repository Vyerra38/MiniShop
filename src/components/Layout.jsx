import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    return (
        <div style={{ backgroundColor: '#f4d6e4e4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, minHeight: '70vh', padding: '15px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;