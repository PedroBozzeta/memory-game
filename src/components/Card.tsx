import { TarjetaPropsType } from "../types/TarjetaPropsType";
import { useEffect, useState } from "react";

const Card = ({
  index,
  url,
  elementoActivo,
  setElementoActivo,
  setCongeladoRef,
  activoSegundo,
}: TarjetaPropsType) => {
  const [congelado, setCongelado] = useState<boolean>(false);
  const handleClickOnCard = () => {
    setElementoActivo({ url, index }, setCongelado);
    console.log("Elemento Activo");
    console.log(elementoActivo);
  };

  useEffect(() => {
    setCongeladoRef(setCongelado);
  }, [setCongeladoRef]);
  return (
    <div
      key={index}
      className={`tarjeta cursor-pointer col-2 bg-light ${
        (elementoActivo.index === index ||
          (activoSegundo?.index === index &&
            activoSegundo.segundaTarjetaActivada) ||
          congelado) &&
        "active"
      }  ${congelado && "congelado"}`}
      onClick={() => {
        if (!congelado) handleClickOnCard();
      }}
    >
      {/* Este es el contenido {index + 1} */}
      <div className={`front`}>
        <img className="img-tarjeta" src="/logo.png" />
      </div>
      <div className="back ">
        <img className="img-tarjeta" src={url} />
      </div>
    </div>
  );
};

export default Card;
