import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Join extends Component {
   render() {
      // if (this.props.username) {
      //    return <Redirect to="/home" />;
      // }
      return (
         <div className="wrapper">
            <div className="container">
               <h1 className="heading__primary">daikochat.com : An Open chat page</h1>
               <form action="">
                  <input
                     type="text"
                     name="username"
                     value={this.props.username}
                     onChange={this.props.setUser}
                     placeholder="Enter a username"
                  />
               </form>
               <Link to="/chat">Join</Link>
            </div>
         </div>
      );
   }
}
export default Join;
