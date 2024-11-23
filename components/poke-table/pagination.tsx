import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import {
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination-item";

type ReceiveProps = {
  numPages: number;
  currentPage: number;
};

const PokePagination: React.FC<ReceiveProps> = ({ numPages, currentPage }) => {
  const isPrevAvail = useMemo(() => currentPage !== 0, [currentPage]);
  const isNextAvail = useMemo(
    () => currentPage !== numPages,
    [currentPage, numPages],
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={!isPrevAvail} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext disabled={!isNextAvail} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PokePagination;
