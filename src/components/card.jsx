import React from "react";
import PasswordImage from "/./passwordImage.jpeg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../styles/cardComponent.css";

function CardComponent(props) {
  const item = props.item;
  const checkout = props.checkout;
  return (
    <Card className="card" sx={{ background: "#6d4772", maxWidth: 200, height: 260 }} key={item.id}>
      <CardMedia sx={{ height: 140 }} image={PasswordImage} title={item.title} />
      <CardContent className="cardContent">
        <h1>{item.name}</h1>
        <h2>{item.time}</h2>
        <h2>Status: {item.status}</h2>
      </CardContent>
      <div className="buttonContainer">
        <button onClick={() => checkout(item)}>Check Out</button>
      </div>
    </Card>
  );
}

export default CardComponent;
