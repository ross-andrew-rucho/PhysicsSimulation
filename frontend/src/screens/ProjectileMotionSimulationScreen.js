import { Card, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import QandA from "../components/QandA";
import SimulationContainerComponent from "../components/SimulationContainerComponent";
import GraphCanvasComponent from "../components/GraphCanvasComponent";

const ProjectileMotionSimulationScreen = ({ data, assignment }) => {
  const { questions } = assignment;
  const [qIndex, setqIndex] = useState(1);

  const { simulation } = assignment;
  const { simName, simSrcPath, simVariables } = simulation;

  // Temp data for testing graphing
  const [graph1, setGraph1] = useState([]);
  const [graph2, setGraph2] = useState([]);
  const [graph3, setGraph3] = useState([]);
  const [graph4, setGraph4] = useState([]);
  // TODO: do something real with the points that we recieve.
  // Also, the simulation seems to dispatch more messages than we send
  // of its own free will, so maybe we should do some verification that
  // the message we got is actually a data point object.

  // function for building an array for a given independent and dependent variable
  // Processes data from simulation in order to prepare to graph
  // Returns array
  const buildPointArray = (ind, dep) => {};

  const handleNewPoint = function (e) {
    if (e.data.t === 0) {
      setGraph1([e.data.px, e.data.py]);
      setGraph2([e.data.t, e.data.py]);
      setGraph3([e.data.t, e.data.px]);
      setGraph4([e.data.t, e.data.vy]);
    } else {
      setGraph1([...graph1, e.data.px, e.data.py]);
      setGraph2([...graph2, e.data.t, e.data.py]);
      setGraph3([...graph3, e.data.t, e.data.px]);
      setGraph4([...graph4, e.data.t, e.data.vy]);
    }
  };

  // This sets up the communication between the frontend and the simulation
  // when the screen is rendered.
  useEffect(() => {
    window.addEventListener("message", handleNewPoint);
    return function cleanup() {
      window.removeEventListener("message", handleNewPoint);
    };
  });

  return (
    <Container className="simulation-container">
      <Row className="d-md-flex justify-content-center">
        <Col
          sm={12}
          md={8}
          className="d-flex d-md-block align-content-center justify-content-center"
        >
          <Container>
            <Row className="mt-4 pt-3">
              <Col className="d-flex justify-content-center">
                <SimulationContainerComponent
                  simVariables={simVariables}
                  simName={simName}
                  simSrcPath={simSrcPath}
                />
              </Col>
            </Row>
            <Row className="my-5 justify-content-center mt-5 graph-container d-md-flex d-none ">
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      PositionX vs PositionY
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph1}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Time vs. PositionY
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph2}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-5 justify-content-center mt-5 graph-container d-md-flex d-none ">
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Time vs PositionX
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph3}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Time vs. Y Velocity
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph4}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="my-5 d-md-none d-xs-flex flex-xs-row">
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Position vs Time
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph1}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-5 d-md-none d-xs-flex flex-xs-row">
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Time vs PositionY
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph2}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-5 d-md-none d-xs-flex flex-xs-row">
              <Col className="graph my-5">
                <Card className="d-flex graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Time vs PositionX
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph3}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-5 d-md-none d-xs-flex flex-xs-row">
              <Col className="graph my-5">
                <Card className="d-flex align-content-center graph-card">
                  <Card.Header className="graph-card-header d-flex">
                    <Card.Title className="mr-auto card-title">
                      Time vs Y Velocity
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="graph-card-body">
                    <Container className="d-flex justify-content-center align-content-center">
                      <GraphCanvasComponent
                        className="bg-white"
                        points={graph4}
                      />
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="d-none d-md-flex mt-5 align-content-center text-center questions-card-col">
          <Card className="d-flex align-self-center questions-card">
            <Card.Header>
              <Container className="d-flex align-content-center">
                <span className="mr-auto">
                  <button
                    type="button"
                    className={
                      "btn btn-outline scroll-btn" +
                      (qIndex === 1 ? " disabled" : " not-disabled")
                    }
                    onClick={() => {
                      qIndex - 1 > 0 && setqIndex((prev) => prev - 1);
                    }}
                  >
                    <i className="fas fa-angle-left"></i>
                  </button>
                </span>
                <span className="align-self-center">
                  Question {qIndex} of {questions.length}
                </span>
                <span className="ml-auto">
                  <button
                    type="button"
                    className={
                      "btn btn-outline scroll-btn" +
                      (qIndex === questions.length
                        ? " disabled"
                        : " not-disabled")
                    }
                    onClick={() => {
                      qIndex + 1 < questions.length + 1 &&
                        setqIndex((prev) => prev + 1);
                    }}
                  >
                    <i className="fas fa-angle-right"></i>
                  </button>
                </span>
              </Container>
            </Card.Header>
            <Card.Body className="questions-card-body">
              <Card.Title className="card-title my-4">
                Answer These Questions
              </Card.Title>
              <Row className="d-flex justify-content-center p-2 my-4">
                <QandA />
              </Row>
              <Row className="d-flex justify-content-center">
                <h2 className="question-sub-header">PUT TEXT HERE</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci commodi delectus deleniti dolor dolorem est facilis
                  hic impedit, in laboriosam magnam nisi nulla possimus, quaerat
                  quibusdam rem saepe tenetur velit?
                </p>
              </Row>
              <Row className="d-flex justify-content-center">
                <h2 className="question-sub-header">PUT TEXT HERE</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci commodi delectus deleniti dolor dolorem est facilis
                  hic impedit, in laboriosam magnam nisi nulla possimus, quaerat
                  quibusdam rem saepe tenetur velit?
                </p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Row className="d-flex d-md-none my-5">
          <Card className="d-flex align-self-center questions-card">
            <Card.Header>
              <Container className="d-flex align-content-center">
                <span className="mr-auto">
                  <button
                    type="button"
                    className={
                      "btn btn-outline scroll-btn" +
                      (qIndex === 1 ? " disabled" : " not-disabled")
                    }
                    onClick={() => {
                      qIndex - 1 > 0 && setqIndex((prev) => prev - 1);
                    }}
                  >
                    <i className="fas fa-angle-left"></i>
                  </button>
                </span>
                <span className="align-self-center">
                  Question {qIndex} of {questions.length}
                </span>
                <span className="ml-auto">
                  <button
                    type="button"
                    className={
                      "btn btn-outline scroll-btn" +
                      (qIndex === questions.length
                        ? " disabled"
                        : " not-disabled")
                    }
                    onClick={() => {
                      qIndex + 1 < questions.length + 1 &&
                        setqIndex((prev) => prev + 1);
                    }}
                  >
                    <i className="fas fa-angle-right"></i>
                  </button>
                </span>
              </Container>
            </Card.Header>
            <Card.Body className="questions-card-body">
              <Card.Title className="card-title my-4">
                Answer These Questions
              </Card.Title>
              <Row className="d-flex justify-content-center p-2 my-4">
                <QandA />
              </Row>
              <Row className="d-flex justify-content-center">
                <h2 className="question-sub-header">PUT TEXT HERE</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci commodi delectus deleniti dolor dolorem est facilis
                  hic impedit, in laboriosam magnam nisi nulla possimus, quaerat
                  quibusdam rem saepe tenetur velit?
                </p>
              </Row>
              <Row className="d-flex justify-content-center">
                <h2 className="question-sub-header">PUT TEXT HERE</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci commodi delectus deleniti dolor dolorem est facilis
                  hic impedit, in laboriosam magnam nisi nulla possimus, quaerat
                  quibusdam rem saepe tenetur velit?
                </p>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Row>
    </Container>
  );
};

export default ProjectileMotionSimulationScreen;
