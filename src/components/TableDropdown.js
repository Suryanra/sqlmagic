import React, { useContext, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import './style/TableDropdown.css'
import AppContext from "../context/AppContext";

const TableDropdown = ({ setShowTermianl}) => {
  const options = ["Employee Data", "Teacher Data", "Orders Data", "Courses Data","Customer Data"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { setQuery,setPath,query } = useContext(AppContext);

  const handleSelect = (option) => {
    if (option.value === "Employee Data") {
      setPath("/data/employees.csv");
    } else if (option.value === "Teacher Data") {
      setPath("/data/teachers.csv");
    } else if (option.value === "Orders Data") {
      setPath("/data/orders.csv");
    }else if (option.value === "Courses Data") {
      setPath("/data/courses.csv");
    }else if (option.value === "Customer Data") {
      setPath("/data/customers.csv");
    }else {
      setPath("/data/orders.csv");
    }
    setShowTermianl(true);
    console.log("Executing query:", query);
};




  return (
    <Dropdown
className="my-dropdown"
      controlClassName="my-control"
      menuClassName="my-menu"
      placeholderClassName="my-placeholder"
      arrowClassName="my-arrow"
      options={options}
      onChange={handleSelect}
      value={selectedOption}
      placeholder="Select a table"
    />
  );
};

export default TableDropdown;
