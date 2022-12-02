import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import React, {useState, useEffect} from "react";

const topBus = [
  {label: "Mercedes", id: 1},
  {label: "Volvo", id: 2},
  {label: "Scania", id: 3},
];

const busModel = [
  {label: "CapaCity", id: 1},
  {label: "Conecto", id: 2},
  {label: "VolvoB6", id: 3},
];

function Otanim({allBus, setAllBus}) {
  const [bus, setBus] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    getBus();
  }, []);

  const getBus = () => {
    axios
      .get("http://192.168.0.197/api/bus-definition", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setAllBus(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postBus = () => {
    axios
      .get("http://192.168.0.197/api/bus", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setAllBus(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBuss = (id) => {
    console.log(token);
    console.log({
      bank_id: id,
      interest: "",
      credit_type: "",
      time_option: "",
    });
    axios
      .get(
        "http://192.168.0.197/api/bus-definition",
        {
          brand: "",
          types: "",
          properties: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      .then((res) => {
        console.log(res);
        setAllBus(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getModel = () => {
    axios
      .get("http://192.168.0.197/api/model", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setAllBus(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [tip, setTip] = React.useState("");
  const handleChange = (event) => {
    setTip(event.target.value);
    event.preventDefualt();
  };

  return (
    <div>
      <TextField
        id="id"
        label="Plaka"
        variant="outlined"
        sx={{m: 1, minWidth: 120, marginTop: 10}}
      />
      <Autocomplete
        sx={{m: 1, width: 300, marginTop: 5}}
        disablePortal
        id="combo-box-demo"
        options={topBus}
        renderInput={(params) => (
          <TextField {...params} label="Otobüs markaları" />
        )}
      />
      <Autocomplete
        sx={{m: 1, width: 300, marginTop: 5}}
        disablePortal
        id="combo-box-demo"
        options={busModel}
        renderInput={(params) => (
          <TextField {...params} label="Otobüs Modelleri" />
        )}
      />
      <TextField
        id="outlined-basic"
        label="Koltuk Fiyatı"
        variant="outlined"
        sx={{m: 1, minWidth: 120, marginTop: 5}}
      />

      <Box sx={{m: 1, width: 300, marginTop: 5}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tip</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tip}
            label="Tip"
            onChange={handleChange}
          >
            <MenuItem value={10}>2+1</MenuItem>
            <MenuItem value={20}>2+2</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        disableElevation
        sx={{m: 1, width: 300, marginTop: 5}}
      >
        Kaydet
      </Button>
    </div>
  );
}

export default Otanim;
