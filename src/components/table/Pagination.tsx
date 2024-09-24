import React, { useEffect, useState } from "react";
import SelectPageSizeDropDown from "./SelectPageSizeDropDown";
import { basePagination } from "@/lib/pagination";

function Pagination({
  className = "",
  totalItems,
  currentPage = 1,
  setCurrentPage,
  pageSize,
  setPageSize = null,
  listPageSize = [10, 20, 30, 40, 50],
}) {
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (totalItems % pageSize == 0) {
      setTotalPage(Math.floor(totalItems / pageSize));
    } else if (totalItems % pageSize > 0) {
      setTotalPage(Math.ceil(totalItems / pageSize));
    }
  }, [totalItems, pageSize]);

  useEffect(() => {
    if (pageSize) {
      setCurrentPage(1);
    }
  }, [pageSize]);

  const pageRange = basePagination(currentPage, totalPage);

  const startList = pageSize * (currentPage - 1) + 1;
  const endList = pageSize * (currentPage - 1) + pageSize;

  return (
    <div
      className={`flex md:flex-row flex-col items-center justify-center md:gap-8 gap-4 mt-4 text-sm md:justify-start ${className}`}
    >
      {setPageSize && (
        <SelectPageSizeDropDown
          listPageSize={listPageSize}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}

      <div className="flex items-center gap-[6px]">
        {pageRange?.map((i, index) => (
          <PageBtn
            currentPage={currentPage}
            value={i}
            key={index}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </div>

      <div className="flex items-center justify-center h-8 px-2 text-white border rounded border-secondary hover:border-primary">
        {startList} -&nbsp;
        {endList > totalItems ? totalItems : endList}
        &nbsp; of {totalItems}
      </div>
    </div>
  );
}

export default Pagination;

function PageBtn({ value, currentPage, setCurrentPage }) {
  const isActive = value == currentPage;
  return (
    <div
      onClick={() => (value === "..." ? null : setCurrentPage(value))}
      className={`flex items-center justify-center w-8 h-8 text-sm border rounded cursor-pointer ${
        isActive
          ? "border-primary bg-primary text-black"
          : "bg-secondary border-secondary text-white"
      }`}
    >
      {value}
    </div>
  );
}
