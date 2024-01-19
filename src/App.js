import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Icecream from "./Icecream";

function App() {
  const [icecream, setIcecream] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://react-corso-api.netlify.app/.netlify/functions/gelateria")
      .then((response) => {
        if (response.data.success) {
          setIcecream(response.data.data.default);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterData = (_filter) => {
    console.log("filter => ", _filter);
  };

  return (
    <div className="App min-vh-100 ms-bg-primary">
      <header className="container py-3 ">
        <h1 className="text-capitalize ms-font-arial ">Nice cream</h1>
      </header>
      <main className="container">
        <section>
          <h2 className="text-center fw-semibold">Le nostre scelte</h2>
          <nav className="nav-border w-100 d-flex align-items-center justify-content-between pt-3 pb-2 mb-4">
            <button
              type="button"
              className="btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              onClick={() => filterData(null)}
            >
              All
            </button>
            <button
              type="button"
              className="btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              onClick={() => filterData("cono")}
            >
              Cono
            </button>
            <button
              type="button"
              className="btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              onClick={() => filterData("coppetta")}
            >
              Coppetta
            </button>
            <button
              type="button"
              className="btn py-2 px-3 ms-font-arial ms-fs-xs text-uppercase ms-filter-btn rounded-0"
              onClick={() => filterData("stick")}
            >
              Stick
            </button>
          </nav>
        </section>
        <div className="container">
          <div className="row g-3">
            {!isLoading &&
              icecream.map((ice) => {
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
