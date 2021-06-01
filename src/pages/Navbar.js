import React, { useEffect, useState } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"; 

const Navbar = () => { 

    const useStyles = makeStyles({
        navBar: {
          display: "flex",
          justifyContent: "flex-end",
          width: "90vw",
          padding: "10px",
          marginBottom: "15px",
          borderColor: "gray", 
          borderStyle: "solid",
        }
      }, 
      {name: "MuiButton"});

    const classes = useStyles()

    return (
        <div className={classes.navBar}>
          <Link to="/">
            <i className="fa fa-undo"></i>
          </Link>
        </div>
    );

}

export default Navbar

// style="font-size:24px"