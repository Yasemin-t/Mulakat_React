import {Button, Grid, TextField} from "@mui/material";
import {Container} from "@mui/system";
import * as yup from "yup";
import {useForm, Controller} from "react-hook-form";
import React, {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../../src/user2.png";

const userSchema = yup.object().shape({
  email: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
  password: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
});

export default function Login({setToken}) {
  const [data, setData] = useState({
    email: "yasemin@topcu.com",
    password: "yasemin",
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(userSchema),
    data,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.value]: value,
    });
  };
  const userData = {
    email: data.email,
    password: data.password,
  };
  const Navigate = useNavigate();
  const onLogin = (e) => {
    console.log(userData);
    axios.post("http://192.168.0.197/api/login", userData).then((res) => {
      localStorage.setItem("token", res.data.data);
      setToken(res.data.data);
      console.log(res.data.data);
      Navigate("/SeferTanim");
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onLogin)}>
        <Grid
          container
          spacing={0}
          direction="column"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // flexDirection="columns"
        >
          <img
            src={logo}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item pt={2}>
            <label>email</label>
          </Grid>
          <Grid item pt={2}>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value, ref}}) => (
                <TextField
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  defaultValue={"yasemin@topcu.com"}
                />
              )}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </Grid>
          <Grid item pt={2}>
            <label>Password</label>
          </Grid>
          <Grid item pt={2}>
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value, ref}}) => (
                <TextField
                  type={"password"}
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  defaultValue={"yasemin"}
                />
              )}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </Grid>
          <Grid item pt={2}>
            <Button variant="contained" type="submit" onClick={handleChange}>
              Giriş
              <LoginIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
