import "./App.css";
import SearchBar from "./SearchBar";
import AddItem from "./AddItem";
import { useState, useEffect } from "react";
import ItemsDisplay from "./ItemsDisplay";
//import styled from "styled-components"; //have a look at this documentation

function App() {
  const [filters, setFilters] = useState({
    name: "",
    price: 0,
    type: "",
    brand: "",
  });

  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setData({ items: data }));
  }, []);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = (item) => {
    const items = data.items;
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items });
        }
      }
    );
  };

  const addItemtoData = (item) => {
    let items = data.items;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        items.push(data);
        setData({ items });
      });
  };

  const filterData = (data) => {
    const filteredData = [];

    // if (
    //   //if there are no filters
    //   filters.name === "" &&
    //   filters.price === 0 &&
    //   filters.brand === "" &&
    //   filters.type === ""
    // ) {
    //   return data;
    // }

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

    return filteredData;
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay deleteItem={deleteItem} items={filterData(data.items)} />
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
