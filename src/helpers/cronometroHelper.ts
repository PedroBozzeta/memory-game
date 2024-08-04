export const formatearCronometro = (unidad:number):string => {
    if (unidad <= 9) {
        return  `0${unidad}`
    }
    return unidad.toString()
}