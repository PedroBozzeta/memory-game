import { Button, Modal } from "react-bootstrap";
import data from "../../data/format.json";
import { DificultadType } from "../../types/DificultadType";

type ResultadosModalProps = {
  isShow: boolean;
  setDificultad: (dificultad: DificultadType) => void;
};
const InicioModal = (props: ResultadosModalProps) => {
  return (
    <Modal
      backdrop="static"
      show={props.isShow}
      centered={true}
      className="modal-fade sombra"
    >
      <Modal.Header className="d-flex justify-content-center bg-info">
        <img className="img-inicio-logo" src="/logo.png" alt="logo" />
      </Modal.Header>
      <Modal.Body className="align-middle text-center bg-dark">
        <span className="text-center fs-4 fw-bold text-white">
          SELECCIONE LA DIFICULTAD
        </span>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-around bg-dark-emphasis">
        <Button
          variant="dark"
          onClick={() => props.setDificultad(data.dificultad.facil)}
          size="lg"
        >
          Fácil
        </Button>
        <Button
          variant="dark"
          onClick={() => props.setDificultad(data.dificultad.normal)}
          size="lg"
        >
          Normal
        </Button>
        <Button
          variant="dark"
          onClick={() => props.setDificultad(data.dificultad.dificil)}
          size="lg"
        >
          Dificil
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InicioModal;
