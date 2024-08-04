import { useEffect, useRef, useState } from "react";
import data from "./data/format.json";
import Card from "./components/Card";
import { defaultTarjetaData, TarjetaDataType } from "./types/TarjetaDataType";
import { mezclarArray } from "./helpers/shuffleArray";
import ResultadosModal from "./components/ResultadosModal";

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
  const [congelados, setCongelados] = useState<{ [key: number]: boolean }>({});
  const [movimientos, setMovimientos] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [reinicio, setReinicio] = useState<boolean>(false);
  const handleTarjetaActivada = (
    data: TarjetaDataType,
    setCongelado: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setMovimientos(movimientos + 1);
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
        setCongelados((prev) => ({
          ...prev,
          [activoPrimero.index as number]: true,
          [data.index as number]: true,
        }));
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

  const checkIfAllCardsAreFrozen = () => {
    return (
      Object.values(congelados).length === cantidadCartas &&
      Object.values(congelados).every((v) => v)
    );
  };

  const limpiarActivos = () => {
    setActivoPrimero(defaultTarjetaData);
    setActivoSegundo(defaultTarjetaData);
  };

  const resetGame = () => {
    limpiarActivos();
    setCongelados({});
    setMovimientos(0);
    setCantidadCartas(data.dificultad.facil.cantidad);
    setImagenes([]);
    refs.current = {};
    closeModal();
    setReinicio(true);
  };
  const closeModal = () => {
    setShow(false);
    console.log("Cierra modal");
  };
  useEffect(() => {
    if (checkIfAllCardsAreFrozen()) {
      setShow(true);
    }
  }, [congelados]);
  useEffect(() => {
    const imagenesContadas: string[] = mezclarArray(data.imagenes)
      .slice(0, cantidadCartas / 2)
      .flatMap((i) => Array(2).fill(i));

    setImagenes(mezclarArray(imagenesContadas));
    setReinicio(false);
  }, [cantidadCartas, reinicio]);

  return (
    <main>
      <section className="card-group bg-dark vh-100 col-12 d-flex justify-content-center align-items-center">
        <ul className="d-flex flex-wrap  justify-content-center align-items-center bg-primary">
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
      <ResultadosModal
        isShow={show}
        onHide={closeModal}
        closeModal={closeModal}
        puntaje={movimientos}
        reiniciar={resetGame}
      />
    </main>
  );
};

export default App;
