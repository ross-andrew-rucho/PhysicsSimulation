import "../App.css";
import "../App.js";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import * as ROUTES from '../constants/routes';
import { AuthUserContext, withAuthorization } from '../Session';

const HomeScreen = ({ db, auth, simulations }) => {

  const data = {
    loggedIn: false,
    isInstructor: false,
    user: null,
    courses: null,
  };
  
  /*
   * Set an authentication state observer to update screen data
   */
  /*
  auth.onAuthStateChanged((user) => {
    if (user) {
      data.loggedIn = true;
      
      db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.get("UID")==user.uid) {
              data.user = doc.data;
              data.courses = data.user.Courses.map((course) => {db.collection("Courses").doc(course)});
            }
          });
      });
  
      data.user || // Returns false if user data was not identified
      console.log("Error. Authenticated user is not an Instructor or a Student.");
  
    } else {
      data.loggedIn = false;
      data.user = null;
    }
  });
  */

  return (
    <AuthUserContext.Consumer>
    { authUserData => ( 
    <Container>
      <Row className="m-4"> </Row>
      <Row className="mt-5">
        <Col md={4}>
          <Card className="landingPageCard">
            <Card.Header className="bg-secondary">
              <Card.Title className="landingPageCardTitle">
                <span>
                  <i className="fas fa-chart-bar fa-1.5x mr-2"></i>{" "}
                </span>
                Explore Simulations
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ul className="simulationList list-unstyled">
                {simulations.map((sim) => {
                  <li key={sim.Name.toString()}>{sim.Name}</li>
                })}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="landingPageCard">
            <Card.Header className="bg-secondary">
              <Card.Title className="landingPageCardTitle">
                <span>
                  <i className="fas fa-user fa-1.5x mr-2"></i>{" "}
                </span>
                <Link to={ROUTES.PROFILE_SCREEN} class="profile-link">My Profile</Link>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {authUserData['Courses']!= null ? <Container fluid="md" className="class-container">
                <p>Courses:</p>
                  {authUserData['Courses'].map((course, index) => (
                      <p>{course}</p>
                  ))}
              </Container>: <Container><p>You don't have any courses</p></Container>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="m-4"></Row>
    </Container>
            )}
    </AuthUserContext.Consumer>
  );
};
const condition = authUserData => !!authUserData;

export default withAuthorization(condition)(HomeScreen);
