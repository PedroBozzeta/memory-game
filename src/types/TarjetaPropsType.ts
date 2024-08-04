import { TarjetaDataType } from "./TarjetaDataType";

export type TarjetaPropsType = {
    index: number;
    url: string;
    elementoActivo: TarjetaDataType;
    setElementoActivo: (data: TarjetaDataType, setCongelado: React.Dispatch<React.SetStateAction<boolean>>) => void;
    setCongeladoRef: (fn: React.Dispatch<React.SetStateAction<boolean>>) => void;
    activoSegundo?: TarjetaDataType;

};

