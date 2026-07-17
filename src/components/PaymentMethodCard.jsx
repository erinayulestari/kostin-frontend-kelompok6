import { useState } from "react";
import { Wallet } from "lucide-react";

import bca from "../assets/payment/bca.png";
import bri from "../assets/payment/bri.png";
import mandiri from "../assets/payment/mandiri.png";
import bni from "../assets/payment/bni.png";

import gopay from "../assets/payment/gopay.png";
import ovo from "../assets/payment/ovo.png";
import dana from "../assets/payment/dana.png";
import shopeepay from "../assets/payment/shopeepay.png";

import qris from "../assets/payment/qris.png";

export default function PaymentMethodCard() {
  const [method, setMethod] = useState("bank");

  return (
    <section className="checkout-card">

      <div className="checkout-card-title">

        <div className="checkout-card-icon">
          <Wallet size={22} />
        </div>

        <h3>3. Metode Pembayaran</h3>

      </div>

      <p className="payment-label">
        Pilih Metode Pembayaran
      </p>

      {/* Transfer Bank */}

      <label className="payment-option">

        <div className="payment-left">

          <input
            type="radio"
            checked={method === "bank"}
            onChange={() => setMethod("bank")}
          />

          <span>Transfer Bank</span>

        </div>

        <div className="payment-logos">

          <img src={bca} alt="BCA" />

          <img src={bri} alt="BRI" />

          <img src={mandiri} alt="Mandiri" />

          <img src={bni} alt="BNI" />

        </div>

      </label>

      {/* E-Wallet */}

      <label className="payment-option">

        <div className="payment-left">

          <input
            type="radio"
            checked={method === "ewallet"}
            onChange={() => setMethod("ewallet")}
          />

          <span>E-Wallet</span>

        </div>

        <div className="payment-logos">

          <img src={gopay} alt="GoPay" />

          <img src={ovo} alt="OVO" />

          <img src={dana} alt="DANA" />

          <img src={shopeepay} alt="ShopeePay" />

        </div>

      </label>

      {/* QRIS */}

      <label className="payment-option">

        <div className="payment-left">

          <input
            type="radio"
            checked={method === "qris"}
            onChange={() => setMethod("qris")}
          />

          <span>QRIS</span>

        </div>

        <div className="payment-logos">

          <img src={qris} alt="QRIS" />

        </div>

      </label>

      <div className="payment-security">

        <Wallet size={20} />

        <div>

          <h4>Pembayaran Anda aman dan terenkripsi.</h4>

          <p>
            Kami menggunakan enkripsi tingkat tinggi
            untuk melindungi data Anda.
          </p>

        </div>

      </div>

    </section>
  );
}