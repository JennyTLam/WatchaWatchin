import React, { useState, useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../firebase/firebase";

const db = firebase.database().ref();

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 5,
  },
}));

const AddFriend = ({personID }) => {
  const [open, setOpen] = useState(false); 
  const [email, setEmail] = useState();
  const [emailTouid, setEmailTouid] = useState({}); 
  const [users, setUsers] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const handleData = snap => {
      if (personID) {
        if (snap.val()) {
            setEmailTouid(snap.val().emailTouid);
            setUsers(snap.val().users)
        }
      }
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    console.log(open)
  };

  const handleClose = () => {
    setOpen(false);
    setEmail();
  };

  const handleSubmit = () => {
    if (
      email === undefined ||
      email === "" 
    ) {
      alert("Please fill in email.");
    } else {
      
      let rg = /\./g;
      let temp = email.replace(rg, ",");
      let friendUID = db.child("emailtouid").child(temp).key
      if (emailTouid[friendUID] === null) {
        alert("The user does not exist. Please try again.");
      } else {
        alert("Success! Friend Added");
        db.child("users").child(personID).child('friends').child(emailTouid[friendUID]).set(users[emailTouid[friendUID]].name);
        db.child("users").child(emailTouid[friendUID]).child("friends").child(personID).set(users[personID].name);
        
        handleClose();
        }
    }
  };


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="center">
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpen(true)}
          >
            Add Friend
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Add your friend."
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter friend email address."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddFriend;