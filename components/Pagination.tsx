"use client";

import { FC, useMemo } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}

const PaginationButton = ({ children, ...props }: ButtonProps) => (
  <Button className="pagination__button" variant="outline" {...props}>
    {children}
  </Button>
);

const Pagination: FC<Props> = ({ itemsCount, pageSize, currentPage }) => {
  const router = useRouter();
  const params = useSearchParams();

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", page.toString());

    router.push(`?${newParams.toString()}`);
  };

  const totalPages = Math.ceil(itemsCount / pageSize);

  const leftEllipsisShowed = totalPages > 7 && currentPage > 4;
  const rightEllipsisShowed = totalPages > 7 && currentPage < totalPages - 3;
  const centralItemsCount = Math.min(
    totalPages,
    7 - (leftEllipsisShowed && 2) - (rightEllipsisShowed && 2),
  );
  const firstCentralPage = useMemo(() => {
    if (leftEllipsisShowed && rightEllipsisShowed) {
      return currentPage - 1;
    }
    if (leftEllipsisShowed) {
      return totalPages - centralItemsCount + 1;
    }
    return 1;
  }, [
    currentPage,
    centralItemsCount,
    leftEllipsisShowed,
    totalPages,
    rightEllipsisShowed,
  ]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-1 py-5">
      {leftEllipsisShowed && (
        <>
          <PaginationButton onClick={() => setPage(1)}>1</PaginationButton>
          <PaginationButton disabled>...</PaginationButton>
        </>
      )}

      {new Array(centralItemsCount).fill(null).map((_, index) => {
        const pageNumber = firstCentralPage + index;

        return (
          <PaginationButton
            onClick={() => setPage(pageNumber)}
            variant={pageNumber === currentPage ? "default" : "outline"}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      {rightEllipsisShowed && (
        <>
          <PaginationButton disabled>...</PaginationButton>
          <PaginationButton onClick={() => setPage(totalPages)}>
            {totalPages}
          </PaginationButton>
        </>
      )}
    </div>
  );
};

export default Pagination;
