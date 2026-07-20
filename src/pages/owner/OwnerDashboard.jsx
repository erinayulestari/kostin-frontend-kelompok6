import DashboardLayout from "../../components/owner/DashboardLayout";
import StatsCard from "../../components/owner/StatsCard";
import BookingSection from "../../components/owner/BookingSection";
import PropertySection from "../../components/owner/PropertySection";

export default function OwnerDashboard() {
  return (
    <DashboardLayout>

      <StatsCard />

      <BookingSection />

      <PropertySection />

    </DashboardLayout>
  );
}