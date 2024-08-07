import { Button, Col, Modal, Row } from "react-bootstrap";

type ResultadosModalProps = {
  isShow: boolean;
  puntaje: number;
  movimientos: number;
  segundos: number;
  minutos: number;

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
      <div className="sombra-interna rounded">
        <Modal.Header className="d-flex justify-content-center text-center">
          <span className="fw-bold fs-1">GAME OVER</span>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Row className="text-center d-flex align-items-center">
            <Col col="6">
              <span className="fs-4 text-white">Movimientos:</span>
            </Col>
            <Col col="6">
              <span className="fw-bold fs-4  text-white">
                {" "}
                {props.movimientos ?? "00"}
              </span>
            </Col>
          </Row>
          <Row className="text-center d-flex align-items-center">
            <Col col="6">
              <span className=" fs-4  text-white">Tiempo total:</span>
            </Col>
            <Col col="6">
              <span className="fw-bold fs-4  text-white">
                {" "}
                {props.minutos ? props.minutos + "m" : "00m"}{" "}
                {props.segundos ? props.segundos + "s" : "00s"}
              </span>
            </Col>
          </Row>
          <Row className="text-center d-flex align-items-center">
            <Col col="6">
              <span className=" fs-4  text-white">Puntaje total:</span>
            </Col>
            <Col col="6">
              <span className="fw-bold fs-4 text-white">
                {" "}
                {props.puntaje > 0 ? props.puntaje : "00"}
              </span>
            </Col>
          </Row>
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
      </div>
    </Modal>
  );
};

export default ResultadosModal;
