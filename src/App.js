import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Icecream from "./Icecream";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBtn, setActiveBtn] = useState(0);
  // const [filter, setFilter] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://react-corso-api.netlify.app/.netlify/functions/gelateria")
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data.default);
          setFilteredData(response.data.data.default);
          setIsLoading(false);
          setActiveBtn(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterData = (_filter, _btn) => {
    // console.log("filter => ", _filter);
    let newData = [];
    if (_filter) {
      newData = data.filter((item) => item.categoria === _filter);
      setActiveBtn(_btn);
    } else {
      newData = data;
      setActiveBtn(0);
    }
    setFilteredData(newData);
  };

  return (
    <div className="App min-vh-100 ms-bg-primary pb-5">
      <header className="container py-3 ">
        <h1 className="text-capitalize ms-font-arial ">Nice cream</h1>
      </header>
      <main className="container">
        <section>
          <h2 className="text-center fw-semibold">Le nostre scelte</h2>
          <nav className="nav-border w-100 d-flex align-items-center justify-content-between pt-3 pb-2 mb-4">
            <button
              type="button"
              className={
                activeBtn === 0
                  ? "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0 ms-btn-active"
                  : "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              }
              onClick={() => filterData(null, 0)}
            >
              All
            </button>
            <button
              type="button"
              className={
                activeBtn === 1
                  ? "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0 ms-btn-active"
                  : "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              }
              onClick={() => filterData("cono", 1)}
            >
              Cono
            </button>
            <button
              type="button"
              className={
                activeBtn === 2
                  ? "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0 ms-btn-active"
                  : "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              }
              onClick={() => filterData("coppetta", 2)}
            >
              Coppetta
            </button>
            <button
              type="button"
              className={
                activeBtn === 3
                  ? "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0 ms-btn-active"
                  : "btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              }
              onClick={() => filterData("stick", 3)}
            >
              Stick
            </button>
          </nav>
        </section>
        <div className="container">
          <div className="row g-3">
            {!isLoading &&
              filteredData.map((ice) => {
                return (
                  <Icecream
                    key={ice.id}
                    nome={ice.nome}
                    img={ice.img}
                    descrizione={ice.decrizione}
                    prezzo={ice.prezzo}
                    categoria={ice.categoria}
                  ></Icecream>
                );
              })}
            {isLoading && (
              <div className="col-12 d-flex align-items-center justify-content-center py-5">
                <h2 className="text-center">Loading...</h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
