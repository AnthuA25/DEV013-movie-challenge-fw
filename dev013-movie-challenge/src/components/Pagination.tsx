import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "../styles/Pagination.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const getPagination = () => {
    const pages = [];
    const maxVisiblePages = 3; // Número de páginas visibles antes de los puntos suspensivos

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= maxVisiblePages || // Primeras páginas
        i > totalPages - maxVisiblePages || // Últimas páginas
        (i >= currentPage - 1 && i <= currentPage + 1) // Páginas cercanas a la actual
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    if (pages[pages.length - 1] !== totalPages && totalPages > 1) {
        pages.push(totalPages);
      }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1} aria-label="Previous">
        <IoIosArrowBack />
      </button>
      {getPagination().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? "active" : ""}
          disabled={page === "..." || page === currentPage}
          aria-label="Next"
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};
