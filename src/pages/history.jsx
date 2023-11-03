import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "../styles/history.css";

function History() {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/absent/${id}`);

      if (response.status === 200) {
        alert('Data berhasil dihapus');
      call();
      } else {
        alert('Gagal menghapus data');
      }
    } catch (error) {
      console.error('>>>>>>>> kok error', error);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const filteredPosts =
    selectedStatus !== "all"
      ? posts.filter((el) => el.status === selectedStatus)
      : posts;

  const call = () => {
    axios.get('http://localhost:3000/absent')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    call()
  }, []);

  return (
    <div className="history">
      <div className="isi-konten">
        <div className="table-utama">
          <div className="toggle-bar-category">
            <FormControl
              variant="outlined"
            >
              <InputLabel id="check-label">Check</InputLabel>
              <Select
                labelId="check-label"
                value={selectedStatus}
                onChange={handleStatusChange}
                label="check"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="checkin">Check In</MenuItem>
                <MenuItem value="checkout">Check Out</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer>
            <Table sx={{ maxWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell style={{}} align="right">In</TableCell>
                  <TableCell style={{}} align="right">Out</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPosts.map((el, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{el.name}</TableCell>
                    <TableCell align="right">{el.status}</TableCell>
                    <TableCell align="right">{el.checkin}</TableCell>
                    <TableCell align="right">{el.checkout}</TableCell>
                    <TableCell align="right">
                      <DeleteOutlineIcon style={{ cursor: "pointer" }} onClick={() => { deleteData(el.id) }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default History;