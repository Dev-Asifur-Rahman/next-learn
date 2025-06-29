
import Link from "next/link";

const Pagination = ({ currentPage, totalPages }) => {
  const pages = [...Array(totalPages).keys()];

  // Handle disabling prev/next buttons at boundaries
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <section className="w-full py-6 flex justify-center">
      <div className="join">

        {/* Prev button */}
        <Link
          href={`?page=${Math.max(currentPage - 1, 1)}`}
          className={`join-item btn ${isFirstPage ? "pointer-events-none opacity-50" : ""}`}
        >
          «
        </Link>

        {/* Page buttons */}
        {pages.map((pageIndex) => {
          const pageNumber = pageIndex + 1;
          return (
            <Link
              key={pageNumber}
              href={`?page=${pageNumber}`}
              className={`join-item btn ${currentPage === pageNumber ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
            >
              {pageNumber}
            </Link>
          );
        })}

        {/* Next button */}
        <Link
          href={`?page=${Math.min(currentPage + 1, totalPages)}`}
          className={`join-item btn ${isLastPage ? "pointer-events-none opacity-50" : ""}`}
        >
          »
        </Link>

      </div>
    </section>
  );
};

export default Pagination;
