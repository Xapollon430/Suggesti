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
import { ProgressBar } from "react-loader-spinner";
import TypeWriterEffect from "react-typewriter-effect";
import ReactRotatingText from "react-rotating-text";

import Button from "@mui/material/Button";

const RotatingText = ({ textArray, speed }) => {
  const [currentText, setCurrentText] = React.useState(textArray[0]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % textArray.length);
      setCurrentText(textArray[currentIndex]);
    }, speed);
    return () => clearInterval(intervalId);
  }, [currentIndex, textArray, speed]);
  console.log(textArray);
  return <div>{currentText}</div>;
};

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

let firstData = {
  labels,
  datasets: [
    {
      label: "Starbucks",
      data: [156.55],
      backgroundColor: "red",
    },

    {
      label: "Shell",
      data: [210.11],
      backgroundColor: "red",
    },

    {
      label: "Target",
      data: [99.22],
      backgroundColor: "red",
    },

    {
      label: "KFC",
      data: [55.44],
      backgroundColor: "red",
    },
  ],
};

let secondData = {
  labels,
  datasets: [
    {
      label: "Starbucks",
      data: [156.55],
      backgroundColor: "red",
    },
    {
      label: "Gimme! Coffee",
      data: [67.55],
      backgroundColor: "green",
    },
    {
      label: "Shell",
      data: [210.11],
      backgroundColor: "red",
    },
    {
      label: "BP",
      data: [199.5],
      backgroundColor: "green",
    },
    {
      label: "Target",
      data: [99.22],
      backgroundColor: "red",
    },
    {
      label: "Value Village",
      data: [50.99],
      backgroundColor: "green",
    },
    {
      label: "KFC",
      data: [55.44],
      backgroundColor: "red",
    },
    {
      label: "Chipotle",
      data: [40.4],
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
      text: "Spending Chart",
    },
  },
};

export default function DrawerAppBar() {
  const [showSecond, setShowSecond] = React.useState(false);

  const [cheap, setCheap] = React.useState(false);
  const [eco, setEco] = React.useState(false);
  const [quality, setQuality] = React.useState(false);
  const [custom, setCustom] = React.useState(false);
  const [chartData, setChartData] = React.useState(firstData);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");

  function handleChange(event) {
    setLoading(true);
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
        setChartData(secondData);
        setText(res.text);
        setLoading(false);
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
            <Bar options={options} data={chartData} />
          </S.ChartsWrapper>
        </div>
        {loading ? (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="black"
            barColor="#68cbf8"
          />
        ) : text !== "" ? (
          <TypeWriterEffect
            cursorColor="black"
            text={text}
            typeSpeed={10}
            textStyle={{ fontSize: "20px" }}
          />
        ) : (
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
        )}
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
            <Typography variant="h4" style={{ marginTop: "1rem" }}>
              We help you find... <div />
              <ReactRotatingText
                items={["Better", "Cheaper", "Sustainable", "Healthier"]}
              />
              <div />
              ways to spend money with AI
            </Typography>
          </Typography>
        </Typography>
      </S.LandingWrapper>
    </Box>
  );
}
