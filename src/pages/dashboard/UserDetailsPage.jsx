import Header from "../../components/Dashboard/Elements/Header";
import Sidebar from "../../components/Dashboard/Elements/Sidebar";
import UserDetail from "../../components/Dashboard/Layouts/UserDetail";

function DashboardUserDetails() {
    return (
        <>
            <Sidebar />

            <div className="lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-5">
                <Header title="User Details" linkPage="User / User Details" />
                <UserDetail />
            </div>
        </>
    );
}

export default DashboardUserDetails;
