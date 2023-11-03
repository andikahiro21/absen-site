import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import '../styles/form.css'
import { postDataToServer } from "../domain/api";

function Form() {

  const [absents, setAbsents] = useState([]);
  const [forms , setForms] = useState({
    id : "",
    nama : "",
    checkin : "",
    checkout : "",
    status :"",
  })


  const handleFormChange = (event) => {
    const { name, value } = event.target;
    
    const updatedForms = {...forms}

    if (status === 'checkin') {
      const checkin = moment().format('YYYY-MM-DDTHH:mm:ss');
      updatedForms[status] = checkin;
    } else {
      updatedForms[name] = value;
    }

    setForms(updatedForms);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
         // Check if the password is less than 6 characters

    try {
      const data = {
        id : forms.id,
        nama : forms.nama,
        checkin : forms.checkin,
        checkout :  forms.checkout,
        status : 'checkin',
      };
      const response = await postDataToServer(data);
      console.log(response, "Hasil Response");
  
      // Update the posts state with the new data
      setAbsents((prevAbsents) => [...prevAbsents, response]);
  
      // Clear the form input fields
      setForms({
        nama: "",
        checkin: "",
        checkout: "",
        category: "",
        status: "",
      });

      alert("Absensi Berhasil Bisa Ditambah");

    } catch (error) {
      console.log('Error Posting Data', error);
    }
  }
  
  
  ;

  return (
    <div className="form-konten">
      <div className="header-judul">
        <h1>Isi Daftar Absensi</h1>
      </div>
      <div className="konten-isi">
      <div className="mengisi-formulir">
            <form  onSubmit={handleFormSubmit}>
              <div className="input-container">
                <div className="label-name">Nama: </div>
                <input
                  type="text"
                  name="nama"
                  value={forms.nama}
                  placeholder="nama"
                  onChange={handleFormChange}
                />
              </div>
              <Button variant="outlined" type="submit" className="button">
                Submit
              </Button>
            </form>
            </div>
      </div>
    </div>
  );
}

export default Form;
