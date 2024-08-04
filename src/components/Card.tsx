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
    <li
      key={index}
      className={`tarjeta cursor-pointer col-2 ${
        (elementoActivo.index === index ||
          (activoSegundo?.index === index &&
            activoSegundo.segundaTarjetaActivada) ||
          congelado) &&
        "active"
      } bg-white`}
      onClick={() => {
        handleClickOnCard();
      }}
    >
      {/* Este es el contenido {index + 1} */}
      <div className={`front`}>
        <img src="/img/logo.png" />
      </div>
      <div className="back">
        <img src={url} />
      </div>
    </li>
  );
};

export default Card;
