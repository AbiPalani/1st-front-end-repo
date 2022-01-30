import { Container,Nav, Navbar} from "react-bootstrap";
import "./index.css";
import styled from "styled-components";
import { mobile } from "./responsive";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: none;
  height: 100vh;
  width: 100vw;
  ${mobile({
    width: "100vw",
  })}
`;

function Home(){
    
    return(
        <>
        <MainContainer>
        <div>
        <Navbar bg="primary" variant="light">
        <Container fluid>
        <Nav className="justify-content-center">
        <img alt="icon "style={{height:"60px", widht:"60px"}} src="https://www.freeiconspng.com/thumbs/diary-icon/pink-diary-icon-notebook-pencil-journal-7.png"/>
        <Nav.Link style={{color:"black"}} href="/users/login">Login</Nav.Link><br/>
        <Nav.Link style={{color:"black"}} href="/users/register">Register</Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        </div><br/>
        </MainContainer>
        </>
    );
}

export default Home;