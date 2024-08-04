export type TarjetaDataType = {
    url: string;
    index: number | null;
    segundaTarjetaActivada?: boolean;
}
export const defaultTarjetaData: TarjetaDataType = {
    url: "",
    index: null
}