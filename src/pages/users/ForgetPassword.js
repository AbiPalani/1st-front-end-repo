import "../../index.css";
import { NavLink } from "react-router-dom";

function ForgetPassword() {
  return (
   <div align="center">
        <p>Enter your mail id to receive the password reset link</p>
        <p><input className="text" name="id" type="text" placeholder="Email Id" required/></p>
        <NavLink style={{color:"brown"}}  to="/">Send</NavLink><p/>
   </div>
  );
}

export default  ForgetPassword;
