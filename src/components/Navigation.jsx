import { Container,Nav, Navbar} from "react-bootstrap";
import { useHistory } from "react-router";


export default function Navigation(){
    const history = useHistory();
    return(
        <>
        <Navbar bg="primary" variant="light">
        <Container fluid>
        <Nav className="me-auto">
        <Nav.Link style={{color:"white"}} onClick={()=>{
            localStorage.removeItem("userInfo");
            history.push("/");
        }} href="/">Log Out</Nav.Link><br/>
        <Nav.Link style={{color:"white"}} href="/events/view">View Events</Nav.Link><br/>
        <Nav.Link style={{color:"white"}} href="/events/add">Add Events</Nav.Link><br/>
        </Nav>
        </Container>
        </Navbar> 
    </>
    );
}

