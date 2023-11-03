import React, { useState } from "react";
import "../styles/check.css";
import CardComponent from "../components/card";
import { useEffect } from "react";
import { callAPI } from "../domain/api";
import { parseISO, format } from "date-fns";

function Check() {
  const [checkIn, setCheckIn] = useState([]);

  const fetchCheckin = async () => {
    const data = await callAPI("", "GET");
    const dataFilter = data
      .filter((item) => item.status === "checkin")
      .map((item) => {
        const datetime = parseISO(item.checkin);
        const time = format(datetime, "HH:mm:ss");
        return { ...item, time };
      });
    setCheckIn(dataFilter);
  };
  useEffect(() => {
    fetchCheckin();
  }, []);

  const checkout = async (item) => {
    try {
      const currentTime = new Date();
      const checkoutTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");
      const newData = {
        ...item,
        checkout: checkoutTime,
        status: "checkout",
      };
      await callAPI(`/${item.id}`, "put", {}, {}, newData);
      fetchCheckin();
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="check">
      <div className="headers">
        <h1>Check In List</h1>
      </div>
      <div className="cardContainer">
        {checkIn?.map((item) => {
          return <CardComponent item={item} checkout={checkout} />;
        })}
      </div>
    </div>
  );
}

export default Check;
