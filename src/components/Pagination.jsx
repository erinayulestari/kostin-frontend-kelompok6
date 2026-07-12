export default function Pagination() {

    return (

        <div className="pagination">

            <button
                type="button"
                className="page-btn"
            >
                ←
            </button>

            <button className="page-number active">
                1
            </button>

            <button className="page-number">
                2
            </button>

            <button className="page-number">
                3
            </button>

            <button className="page-number">
                4
            </button>

            <button
                type="button"
                className="page-btn"
            >
                →
            </button>

        </div>

    );

}