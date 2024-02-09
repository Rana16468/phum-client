import { Outlet } from "react-router-dom";


const AdminLayout = () => {
    return (
        <>
            <h1>This is Admin Layout</h1>
            <Outlet/>
        </>
    );
};

export default AdminLayout;