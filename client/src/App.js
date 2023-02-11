import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as S from "./App.styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const labels = [""];

export const data = {
  labels,
  datasets: [
    {
      label: "Starbucks",
      data: [222, 333],
      backgroundColor: "red",
    },
    {
      label: "Gimme! Coffee",
      data: [666, 999],
      backgroundColor: "green",
    },
    {
      label: "Shell",
      data: [222, 333],
      backgroundColor: "red",
    },
    {
      label: "BP",
      data: [666, 999],
      backgroundColor: "green",
    },
    {
      label: "Target",
      data: [222, 333],
      backgroundColor: "red",
    },
    {
      label: "Value Village",
      data: [666, 999],
      backgroundColor: "green",
    },
    {
      label: "KFC",
      data: [222, 333],
      backgroundColor: "red",
    },
    {
      label: "Chipotle",
      data: [666, 777],
      backgroundColor: "green",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function DrawerAppBar() {
  const [showSecond, setShowSecond] = React.useState(false);

  const [cheap, setCheap] = React.useState(false);
  const [eco, setEco] = React.useState(false);
  const [quality, setQuality] = React.useState(false);
  const [custom, setCustom] = React.useState(false);

  function handleChange(event) {
    console.log(123);
    fetch(`http://localhost:4000/insights`, {
      method: "POST",
      body: JSON.stringify({ cheap, eco, quality, custom }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  return showSecond ? (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "#68cbf8" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Suggesti
          </Typography>
          <Box
            onClick={() => {
              setShowSecond(true);
            }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Logout
          </Box>
        </Toolbar>
      </AppBar>
      <S.SecondWrapper>
        <div>
          <Typography variant="h3">Welcome, John.</Typography>

          <S.ChartsWrapper>
            <Bar options={options} data={data} />
          </S.ChartsWrapper>
        </div>
        <S.FormWrapper>
          <S.CheckWrapper>
            <Typography variant="h6">Cheaper</Typography>
            <Checkbox
              {...label}
              onChange={() => {
                setCheap(!cheap);
              }}
              value={cheap}
              size="medium"
            />
          </S.CheckWrapper>
          <S.CheckWrapper>
            <Typography variant="h6">Eco-Friendly</Typography>
            <Checkbox
              {...label}
              onChange={() => {
                setEco(!eco);
              }}
              value={eco}
              size="medium"
            />
          </S.CheckWrapper>
          <S.CheckWrapper>
            <Typography variant="h6">Better Quality</Typography>
            <Checkbox
              {...label}
              onChange={() => {
                setQuality(!quality);
              }}
              value={quality}
              size="medium"
            />
          </S.CheckWrapper>

          <S.TextBox>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onChange={(e) => {
                setCustom(e.target.value);
              }}
            />
          </S.TextBox>
          <Button variant="contained" component="label" fullWidth>
            Upload CSV
            <input
              type="file"
              hidden
              onChange={() => {
                handleChange();
              }}
            />
          </Button>
        </S.FormWrapper>
      </S.SecondWrapper>
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "#68cbf8" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Suggesti
          </Typography>
          <Box
            onClick={() => {
              setShowSecond(true);
            }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Login
          </Box>
        </Toolbar>
      </AppBar>
      <S.LandingWrapper>
        <Typography variant="h2">
          <strong>Where Does Your Money Go?</strong>
          <Typography variant="h6">
            Our mission is to empower companies to make more informed and
            sustainable purchasing decisions through data-driven
            recommendations. Suggesti analyzes your company's transaction data
            to provide customized recommendations for more cost-effective and
            eco-friendly options.
          </Typography>
        </Typography>
      </S.LandingWrapper>
    </Box>
  );
}
