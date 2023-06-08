import React, { useState, useEffect, useMemo } from "react";
import { axios } from "../../axiosConfig";
import SearchBar from "../search_bar/SearchBar";
import styles from "./sta.module.scss";

import PieCharts from "../charts/PieCharts";
import { useTable, useSortBy } from "react-table";

function Statistics() {
  const [shipperData, setShipperData] = useState([]);
  const [shipperWasSelected, setShipperWasSelected] = useState(null);
  const [numberOfSucessOrder, setNumberOfSucessOrder] = useState(null);
  const [numberOfFailureOrder, setNumberOfFailureOrder] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [totalNumberOfOrder, setTotalNumberOfOrder] = useState(null);
  const [dateWasSelected, setDateWasSelected] = useState("");

  const [detailOrders, setDetailOrders] = useState([]);
  const handleGetAllShipper = async () => {
    if (shipperData.length === 0) {
      const { data } = await axios.get("/shipper/all");
      setShipperData(data);
    }
  };

  useEffect(() => {
    handleGetAllShipper();
    return () => {};
  }, []);

  useEffect(() => {
    if (shipperWasSelected) {
      handleGetNumberOfOrderBaseOnStatus();
    }
  }, [shipperWasSelected]);

  useEffect(() => {
    if (dateWasSelected) {
      handleGetNumberOfOrderBaseOnStatusAndDate();
    }
  }, [dateWasSelected]);

  const handleGetNumberOfOrderBaseOnStatus = async () => {
    const { data } = await axios.get(
      `/historyOrder/getHistoryOrderByShipperId/${shipperWasSelected._id}`
    );
    if (data) {
      const numberOfSucessOrder = data.orders.filter(
        (order) => order.status === "thanhcong"
      ).length;
      setNumberOfSucessOrder(numberOfSucessOrder);

      const numberOfFailureOrder = data.orders.filter(
        (order) => order.status === "thatbai"
      ).length;
      setNumberOfFailureOrder(numberOfFailureOrder);

      setTotalNumberOfOrder(data.orders.length);
    }
  };

  const handleGetNumberOfOrderBaseOnStatusAndDate = async () => {
    const { data } = await axios.get(
      `/historyOrder/getHistoryOrderByShipperIdAndDate/${shipperWasSelected._id}?dateAdded=${dateWasSelected}`
    );
    const { numOfTotal, numOfSucess, numOfFailure, orders } = data;
    if (data) {
      setTotalNumberOfOrder(numOfTotal);
      setNumberOfSucessOrder(numOfSucess);
      setNumberOfFailureOrder(numOfFailure);
      setDetailOrders(orders);
    }
  };

  const handleGetNumberOfOrderBetweenTwoDate = async (req, res) => {
    if (startDate && endDate) {
      const startDateInDateSecformat = new Date(startDate).getTime();
      const endDateInDateSecformat = new Date(endDate).getTime();
      if (startDateInDateSecformat >= endDateInDateSecformat) {
        alert("Lỗi: ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
      } else {
        const { data } = await axios.get(
          `/historyOrder/getHistoryOrderBetweenTwoDate/${shipperWasSelected._id}?startDate=${startDate}&endDate=${endDate}`
          // /historyOrder/getHistoryOrderBetweenTwoDate/6449db1e1ccbe1c4892f7d1a?startDate=2023-05-16&endDate=2023-05-19
        );
        const { numOfTotal, numOfSucess, numOfFailure, orders } = data;
        if (data) {
          setTotalNumberOfOrder(numOfTotal);
          setNumberOfSucessOrder(numOfSucess);
          setNumberOfFailureOrder(numOfFailure);
          setDetailOrders(orders);
        }
        console.log(data);
      }
    }
  };

  const fetchOrders = async () => {
    if (shipperWasSelected) {
      const { data } = await axios
        .get(
          `/historyOrder/getHistoryOrderByShipperIdForTableData/${shipperWasSelected._id}`
        )
        .catch((err) => console.log(err));

      if (data.orders.length > 0) {
        setDetailOrders(data.orders);
      }
    }
  };

  console.log(detailOrders);

  const detailOrdersData = useMemo(() => {
    return [...detailOrders];
  }, [detailOrders]);

  const detailOrdersColumns = useMemo(
    () => [
      {
        Header: "Tên sản phẩm",
        accessor: "orderName",
      },
      {
        Header: "Địa chỉ",
        accessor: "deliveryAddress",
      },
      {
        Header: "SDT người nhận",
        accessor: "phoneReceive",
      },
      {
        Header: "Kho",
        accessor: "storage",
      },
      {
        Header: "Trọng lượng",
        accessor: "weight",
      },
      {
        Header: "Trạng thái",
        accessor: "status",
      },
      {
        Header: "Ngày tạo đơn",
        accessor: "dateAdded",
      },
      {
        Header: "Ngày giao",
        accessor: "dateDeliver",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns: detailOrdersColumns,
      data: detailOrdersData,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    fetchOrders();
  }, [shipperWasSelected]);

  const data = [
    { name: "Giao Thành công", value: numberOfSucessOrder || 0 },
    { name: "Giao thất bại", value: numberOfFailureOrder || 0 },
  ];

  const COLORS = ["#743f7e", "#E06900", "#FFBB28"];

  return (
    <div className="content_right_container">
      {shipperData && (
        <SearchBar
          dateWasSelected={dateWasSelected}
          shipperWasSelected={shipperWasSelected}
          setDateWasSelected={setDateWasSelected}
          numberOfSucessOrder={numberOfSucessOrder}
          totalNumberOfOrder={totalNumberOfOrder}
          setShipperWasSelected={setShipperWasSelected}
          placeholder="Nhập số điện thoại shipper..."
          data={shipperData}
        />
      )}
      <div className={styles.sta_container}>
        {shipperWasSelected ? (
          <>
            <div>
              <div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={() => handleGetNumberOfOrderBetweenTwoDate()}>
                  Xem thống kê
                </button>
              </div>

              <div>
                <table border={1} {...getTableProps()}>
                  <thead>
                    {
                      // Loop over the header rows
                      headerGroups.map((headerGroup) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {
                            // Loop over the headers in each row
                            headerGroup.headers.map((column) => (
                              // Apply the header cell props
                              <th
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
                              >
                                {
                                  // Render the header
                                  column.render("Header")
                                }
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " ▼"
                                    : " ▲"
                                  : ""}
                              </th>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </thead>
                  {/* Apply the table body props */}
                  <tbody {...getTableBodyProps()}>
                    {
                      // Loop over the table rows
                      rows.map((row) => {
                        // Prepare the row for display
                        prepareRow(row);
                        return (
                          // Apply the row props
                          <tr {...row.getRowProps()}>
                            {
                              // Loop over the rows cells
                              row.cells.map((cell) => {
                                // Apply the cell props
                                return (
                                  <td {...cell.getCellProps()}>
                                    {
                                      // Render the cell contents
                                      cell.render("Cell")
                                    }
                                  </td>
                                );
                              })
                            }
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <PieCharts data={data} COLORS={COLORS} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Statistics;
