import React from "react";
import { usePagination, useTable } from "react-table";

function Table({
  columns,
  data = [],
  fetchData = (d) => console.log("no fetchData { pageIndex, pageSize }", d),
  // loading = false,
  pageCount: controlledPageCount = 1,
  pageSizePagination,
  headerTextAlignRight = [],
  headerTextAlignCenter = [],
}) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: pageSizePagination },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    // useSortBy,
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  const firstPageRows = rows.slice(0, pageSizePagination);

  return (
    <div className="w-full overflow-hidden ali">
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <td
                    key={index}
                    className={`${
                      headerTextAlignRight.includes(column?.Header)
                        ? "text-right"
                        : headerTextAlignCenter.includes(column?.Header)
                        ? "text-center"
                        : ""
                    }`}
                    // {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </td>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {firstPageRows.map((row, i) => {
            let className = "odd";
            if (i % 2 === 0) {
              className = "even";
            }
            return (
              prepareRow(row) || (
                <tr key={i} className={className} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        className={`${
                          headerTextAlignRight.includes(cell.column.Header)
                            ? "text-right"
                            : headerTextAlignCenter.includes(cell.column.Header)
                            ? "text-center"
                            : ""
                        }`}
                        data-label={cell.column.Header}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              )
            );
          })}

          {page.length < 1 && (
            <tr className="odd">
              <td colSpan={100}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
