import { Outlet } from "react-router-dom";
import Header from "./Header2";
import Footer from "./Footer";

function Layout() {
    return (
        <div style={{ backgroundColor: "#fbe4ec" }} className="min-h-screen">
            <Header />
            <main style={{ minHeight: '70vh' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;