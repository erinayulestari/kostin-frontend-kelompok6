import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import api from "../api/api";

import "../styles/detailkost.css";

export default function DetailKost() {
  const { id } = useParams();
  const kosId = id || "1";

  const [kos, setKos] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await api.get(`/kos/${kosId}`);
        if (res.data) {
          setKos(res.data);
          if (res.data.reviews) {
            setReviews(res.data.reviews);
          }
        }
      } catch (err) {
        console.error("Gagal memuat detail kos:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchReviews() {
      try {
        const resRev = await api.get(`/kos/${kosId}/reviews`);
        if (resRev.data) {
          setReviews(resRev.data);
        }
      } catch (e) {
        // Ignored if reviews are already in kos detail payload
      }
    }

    fetchDetail();
    fetchReviews();
  }, [kosId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <h2>Memuat Detail Kost...</h2>
        </div>
        <Footer />
      </>
    );
  }

  const kosName = kos?.nama_kos || "Detail Kost";

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
          <span className="active">{kosName}</span>
        </div>

        {/* Gallery */}
        <GallerySection
          fotoUtama={kos?.foto_utama_url || kos?.foto_utama}
          fotos={kos?.kos_foto || kos?.fotos || []}
        />

        {/* Detail */}
        <div className="detail-top">
          <div className="detail-left">
            <DetailInfo kos={kos} />
            <FacilitySection kos={kos} />
          </div>

          {/* Booking Card dipasangkan prop handler untuk buka modal */}
          <DetailBookingCard
            kos={kos}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        </div>

        <LocationSection kos={kos} />
        <ReviewSection reviews={reviews} kosId={kosId} />
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