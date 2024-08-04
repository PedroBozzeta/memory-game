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
      centered={true}
      className="modal-fade"
    >
      <Modal.Header className="d-flex justify-content-center text-center">
        <h4>Juego Terminado</h4>
      </Modal.Header>
      <Modal.Body>
        <h3 className="text-center">
          Tu puntaje fue de{" "}
          <span className="fw-bold">
            {" "}
            {props.puntaje > 0 ? props.puntaje : "00"}
          </span>
        </h3>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-around">
        <Button
          variant="dark"
          onClick={() => {
            props.reiniciar();
            console.log("Button");
          }}
          size="lg"
        >
          Reiniciar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultadosModal;
