import React, { useEffect, useRef, useState } from 'react'
import DataTableView from './DataTableView'

const DataTableContainer = (props) => {

  const { data, columns, loading, bordered } = props
  
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);
  const [tableHeight, setTableHeight] = useState(0);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };


  useEffect(() => {
    const delayNoRecordsMessage = setTimeout(() => {
      setShowNoRecordsMessage(true);
    }, 500);

    return () => {
      clearTimeout(delayNoRecordsMessage);
    };
  }, [data]);

  const sortedData = [...data]?.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const tableRef = useRef(null);

  useEffect(() => {
    // Function to calculate the height of the container and set it as the table height
    const calculateTableHeight = () => {
      if (tableRef.current) {
        const windowHeight = window.innerHeight;
        const topOffset = tableRef.current.getBoundingClientRect().top;
        const bottomOffset = 100;

        const calculatedHeight = windowHeight - topOffset - bottomOffset;
        setTableHeight(calculatedHeight);
      }
    };

    // Call the function initially
    calculateTableHeight();

    // Recalculate the height on window resize
    window.addEventListener("resize", calculateTableHeight);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", calculateTableHeight);
    };
  }, [window.innerHeight]);
    return (
    <DataTableView
      // data={data && data}
      columns={columns}
      // sortKey={sortKey}
      // sortDirection={sortDirection}
      handleSort={handleSort}
      loading={loading}
      bordered={bordered}
      showNoRecordsMessage={showNoRecordsMessage}
      sortedData={sortedData}
      tableHeight={tableHeight}
      tableRef={tableRef}
    />
  )
}

export default DataTableContainer
