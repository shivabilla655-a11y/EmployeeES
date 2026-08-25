import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import "./MainLayouts.css";

function MainLayout() {
    return (
        <div className="main-layout">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Application Area */}
            <div className="main-content-wrapper">

                {/* Top Navbar */}
                <Navbar /> 

                {/* Page Content */}
                <main className="main-page-content">
                    <Outlet />
                </main> 

            </div>

        </div>
    );
}

export default MainLayout;