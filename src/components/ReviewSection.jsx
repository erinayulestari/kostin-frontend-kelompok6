import { Star } from "lucide-react";

export default function ReviewSection() {
    return (

        <section className="review-section">

            <h2>Review Penghuni</h2>

            <div className="review-wrapper">

                {/* Rating Summary */}

                <div className="rating-summary">

                    <h1>4.8 ⭐</h1>

                    <p>Berdasarkan 128 review</p>

                    <div className="rating-bars">

                        <div className="bar">

                            <span>5 ★</span>

                            <div className="line">
                                <div style={{ width: "90%" }}></div>
                            </div>

                            <strong>106</strong>

                        </div>

                        <div className="bar">

                            <span>4 ★</span>

                            <div className="line">
                                <div style={{ width: "20%" }}></div>
                            </div>

                            <strong>16</strong>

                        </div>

                        <div className="bar">

                            <span>3 ★</span>

                            <div className="line">
                                <div style={{ width: "8%" }}></div>
                            </div>

                            <strong>4</strong>

                        </div>

                        <div className="bar">

                            <span>2 ★</span>

                            <div className="line">
                                <div style={{ width: "4%" }}></div>
                            </div>

                            <strong>1</strong>

                        </div>

                        <div className="bar">

                            <span>1 ★</span>

                            <div className="line">
                                <div style={{ width: "2%" }}></div>
                            </div>

                            <strong>1</strong>

                        </div>

                    </div>

                </div>

                {/* Review List */}

                <div className="review-list">

                    <div className="review-card">

                        <div className="review-avatar">
                            RP
                        </div>

                        <h4>Rizky Pratama</h4>

                        <small>12 Mei 2024</small>

                        <div className="stars">

                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />

                        </div>

                        <p>

                            Tempatnya nyaman, bersih, dan fasilitas lengkap.
                            Sangat cocok untuk mahasiswa maupun pekerja.

                        </p>

                    </div>

                    <div className="review-card">

                        <div className="review-avatar">
                            MP
                        </div>

                        <h4>Mega Putri</h4>

                        <small>8 Mei 2024</small>

                        <div className="stars">

                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />

                        </div>

                        <p>

                            Lokasi strategis dekat kampus dan pusat kuliner.
                            Lingkungan aman dan tenang.

                        </p>

                    </div>

                    <div className="review-card">

                        <div className="review-avatar">
                            AS
                        </div>

                        <h4>Andi Saputra</h4>

                        <small>3 Mei 2024</small>

                        <div className="stars">

                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />
                            <Star size={16} fill="#FACC15" color="#FACC15" />

                        </div>

                        <p>

                            Pengelola ramah, fasilitas selalu bersih,
                            dan proses check-in sangat mudah.

                        </p>

                    </div>

                </div>

            </div>

            <button className="review-btn">

                Lihat Semua Review

            </button>

        </section>

    );
}