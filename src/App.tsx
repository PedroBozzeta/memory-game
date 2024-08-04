import { useEffect, useRef, useState } from "react";
import data from "./data/format.json";
import Card from "./components/Card";
import { defaultTarjetaData, TarjetaDataType } from "./types/TarjetaDataType";
import { mezclarArray } from "./helpers/shuffleArray";
import ResultadosModal from "./components/modals/ResultadosModal";
import InicioModal from "./components/modals/InicioModal";
import { formatearCronometro } from "./helpers/cronometroHelper";
import { defaultDificultad, DificultadType } from "./types/DificultadType";
import { Button } from "react-bootstrap";
const App = () => {
  const [cantidadCartas, setCantidadCartas] = useState<number>(0);
  const [dificultad, setDificultad] =
    useState<DificultadType>(defaultDificultad);
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
  const [showResultadosModal, setShowResultadosModal] = useState<boolean>(true);
  const [showInicioModal, setShowInicioModal] = useState<boolean>(true);
  const [reinicio, setReinicio] = useState<boolean>(false);
  const [segundos, setSegundos] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(0);
  const [puntaje, setPuntaje] = useState<number>(0);

  const handleCronometro = () => {
    if (cantidadCartas !== 0) {
      if (segundos == 59) {
        setSegundos(0);
        setMinutos(minutos + 1);
      } else {
        setSegundos(segundos + 1);
      }
    }
  };

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

  const handleSeleccionInicio = (dificultad: DificultadType) => {
    setCantidadCartas(dificultad.cantidad);
    setDificultad(dificultad);
    setShowInicioModal(false);
  };
  const resetGame = () => {
    limpiarActivos();
    setCongelados({});
    setMovimientos(0);
    setPuntaje(0);
    setImagenes([]);
    setSegundos(0);
    setMinutos(0);
    refs.current = {};
    closeModal();
    setCantidadCartas(defaultDificultad.cantidad);
    setDificultad(defaultDificultad);
    setShowInicioModal(true);
    setReinicio(true);
  };

  const calcularPuntaje = () => {
    const penalizaciónMovimientos = movimientos - dificultad.cantidad;
    const tiempoDeGracia = dificultad.tiempoMax - (minutos * 60 + segundos);
    setPuntaje(1000 + penalizaciónMovimientos * 3 + tiempoDeGracia * 5);
  };
  const closeModal = () => {
    setShowResultadosModal(false);
    console.log("Cierra modal");
  };
  useEffect(() => {
    if (cantidadCartas !== 0 && !checkIfAllCardsAreFrozen()) {
      setTimeout(handleCronometro, 1000);
    }
  }, [cantidadCartas, segundos]);

  useEffect(() => {
    if (cantidadCartas !== 0 && checkIfAllCardsAreFrozen()) {
      calcularPuntaje();
      setShowResultadosModal(true);
      console.log("todos congelados");
    }
  }, [congelados]);

  useEffect(() => {
    if (cantidadCartas !== 0) {
      const imagenesContadas: string[] = mezclarArray(data.imagenes)
        .slice(0, cantidadCartas / 2)
        .flatMap((i) => Array(2).fill(i));

      setImagenes(mezclarArray(imagenesContadas));
      setReinicio(false);
      setSegundos(0);
      setMinutos(0);
    }
  }, [cantidadCartas, reinicio]);

  return (
    <main>
      <section className="card-group bg-dark col-12 d-flex justify-content-center sm:align-items-center min-vh-100">
        {cantidadCartas !== 0 && (
          <div
            className="d-flex justify-content-around align-items-center col-12 bg-black rounded p-2 nav"
            // style={{ height: "50px" }}
          >
            <Button className="nav-button" disabled variant="dark">
              Tiempo: {formatearCronometro(minutos)}:
              {formatearCronometro(segundos)}
            </Button>
            <Button className="nav-button" disabled variant="dark">
              Dificultad: {dificultad.nombre.toUpperCase()}
            </Button>

            <Button
              className="nav-button"
              variant="outline-light"
              onClick={() => resetGame()}
            >
              Reiniciar
            </Button>
          </div>
        )}

        <ul className="d-flex col-md-9 col-12 justify-content-center align-items-center flex-wrap contenedor mt-5">
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
        isShow={showResultadosModal}
        onHide={closeModal}
        closeModal={closeModal}
        puntaje={puntaje}
        reiniciar={resetGame}
      />
      <InicioModal
        isShow={showInicioModal}
        setDificultad={handleSeleccionInicio}
      ></InicioModal>
    </main>
  );
};

export default App;
