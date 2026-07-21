import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GallerySection from "../components/GallerySection";
import DetailInfo from "../components/DetailInfo";
import FacilitySection from "../components/FacilitySection";
import DetailBookingCard from "../components/DetailBookingCard";
import LocationSection from "../components/LocationSection";
import ReviewSection from "../components/ReviewSection";
import SimilarKost from "../components/SimilarKost";

import "../styles/detailkost.css";

export default function DetailKost() {

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

                    <span className="active">

                        Kost Melati Premium

                    </span>

                </div>

                {/* Gallery */}

                <GallerySection />

                {/* Detail */}

                <div className="detail-top">

                    <div className="detail-left">

                        <DetailInfo />

                        <FacilitySection />

                    </div>

                    <DetailBookingCard />

                </div>
                <LocationSection />
                <ReviewSection />
                <SimilarKost />

            </div>

            <Footer />

        </>

    );

}