import "./App.css";
import SearchBar from "./SearchBar";
import AddItem from "./AddItem";
import { useState } from "react";
import ItemsDisplay from "./ItemsDisplay";
import styled from "styled-components"; //have a look at this documentation

function App() {
  const [filters, setFilters] = useState({
    name: "",
    price: 0,
    type: "",
    brand: "",
  });
  const [data, setData] = useState({ items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const addItemtoData = (item) => {
    let items = data.items;
    item.id = items.length;
    items.push(item);
    setData({ items });

    console.log(data);
  };

  const filterData = (data) => {
    const filteredData = [];

    if (!filters.name) {
      return data;
    }

    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }

      if (filters.price !== 0 && item.price > filters.price) {
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }

      filteredData.push(item);
    }

    return filterData;
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay items={filterData(data.items)} />
      </div>

      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>

      <div className="row mt-3">
        <AddItem addItem={addItemtoData} />
      </div>
    </div>
  );
}

export default App;
