import {
    Wifi,
    Monitor,
    Bath,
    CookingPot,
    CircleParking,
    WashingMachine,
    ShieldCheck,
    Zap,
    Wallet,
    Bed,
    Ruler,
    Clock3,
    Moon,
    LogIn
} from "lucide-react";

export default function FacilitySection(){

    return(

        <section className="facility-section">

            <h2>Fasilitas</h2>

            <div className="facility-grid">

                <div className="facility-card">
                    <Wifi size={22}/>
                    <span>WiFi</span>
                </div>

                <div className="facility-card">
                    <Monitor size={22}/>
                    <span>AC</span>
                </div>

                <div className="facility-card">
                    <Bath size={22}/>
                    <span>Kamar mandi dalam</span>
                </div>

                <div className="facility-card">
                    <CookingPot size={22}/>
                    <span>Dapur</span>
                </div>

                <div className="facility-card">
                    <CircleParking size={22}/>
                    <span>Parkir</span>
                </div>

                <div className="facility-card">
                    <WashingMachine size={22}/>
                    <span>Laundry</span>
                </div>

                <div className="facility-card">
                    <ShieldCheck size={22}/>
                    <span>CCTV</span>
                </div>

                <div className="facility-card">
                    <Zap size={22}/>
                    <span>Listrik 24 Jam</span>
                </div>

            </div>

            <h2 className="room-title">

                Informasi Kamar

            </h2>

            <div className="room-grid">

                <div className="room-item">

                    <Wallet/>

                    <div>

                        <small>Harga</small>

                        <strong>Rp850.000/bulan</strong>

                    </div>

                </div>

                <div className="room-item">

                    <Bed/>

                    <div>

                        <small>Sisa Kamar</small>

                        <strong>3 kamar</strong>

                    </div>

                </div>

                <div className="room-item">

                    <Ruler/>

                    <div>

                        <small>Ukuran</small>

                        <strong>3 x 4 meter</strong>

                    </div>

                </div>

                <div className="room-item">

                    <Clock3/>

                    <div>

                        <small>Minimal Sewa</small>

                        <strong>3 Bulan</strong>

                    </div>

                </div>

                <div className="room-item">

                    <Moon/>

                    <div>

                        <small>Jam Malam</small>

                        <strong>Tidak Ada</strong>

                    </div>

                </div>

                <div className="room-item">

                    <LogIn/>

                    <div>

                        <small>Check In</small>

                        <strong>08.00</strong>

                    </div>

                </div>

            </div>

        </section>

    )

}