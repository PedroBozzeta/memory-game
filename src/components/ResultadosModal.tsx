import { Button, Modal } from "react-bootstrap";

type ResultadosModalProps = {
  isShow: boolean;
  puntaje: number;
  onHide: () => void;
  closeModal: () => void;
  reiniciar: () => void;
};
const ResultadosModal = (props: ResultadosModalProps) => {
  return (
    <Modal
      backdrop="static"
      show={props.isShow}
      size="sm"
      centered={true}
      className="modal-fade"
    >
      <Modal.Header className="d-flex justify-content-center">
        <h4>Juego Terminado</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Tu puntaje fue de {props.puntaje}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.reiniciar();
            console.log("Button");
          }}
        >
          Reiniciar
        </Button>
        <Button
          onClick={() => {
            props.closeModal();
            console.log("Button");
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultadosModal;
