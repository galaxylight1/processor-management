/*
 * Comparison component that renders the bar charts and collapisble table component, comparing 2 products at a time
 * Bar charts are generated using Material UI Charts library, compares no. of cores, processor base frequency, cache, bus speed depending on whether those are available or not for both products
 */

import { Typography, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CollapsibleTable from "./CollapsibleTable";
import { commonKeys } from "../../utils/commonKeys";
import { BarChart } from "@mui/x-charts/BarChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SquareIcon from "@mui/icons-material/Square";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

let commonKeysArr = [];
const labels = ["# of Cores", "Processor Base Frequency", "Cache", "Bus Speed"];

export default function Comparison({ open, matches }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  if (state === null || state.length !== 2) {
    // navigate("/");
    return (
      <Snackbar
        open={true}
        TransitionComponent={Slide}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Please select two products for comparison."
      ></Snackbar>
    );
  }

  let barCharts = [];
  let barChartData = {}; // initialize bar chart, since barChartData can be derived from 'state', it will not be it's own state

  const obj1 = state[0];
  const obj2 = state[1];
  commonKeysArr = commonKeys(obj1, obj2);

  // for bar chart
  if (commonKeysArr.includes("Performance")) {
    const innerObj1 = state[0]["Performance"];
    const innerObj2 = state[1]["Performance"];

    labels.map((label) => {
      if (!innerObj1[label] || !innerObj2[label]) return; // if the value doesn't exist in any of the objects (obj1 and obj2) then we can skip it because comparison is not possible

      let split1 = innerObj1[label].split(" ");
      let split2 = innerObj2[label].split(" ");
      let barChartArr1 = [split1 ? split1[0] : innerObj1[label]];
      let barChartArr2 = [split2 ? split2[0] : innerObj2[label]];

      const unit1 = split1 ? split1[1] : "";
      const unit2 = split2 ? split2[1] : "";

      barChartData = {
        isVisible: unit1 === unit2 ? true : false, // we only show bar chart if both units are same
        aData: barChartArr1,
        bData: barChartArr2,
        unit: unit1 ? unit1 : "Unit",
        name: [label],
      };

      barCharts.push({ ...barChartData });
    });
  }

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
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <BarChartIcon sx={{ fontSize: "3rem", mr: "0.5rem" }} /> Compare
        Products
      </Typography>
      <Typography
        sx={{
          marginLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          marginTop: "1rem",
          marginBottom: "0.5rem",
          fontSize: "1.1rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <SquareIcon sx={{ color: "#05B1AF", mr: "0.5rem" }} />
        {state[0].name} <CompareArrowsIcon sx={{ mr: "1rem", ml: "1rem" }} />{" "}
        <SquareIcon sx={{ color: "#2D96FF", mr: "0.5rem" }} />
        {state[1].name}
      </Typography>
      <Grid
        container
        width="100vw"
        sx={{
          paddingLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          paddingRight: "1.5rem",
          display: "flex",
          transition: theme.transitions.create("padding-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <Grid item mt={3} md={6} xs={12}>
          {barCharts.map((barChartData, idx) => {
            if (barChartData.isVisible) {
              return (
                <BarChart
                  // width={570}
                  key={idx}
                  height={500}
                  series={[
                    {
                      data: barChartData.aData,
                      id: "aId",
                    },
                    {
                      data: barChartData.bData,
                      id: "bId",
                    },
                  ]}
                  xAxis={[{ data: barChartData.name, scaleType: "band" }]}
                  yAxis={[{ label: barChartData.unit }]}
                  grid={{ horizontal: true }}
                />
              );
            } else return <></>;
          })}
        </Grid>
        <Grid
          item
          md={barCharts.length > 0 ? 6 : 12}
          xs={12}
          sx={{ maxWidth: "unset" }}
        >
          {commonKeysArr.map((key, idx) => {
            if (key === "name" || key == "_id") return;

            const obj1 = state[0][`${key}`];
            const obj2 = state[1][`${key}`];
            let innerCommonKeysArr = [];

            const doesObjectHasOnlyOneKey = typeof obj1 === "string"; // for name
            if (doesObjectHasOnlyOneKey) {
              innerCommonKeysArr = [obj1, obj2];
            } else innerCommonKeysArr = commonKeys(obj1, obj2);

            if (innerCommonKeysArr.length === 0) return; // no common keys (ex. Supplemental Information)

            return (
              <CollapsibleTable
                key={idx}
                headerName={key === "name" ? "Name" : key}
                specificState={[obj1, obj2]}
                commonKeysArr={innerCommonKeysArr}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
