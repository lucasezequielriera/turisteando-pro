"use client";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);

  // Calculate which pages to show
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Show max 7 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Near beginning: show 1, 2, 3, 4, 5, ..., last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near end: show 1, ..., last-4, last-3, last-2, last-1, last
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle: show 1, ..., current-1, current, current+1, ..., last
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-200"
        }`}
      >
        ← Anterior
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-slate-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                onMouseEnter={() => setHoveredPage(page as number)}
                onMouseLeave={() => setHoveredPage(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-cyan-400 text-slate-900 shadow-lg scale-105"
                    : hoveredPage === page
                    ? "bg-slate-600 text-slate-200 scale-105"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-200"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-200"
        }`}
      >
        Siguiente →
      </button>

      {/* Page info */}
      <div className="ml-4 text-sm text-slate-400">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
}
