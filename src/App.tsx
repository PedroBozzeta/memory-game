import { useEffect, useRef, useState } from "react";
import data from "./data/format.json";
import Card from "./components/Card";
import { defaultTarjetaData, TarjetaDataType } from "./types/TarjetaDataType";
import { mezclarArray } from "./helpers/shuffleArray";
import ResultadosModal from "./components/modals/ResultadosModal";
import InicioModal from "./components/modals/InicioModal";
import {
  formatearCronometro,
  handleCronometro,
  reiniciarCronómetro,
} from "./helpers/cronometroHelper";
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
  const [showResultadosModal, setShowResultadosModal] =
    useState<boolean>(false);
  const [showInicioModal, setShowInicioModal] = useState<boolean>(true);
  const [reinicio, setReinicio] = useState<boolean>(false);
  const [segundos, setSegundos] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(0);
  const [puntaje, setPuntaje] = useState<number>(0);
  const [finalizado, setFinalizado] = useState<boolean>(false);

  const handleTarjetaActivada = (
    data: TarjetaDataType,
    setCongelado: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setMovimientos(movimientos + 1);

    if ((activoPrimero.url === "", activoPrimero.index === null)) {
      setActivoPrimero(data);
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
        setTimeout(() => {
          limpiarActivos();
        }, 600);
      }
    }
  };

  const checkIfAllCardsAreFrozen = () => {
    if (
      Object.values(congelados).length === cantidadCartas &&
      cantidadCartas !== 0 &&
      Object.values(congelados).every((v) => v)
    ) {
      setFinalizado(true);
      calcularPuntaje();
      setShowResultadosModal(true);
    }
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
    refs.current = {};
    closeModal();
    setCantidadCartas(defaultDificultad.cantidad);
    setDificultad(defaultDificultad);
    setShowInicioModal(true);
    setReinicio(true);
    reiniciarCronómetro(setSegundos, setMinutos);
    setFinalizado(false);
  };

  const calcularPuntaje = () => {
    const penalizaciónMovimientos = movimientos - dificultad.cantidad;
    const tiempoDeGracia = dificultad.tiempoMax - (minutos * 60 + segundos);
    setPuntaje(1000 + penalizaciónMovimientos * 3 + tiempoDeGracia * 5);
  };
  const closeModal = () => {
    setShowResultadosModal(false);
  };

  // Contador de cronómetro
  useEffect(() => {
    let intervaloRef: NodeJS.Timeout | null = null;
    if (cantidadCartas !== 0 && !finalizado) {
      if (intervaloRef) clearInterval(intervaloRef);
      intervaloRef = setInterval(() => {
        handleCronometro(segundos, setSegundos, minutos, setMinutos);
      }, 100);
    } else if (finalizado && intervaloRef) {
      clearInterval(intervaloRef);
    }

    return () => {
      if (intervaloRef) clearInterval(intervaloRef);
    };
  }, [cantidadCartas, finalizado, segundos]);

  //Verificar si todas las cartas fueron activadas
  // useEffect(() => {
  //   if (cantidadCartas !== 0 && finalizado) {
  //     calcularPuntaje();
  //     setShowResultadosModal(true);
  //   }
  // }, [finalizado]);

  useEffect(() => {
    checkIfAllCardsAreFrozen();
  }, [congelados]);

  //Manejar inicio y reinicio de aplicación
  useEffect(() => {
    if (cantidadCartas !== 0) {
      const imagenesContadas: string[] = mezclarArray(data.imagenes)
        .slice(0, cantidadCartas / 2)
        .flatMap((i) => Array(2).fill(i));

      setImagenes(mezclarArray(imagenesContadas));
      reiniciarCronómetro(setSegundos, setMinutos);
      setReinicio(false);
    }
  }, [cantidadCartas, reinicio]);

  return (
    <main>
      <section className="col-12 d-flex justify-content-center sm:align-items-center min-vh-100 bg-degradado-azul">
        {cantidadCartas !== 0 && (
          <div className="d-flex justify-content-around align-items-center col-12 bg-black nav">
            <span className="nav-button col-3 bg-dark rounded text-white text-center texto-espaciado">
              Tiempo: {formatearCronometro(minutos)}:
              {formatearCronometro(segundos)}
            </span>
            <span className="nav-button col-3 bg-dark rounded text-white text-center texto-espaciado">
              Dificultad: {dificultad.nombre.toUpperCase()}
            </span>

            <Button
              className="nav-button col-3 texto-espaciado"
              variant="outline-light"
              size="sm"
              onClick={() => resetGame()}
            >
              Reiniciar
            </Button>
          </div>
        )}

        <div className="d-flex justify-content-center align-items-center flex-wrap col-md-9 col-12   rounded contenedor mt-5">
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
        </div>
      </section>
      <ResultadosModal
        isShow={showResultadosModal}
        onHide={closeModal}
        closeModal={closeModal}
        puntaje={puntaje}
        reiniciar={resetGame}
        movimientos={movimientos}
        segundos={segundos}
        minutos={minutos}
      />
      <InicioModal
        isShow={showInicioModal}
        setDificultad={handleSeleccionInicio}
      ></InicioModal>
    </main>
  );
};

export default App;
