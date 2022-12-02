import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useMemo, useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {Container} from "@mui/system";
import {useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// DATEPİCKER
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// MODAL CSS
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// yup
const SignupSchema = yup.object().shape({
  title: yup
    .string()
    .typeError("Lütfen tür ismi giriniz!")
    .required("Zorunlu alan!"),

  gidis: yup.string().required("Zorunlu alan!"),
  varis: yup.string().required("Zorunlu alan!"),
  start: yup.string().required("Zorunlu alan!"),
  end: yup.string().required("Zorunlu alan!"),
});

const SeferTanim = () => {
  const events = [
    {label: "Mercedes", value: 1},
    {label: "Volvo", value: 2},
    {label: "Scania", value: 3},
  ];
  const [otobusTur, setotobusTur] = useState("");
  const [title, setTitle] = useState("");
  const [gidis, setgidis] = useState("");
  const [varis, setVaris] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [modal, setModal] = useState([]);
  const [nerden, setNerden] = useState([]);
  const [nereye, setNereye] = useState([]);
  const handleSelectedEvent = (event) => {
    setotobusTur(event.otobusTur);
    setTitle(event.setTitle);
    setgidis(event.gidis);
    setVaris(event.varis);
    setStart(event.start);
    setEnd(event.end);
    setModal(event.resource.eventType);
    setNerden(event.resource);
    setNereye(event.resource);
    console.log(modal);
    console.log(nerden);
    console.log(nereye);
    console.log(otobusTur);
    handleOpen();
  };

  const [defualtValues, setdefualtValues] = useState({
    otobusTur: "",
    title: "",
    gidis: "",
    varis: "",
    start: "",
    end: "",
    tur: [],
  });
  console.log(defualtValues);

  // yup
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
    defualtValues: useMemo(() => {
      return defualtValues;
    }, []),
  });

  const [allEvents, setAllEvents] = useState([]);
  const handleAddEvent = (data) => {
    console.log(data);

    // uyarı mesajı
    if (data.start > data.end) {
      alert("Bitiş tarihi başlangıç tarihinden erken olamaz");
    } else if (data.start <= data.end) {
      const event = {
        title: data.title,
        otobusTur: data.otobusTur,

        start: data.start,
        end: data.end,
        resource: {
          eventType: data.tur,
          eventType: data.gidis,
          eventType: data.varis,
        },
      };
      setAllEvents([...allEvents, event]);
    }
  };
  // MODAL ONCLİCK
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newEvent, setNewEvent] = useState("");

  return (
    <div>
      <Container item sx={{m: 1, minWidth: 120, marginTop: 10}}>
        <form onSubmit={handleSubmit((data) => handleAddEvent(data))}>
          <Grid item xs={12}></Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="otobusTur"
              render={({field: {onChange, onBlur, otobusTur}}) => (
                <Autocomplete
                  options={events}
                  value={otobusTur}
                  onBlur={onBlur}
                  onChange={(event, newEvents) => {
                    onChange(newEvents);
                  }}
                  multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Otobüs marka seçiniz"
                      placeholder="Favorites"
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item sx={3}>
            <Controller
              control={control}
              name="title"
              render={({field: {onChange, onBlur, title}}) => (
                <TextField
                  fullWidth
                  type="number"
                  label="Koltuk ücreti"
                  placeholder="Koltuk ücreti giriniz"
                  variant="outlined"
                  value={title}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </Grid>

          <Grid item sx={3}>
            <Controller
              control={control}
              name="gidis"
              render={({field: {onChange, onBlur, gidis}}) => (
                <TextField
                  fullWidth
                  type="text"
                  label="Nereden"
                  placeholder="gidilecek yeri giriniz"
                  variant="outlined"
                  value={gidis}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            {errors.gidis && <p>{errors.gidis.message}</p>}
          </Grid>
          <Grid item sx={3}>
            <Controller
              control={control}
              name="varis"
              render={({field: {onChange, onBlur, varis}}) => (
                <TextField
                  fullWidth
                  type="text"
                  label="Nereye"
                  placeholder="Varılacak yeri giriniz"
                  variant="outlined"
                  value={varis}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            {errors.varis && <p>{errors.varis.message}</p>}
          </Grid>

          <Grid item sx={6}>
            <Controller
              control={control}
              name="start"
              render={({field: {onChange, start, ref}}) => (
                <TextField
                  type="date"
                  label="Gidiş Tarihi:"
                  placeholder=" Giriş Tarihi: "
                  variant="outlined"
                  fullWidth
                  value={start}
                  InputLabelProps={{shrink: true}}
                  onChange={onChange}
                />
              )}
            />

            {errors.start && <p>{errors.start.message}</p>}
            <Grid item sx={6}>
              <Controller
                control={control}
                name="end"
                render={({field: {onChange, end, ref}}) => (
                  <TextField
                    type="date"
                    label="DönüşTarihi:"
                    placeholder="Dönüş Tarihi: "
                    variant="outlined"
                    fullWidth
                    value={end}
                    InputLabelProps={{shrink: true}}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item sx={1}>
              <Button
                color="secondary"
                stlye={{marginTop: "10px"}}
                onClick={handleAddEvent}
                type="submit"
                variant="contained"
              >
                Ekle
              </Button>
            </Grid>
          </Grid>
          <Grid item sx={12}>
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              onSelectEvent={(event) => handleSelectedEvent(event)}
              popup
              endAccessor="end"
              style={{height: 500, margin: "50px"}}
            />
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid Container>
                <label>Marka:{otobusTur} </label>
                <label>
                  {modal.map((m) => {
                    return m.label + " ";
                  })}
                </label>
              </Grid>
              <Grid Container>
                <label>Nerden:{gidis} </label>
                <label>
                  {nerden.map((g) => {
                    return g.label + " ";
                  })}
                </label>
              </Grid>
              <Grid Container>
                <label>Nereye:{varis} </label>
                <label>
                  {nereye.map((v) => {
                    return v.label + " ";
                  })}
                </label>
              </Grid>
              <Grid Container>
                <label>Otobüs Markası: </label>
                <label>{otobusTur}</label>
              </Grid>
              <Grid Container>
                <label>Koltuk Ücreti: </label>
                <label>{title}</label>
              </Grid>
              <Grid Container>
                <label>Gidilecek Gün Tarihi : </label>
                <label>{start}</label>
              </Grid>
              <Grid Container>
                <label>Dönüş Tarihi : </label>
                <label>{end}</label>
              </Grid>
            </Box>
          </Modal>
        </form>
      </Container>
    </div>
  );
};

export default SeferTanim;
