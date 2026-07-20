import "../../styles/owner/dashboard.css";
import "../../styles/owner/sidebar.css";
import "../../styles/owner/header.css";

import OwnerSidebar from "./OwnerSidebar";
import OwnerHeader from "./OwnerHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">

      <OwnerSidebar />

      <div className="dashboard-wrapper">

        <OwnerHeader />

        <main className="dashboard-content">

          {children}

        </main>

      </div>

    </div>
  );
}