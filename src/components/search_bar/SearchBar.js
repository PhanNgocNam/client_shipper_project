import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AcceptButton from "../button/AcceptButton";
import RejectButton from "../button/RejectButton";

function SearchBar({
  placeholder,
  data,
  setShipperWasSelected,
  numberOfSucessOrder,
  totalNumberOfOrder,
  setDateWasSelected,
  shipperWasSelected,
  dateWasSelected,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.fullName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setShipperWasSelected(null);
    setDateWasSelected("");
  };

  const handleSelectAnItem = (shipper) => {
    setWordEntered(shipper.fullName);
    setFilteredData([]);
    setShipperWasSelected(shipper);
    setDateWasSelected("");
  };

  const handleGetDate = (e) => {
    setDateWasSelected(e.target.value);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      <input
        type="date"
        value={dateWasSelected}
        onChange={handleGetDate}
        disabled={!shipperWasSelected}
      />
      <div className="displayInfo">
        <h2>Tổng số đơn hàng nhận: {totalNumberOfOrder} sản phẩm </h2>
        <h2>
          Tỷ lệ giao thành công:{" "}
          {((numberOfSucessOrder / totalNumberOfOrder) * 100).toFixed(0)}%
        </h2>
      </div>
      {dateWasSelected ? (
        <AcceptButton style={{ flex: 1 }} content="Xác nhận trả đủ hàng" />
      ) : (
        <RejectButton style={{ flex: 1 }} content="Xác nhận trả đủ hàng" />
      )}
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((data, key) => {
            return (
              <div
                key={data._id}
                className="dataItem"
                onClick={() => handleSelectAnItem(data)}
              >
                <h2>{data.fullName} </h2>
                <h3>SĐT: {data._id}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
