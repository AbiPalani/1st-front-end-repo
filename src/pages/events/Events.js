import axios from "axios";
import React,{useState} from "react";
import {useHistory} from "react-router";
import Navigation from "../../components/Navigation";
import ViewCalendar from "./ViewCalendar";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import "../../form.css";


import { mobile } from "../../responsive";

const Maincontainer = styled.div`
  background-color:none;
  margin: px 0px;
  height: 100vh;
  width: 100vw;
  color: white;
  ${mobile({
    width: "100vw",
  })}
`;

export default function Events (){
  const history = useHistory();
  const [eventData,setEventData] = useState([]);
  const [eventId,setEventId] = useState("");
  const [eventTitle,setEventTitle]= useState("");
  const [eventDate,setEventDate] = useState("");
  const [eventDay,setEventDay] = useState("");
  const [eventTime,setEventTime] = useState("");
  const [description,setDescription] = useState("");


  const addEvent = async () => {
    await axios.post("https://first-backend-abi.herokuapp.com/events/add",{
        _id:eventId,
        title:eventTitle,
        date:eventDate,
        day:eventDay,
        time:eventTime,
        description:description
    }).then((response)=>{
        console.log(response.data);
        if(response)
        history.push("/events/view");
    })
  };

  const updateEvent = async(_id)=>{
    try{
        const {eventData:event} = await axios.put(`https://first-backend-abi.herokuapp.com/events/add/${_id}`,{title:"",
        date:"",
        day:"",
        time:"",
        description:""}).then
        const index = eventData.findIndex((event)=>event._id === _id);
        eventData[index] = event;
        setEventData(event);
    }catch(err){
        console.log(err,"updating error");
    }
  };

  const handleSubmit =(event)=>{
    event.preventDefault();
    if(event.id){
        updateEvent();
    }
    else{
        addEvent();
    }    
};

const setUpdate = (event)=>{
    setEventData({...event});
}
                 
return(
    <>
    <Maincontainer>
      <Navigation/><br/>
      <div class="addContainer">
        <div className="card-container d-flex justify-content-center">
          <Card style={{marginTop: "3%",}}>
            <Card.Header className="text-center">
              <h4>Add Events</h4>
            </Card.Header>
            <Card.Body>
            <form>
            <h3 style={{color:"black"}}>Event details</h3>
            <input type="text" class="id" placeholder="event Id" name="Id" onChange={(e)=>setEventId(e.target.value)}/>
            <input type="text" class="title" placeholder="Add Title" name="title" onChange={(e)=>setEventTitle(e.target.value)}/>
            <input type="date" class="date" placeholder="Date" name="date" onChange={(date)=>setEventDate(date.target.value)}/>
            <input type="text" class="input" name="day" placeholder="Day" onChange={(e)=>{setEventDay(e.target.value)}}/><br/>
            <input type="text" class="time" placeholder="Time" onChange={(time)=>setEventTime(time.target.value)}/><br/>
            <input type="textfield" class="input" name="description" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}} required/>
            <br/>
            <button type="submit" onClick={handleSubmit}>Add</button>
            </form>
            </Card.Body>
          </Card>
        </div>
      <div style={{alignItems:"center"}}><ViewCalendar/></div>
      </div>
      </Maincontainer>
      </>
    );
}

