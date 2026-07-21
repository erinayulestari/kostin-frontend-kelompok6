import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GallerySection from "../components/GallerySection";
import DetailInfo from "../components/DetailInfo";
import FacilitySection from "../components/FacilitySection";
import DetailBookingCard from "../components/DetailBookingCard";
import LocationSection from "../components/LocationSection";
import ReviewSection from "../components/ReviewSection";
import SimilarKost from "../components/SimilarKost";

// Import Modal Bandingkan Kost
import CompareKostModal from "../components/CompareKostModal";

import "../styles/detailkost.css";

export default function DetailKost() {
  // State untuk kontrol Modal Bandingkan Kost
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  return (
    <>
      <Navbar />

      <div className="detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Beranda</span>
          <span>›</span>
          <span>Cari Kost</span>
          <span>›</span>
          <span className="active">Kost Melati Premium</span>
        </div>

        {/* Gallery */}
        <GallerySection />

        {/* Detail */}
        <div className="detail-top">
          <div className="detail-left">
            <DetailInfo />
            <FacilitySection />
          </div>

          {/* Booking Card dipasangkan prop handler untuk buka modal */}
          <DetailBookingCard onOpenCompare={() => setIsCompareOpen(true)} />
        </div>

        <LocationSection />
        <ReviewSection />
        <SimilarKost />
      </div>

      {/* Component Modal Bandingkan Kost */}
      <CompareKostModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      <Footer />
    </>
  );
}