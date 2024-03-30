import { Box, Typography, CircularProgress } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import ResponsivePieComponent from "./ResponsivePie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const PieChart = ({ open, matches }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch("https://intel-assessment-backend.vercel.app/pie")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const percent1 = data.desktopPercent;
        const percent2 = data.serverPercent;
        const percent3 = data.mobilePercent;
        const percent4 = data.workstationPercent;
        const percent5 = data.launchedPercent;
        const percent6 = data.discontinuedPercent;
        const percent7 = data.announcedPercent;

        const tempPieData = [
          [
            {
              id: "desktop",
              label: "Desktop",
              value: percent1,
              color: "hsl(242, 70%, 50%)",
            },

            {
              id: "server",
              label: "Server",
              value: percent2,
              color: "hsl(348, 70%, 50%)",
            },
            {
              id: "mobile",
              label: "Mobile",
              value: percent3,
              color: "hsl(237, 70%, 50%)",
            },
            {
              id: "workstation",
              label: "Workstation",
              value: percent4,
              color: "hsl(348, 70%, 50%)",
            },
          ],
          [
            {
              id: "launched",
              label: "Launched",
              value: percent5,
              color: "hsl(242, 70%, 50%)",
            },

            {
              id: "discontinued",
              label: "Discontinued",
              value: percent6,
              color: "hsl(348, 70%, 50%)",
            },
            {
              id: "announced",
              label: "Announced",
              value: percent7,
              color: "hsl(237, 70%, 50%)",
            },
          ],
        ];

        setPieData(tempPieData);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
          transition: theme.transitions.create("margin-left", {
            // TODO: club this together in a styles object
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <PieChartIcon sx={{ fontSize: "2.6rem", mr: "0.5rem" }} /> Pie
        Visualization
      </Typography>
      <Box
        sx={{
          height: "75vh",
          paddingLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          paddingRight: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: theme.transitions.create("padding-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <ResponsivePieComponent data={pieData[0]} />
            <ResponsivePieComponent data={pieData[1]} />
          </>
        )}
      </Box>
    </>
  );
};

export default PieChart;
