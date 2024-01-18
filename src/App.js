import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [icecream, setIcecream] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeFilter = (filter) => {
    // setFilterFactor(filter);
    setIcecream(filtered);
    setIcecream(icecream.filter((ic) => ic.categoria === filter));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://react-corso-api.netlify.app/.netlify/functions/gelateria")
      .then((response) => {
        if (response.data.success) {
          setIcecream(response.data.data.default);
          setFiltered(icecream);
          setIsLoading(false);
          // console.log(filteredList);
        }
        // console.log(response.data.data.default);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App min-vh-100 ">
      <header className="container py-3 ">
        <h1 className="text-capitalize fw-semibold ">Nice cream</h1>
      </header>
      <main className="container">
        <section>
          <h2 className="text-center fw-semibold">Le nostre scelte</h2>
          <nav className="border-bottom border-muted w-100 d-flex align-items-center justify-content-between py-3">
            <button
              type="button"
              className="btn py-3 px-5 fw-semibold"
              onClick={() => changeFilter(null)}
            >
              All
            </button>
            <button
              type="button"
              className="btn py-3 px-5 fw-semibold"
              onClick={() => changeFilter("cono")}
            >
              Cono
            </button>
            <button
              type="button"
              className="btn py-3 px-5 fw-semibold"
              onClick={() => changeFilter("coppetta")}
            >
              Coppetta
            </button>
            <button
              type="button"
              className="btn py-3 px-5 fw-semibold"
              onClick={() => changeFilter("stick")}
            >
              Stick
            </button>
          </nav>
        </section>
        <div className="row row-cols-1 row-cols-lg-2 g-5 ">
          {!isLoading &&
            icecream.map((ice) => {
              return <div key={ice.id}>{ice.nome}</div>;
            })}
          {isLoading && <h2>Loading...</h2>}
        </div>
      </main>
    </div>
  );
}

export default App;
