import { useEffect, useRef, useState } from "react";
import data from "./data/format.json";
import Card from "./components/Card";
import { defaultTarjetaData, TarjetaDataType } from "./types/TarjetaDataType";
import { mezclarArray } from "./helpers/shuffleArray";

const App = () => {
  const [cantidadCartas, setCantidadCartas] = useState<number>(
    data.dificultad.facil.cantidad
  );
  const refs = useRef<{
    [key: number]: React.Dispatch<React.SetStateAction<boolean>>;
  }>({});
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [activoPrimero, setActivoPrimero] =
    useState<TarjetaDataType>(defaultTarjetaData);
  const [activoSegundo, setActivoSegundo] =
    useState<TarjetaDataType>(defaultTarjetaData);

  const handleTarjetaActivada = (
    data: TarjetaDataType,
    setCongelado: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if ((activoPrimero.url === "", activoPrimero.index === null)) {
      setActivoPrimero(data);
      console.log("Primera tarjeta");
      console.log(data.index);
    } else {
      if (activoPrimero.index === data.index) {
        setActivoPrimero(defaultTarjetaData);
      } else if (activoPrimero.url === data.url) {
        setCongelado(true);
        if (refs.current[activoPrimero.index]) {
          refs.current[activoPrimero.index](true);
        }

        limpiarActivos();
      } else {
        setActivoSegundo({
          ...data,
          segundaTarjetaActivada: true,
        });
        console.log("Segunda tarjeta");
        console.log(data.index);
        setTimeout(() => {
          limpiarActivos();
        }, 600);
      }
    }
  };

  const limpiarActivos = () => {
    setActivoPrimero(defaultTarjetaData);
    setActivoSegundo(defaultTarjetaData);
  };

  useEffect(() => {
    const imagenesContadas: string[] = mezclarArray(data.imagenes)
      .slice(0, cantidadCartas / 2)
      .flatMap((i) => Array(2).fill(i));

    setImagenes(mezclarArray(imagenesContadas));
  }, [cantidadCartas]);

  return (
    <main>
      <section className="card-group bg-dark vh-100 col-12 d-flex justify-content-center">
        <ul className="d-flex col-12 md:col-9 flex-wrap  justify-content-center align-items-center ">
          {imagenes.map((imagen, index) => (
            <Card
              key={index}
              index={index}
              url={imagen}
              elementoActivo={activoPrimero}
              setElementoActivo={handleTarjetaActivada}
              activoSegundo={activoSegundo}
              setCongeladoRef={(fn) => {
                refs.current[index] = fn;
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;
