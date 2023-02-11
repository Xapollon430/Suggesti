import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as S from "./App.styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import arrow from "./arrow.png";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOne = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartTwo = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartThree = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartFour = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DrawerAppBar() {
  const [showSecond, setShowSecond] = React.useState(false);

  const [cheap, setCheap] = React.useState(false);
  const [eco, setEco] = React.useState(false);
  const [quality, setQuality] = React.useState(false);
  const [custom, setCustom] = React.useState(false);

  console.log(cheap, eco, quality);

  function handleChange(event) {
    fetch(`http://localhost:4000/create-portal-session`, {
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
        window.location = res.url;
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
          <Typography variant="h5">Last Months Suggestions:</Typography>

          <S.ChartsWrapper>
            <S.ChartWrapper>
              <Pie data={chartOne} />
            </S.ChartWrapper>
            <S.Arrow src={arrow} />
            <S.ChartWrapper>
              <Pie data={chartTwo} />
            </S.ChartWrapper>
            <S.ChartWrapper>
              <Pie data={chartThree} />
            </S.ChartWrapper>
            <S.Arrow src={arrow} />
            <S.ChartWrapper>
              <Pie data={chartFour} />
            </S.ChartWrapper>
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
            <input type="file" hidden />
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
