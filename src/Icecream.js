import "./Icecram.css";

const Icecream = ({ nome, img, descrizione, prezzo, categoria }) => {
  const formattedPrice = (price) => {
    return (price / 100).toFixed(2);
  };

  return (
    <div className="col-12 col-lg-6">
      <div className="h-100 card-body d-flex align-items-center justify-content-between gap-5 ms-bg-secondary text-dark rounded-3 shadow-sm">
        <div className="p-1 m-2 bg-light rounded-1">
          <img
            src={img}
            alt={nome}
            className="img-fluid img rounded-2"
          ></img>
        </div>
        <div className="w-100 px-3 pt-2">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h6 className="fw-semibold mb-0 text-capitalize">{nome}</h6>
            <span className="badge ms-bg-tertiary">
              {formattedPrice(prezzo)} €
            </span>
          </div>
          <small className="fw-semibold ms-fs-xs">{categoria}</small>
          <hr className="my-0"></hr>
          <p>{descrizione}</p>
        </div>
      </div>
    </div>
  );
};

export default Icecream;
