import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation";
import { mobile } from "../../responsive";
import styled from "styled-components";


const Maincontainer = styled.div`
  background-color:White;
  margin: px 0px;
  height: 100vh;
  width: 100vw;
  color: black;
  ${mobile({
    width: "100vw",
  })}
`;

function ViewEvents() {
    const [eventData, setEventData] = useState([]);
    const events = async()=> {  
        try{
            const token = localStorage.getItem("token");  
            console.log(token);
            const headers = {
                "Content-Type": 'application/json',
                "Authorization": `Bearer${token}`
                }  
        await axios.get("https://first-backend-abi.herokuapp.com/events/view/",headers)
        .then((response)=>{
            setEventData(response.data);
            console.log(response.data)
        });
    }catch(err){
        console.log("Error in fetching Data");
    }
    }


    const deleteEvent = async(_id)=>{
        try{
            await axios.delete(`https://first-backend-abi.herokuapp.com/events/view/${_id}`);
            eventData=eventData.filter((event)=>event._id!==_id);
            setEventData({eventData}) ;       
            console.log(`${_id}`, "Deleted");
        }catch(err){
            console.log(err,"Deleting error");
        }
      }; 
    useEffect(() =>{
        events();
    }, [eventData]);
  
  return(
    <>
    <Maincontainer>
    <Navigation/>
    <div>
     <table className="table">
            <tbody>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Day</th>
                <th>Time</th>
                <th>Description</th>
                <th>Delete</th>
            </tr>
            {eventData.map((data) => {
            return (            
            <tr>
                <td>{data._id}</td>
                <td>{data.title}</td>
                <td>{data.date}</td>
                <td>{data.day}</td>
                <td>{data.time}</td>
                <td>{data.description}</td>
                {<td><button type="submit" onClick={deleteEvent}>Delete</button></td>}
            </tr>
            );
            })}
            </tbody>
        </table>
        </div>
        </Maincontainer>
        </>
    );
}
export default ViewEvents;