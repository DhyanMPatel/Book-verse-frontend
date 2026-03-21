import { Table } from "react-bootstrap";
import "./DataTableStyle.css";

const DataTableView = (props) => {
  const {
    // data,
    columns,
    // sortKey,
    // sortDirection,
    handleSort,
    loading,
    bordered,
    showNoRecordsMessage,
    sortedData,
    tableHeight,
    tableRef,
  } = props;

  return (
    <>
      {/* <div style={{ height: "60vh", maxHeight: "60vh", overflowY: "auto" }}> */}
      <div
        className="common-table"
        ref={tableRef}
        style={{
          minHeight: sortedData?.length > 0 ? "170px" : "100px",
          height: `${tableHeight}px`,
          overflowY: "auto",
        }}
      >
        <Table hover bordered={bordered ? true : false}>
          <thead>
            <tr>
              {columns
                .filter((column) => !column?.hidden)
                .map((column, columnIndex) => (
                  <th
                    key={`${column?.key || `fallback-key-${columnIndex}`}`}
                    align={column?.headerAlign}
                    onClick={() => handleSort(column?.key)}
                    className={`table-header-color ${
                      column?.headerAlign ? "" : "text-center"
                    } text-nowrap ${column?.key === "actions" ? "sticky" : ""}`}
                    style={column?.headerStyle && column?.headerStyle}
                  >
                    {column?.label?.toUpperCase()}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns?.length} className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
              sortedData?.map((item, rowIndex) => (
                <tr key={`${rowIndex || `fallback-key-${rowIndex}`}`}>
                  {columns
                    .filter((column) => !column?.hidden)
                    .map((column, colIndex) => (
                      <td
                        key={`${colIndex || `fallback-key-${colIndex}`}`}
                        align={column?.cellAlign}
                        style={column?.cellStyle && column?.cellStyle}
                        className={`table-cell-color ${
                          column?.cellAlign ? "" : "text-center"
                        } text-nowrap ${
                          column?.key === "actions" ? "sticky" : ""
                        }`}
                      >
                        {column?.cell ? column?.cell(item) : item[column.key]}
                      </td>
                    ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {!loading && showNoRecordsMessage && !sortedData?.length && (
          <div className="d-flex justify-content-center mb-3">
            There are no records to display
          </div>
        )}
      </div>
    </>
  );
};

export default DataTableView;
