import React from "react";
import {BrowserRouter,Route,Redirect} from "react-router-dom";
import {Switch} from "react-router";
import {Container} from "react-bootstrap";
import Events from "./pages/events/Events";
import ViewEvents from "./pages/events/ViewEvents";
import "./index.css";
import Home from "./Home";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import ForgetPassword from "./pages/users/ForgetPassword";


function App(){
        
    const user = {
        user:JSON.parse(localStorage.getItem("user"))
    }
    let noUser;
    let userTrue;
    if(!user.user){
        noUser=true;
        userTrue=false;
    }else{
        noUser=false;
        userTrue=true;
    }
    console.log(user.user)

    return(
        <BrowserRouter>
        <Container fluid>
        <Switch>
        <Route exact path="/" exact component={Home}/>
        <Route path="/users/register" exact component={Register}/>
        <Route path ="/users/login" exact component={Login}/>
        <Route exact path="/">
            {userTrue && <Redirect exact to="/events/view"/>}
            {userTrue && <Redirect exact to="/events/add"/>}
        </Route>
        <Route path="/password" exact component={ForgetPassword}/>
        <Route path="/events/view" exact components ={ViewEvents}/>
        <Route path="/events/add" exact component={Events}/> 
        </Switch>
        </Container>
        </BrowserRouter>
    )
};


export default App;




