export const formatearCronometro = (unidad: number): string => {
  if (unidad <= 9) {
    return `0${unidad}`
  }
  return unidad.toString()
}

export const handleCronometro = (segundos: number, setSegundos: React.Dispatch<React.SetStateAction<number>>, minutos: number, setMinutos: React.Dispatch<React.SetStateAction<number>>) => {
  if (segundos === 59) {
    setMinutos(minutos + 1);
    setSegundos(0)
  } else {
    setSegundos(segundos + 1);
  }
};



export const reiniciarCronómetro = (setSegundos: React.Dispatch<React.SetStateAction<number>>, setMinutos: React.Dispatch<React.SetStateAction<number>>) => {
  setSegundos(0);
  setMinutos(0);
};