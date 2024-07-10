export function PaginationOne({ currentPage, totalPages, onPageChange }) {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    return (
        <div className="flex items-center">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                &larr; Previous
            </button>
            {[...Array(totalPages).keys()].map((_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`mx-1 flex items-center rounded-md border border-black px-3 py-1 text-black hover:scale-105 ${currentPage === page ? 'bg-black/80 text-white' : ''}`}
                    >
                        {page}
                    </button>
                );
            })}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-2 text-sm font-semibold text-gray-900 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                Next &rarr;
            </button>
        </div>
    );
}
