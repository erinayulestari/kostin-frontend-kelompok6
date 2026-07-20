import { Plus } from "lucide-react";

export default function PropertyPageHeader() {
  return (
    <section className="property-page-header">

      <div>

        <h1>Kost Saya</h1>

        <p>
          Kelola seluruh properti kost yang kamu miliki.
        </p>

      </div>

      <button className="add-property-btn">

        <Plus size={20} />

        Tambah Kost

      </button>

    </section>
  );
}