import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import Button from "@mui/material/Button";

export default function Member() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    const member = {
      name,
      address,
    };
    console.log(member);
    fetch("http://localhost:8080/member/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    }).then(() => {
      console.log("New member added");
    });
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/member/getAll")
      .then((res) => res.json())
      .then((result) => {
        setMembers(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Member</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Member Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Member Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
        {name} {address}
      </Paper>
      <h1>Members</h1>
      <Paper elevation={3} style={paperStyle}>
        console.log(members.map)
        {members.map((member) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={member.id}
          >
            Id:{member.id}
            <br></br>
            Name:{member.name}
            <br></br>
            Address:{member.name}
            <br></br>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
