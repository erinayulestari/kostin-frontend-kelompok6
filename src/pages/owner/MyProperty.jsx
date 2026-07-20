import DashboardLayout from "../../components/owner/DashboardLayout";

import PropertyPageHeader from "../../components/owner/PropertyPageHeader";
import PropertyStats from "../../components/owner/PropertyStats";
import PropertyToolbar from "../../components/owner/PropertyToolbar";
import PropertyGrid from "../../components/owner/PropertyGrid";

import "../../styles/owner/property-page.css";
import "../../styles/owner/property-stats.css";
import "../../styles/owner/property-toolbar.css";
import "../../styles/owner/property-card.css";

export default function MyProperty() {

  return (

    <DashboardLayout>

      <PropertyPageHeader />

      <PropertyStats />

      <PropertyToolbar />

      <PropertyGrid />

    </DashboardLayout>

  );

}