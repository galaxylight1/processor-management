import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CollapsibleTable from "./CollapsibleTable";
import { commonKeys } from "../../utils/commonKeys";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SquareIcon from "@mui/icons-material/Square";

let commonKeysArr = [];
// const aData = [2, 3, 1];
// const bData = [2, 3.2, 1];
const labels = ["Processor Base Frequency"];

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let barChartData = [false, [0, 0, 0], [0, 0, 0], "Unit"]; // initial bar chart values

  // useEffect(() => {
  const obj1 = state[0];
  const obj2 = state[1];
  commonKeysArr = commonKeys(obj1, obj2);

  // for bar chart
  if (commonKeysArr.includes("Performance")) {
    const innerObj1 = state[0]["Performance"];
    const innerObj2 = state[1]["Performance"];
    // console.log([innerObj1, innerObj2]);

    const barChartArr1 = [
      // innerObj1["Cache"].match(/\d+(\.\d+)?/)[0],
      innerObj1["Processor Base Frequency"].match(/^(\d+(\.\d+)?)\s*(\w+)$/)[1],
      // innerObj1["# of Cores"].match(/\d+(\.\d+)?/)[0],
    ];
    const barChartArr2 = [
      // innerObj2["Cache"].match(/\d+(\.\d+)?/)[0],
      innerObj2["Processor Base Frequency"].match(/^(\d+(\.\d+)?)\s*(\w+)$/)[1],
      // innerObj2["# of Cores"].match(/\d+(\.\d+)?/)[0],
    ];

    const unit = innerObj1["Processor Base Frequency"].match(
      /^(\d+(\.\d+)?)\s*(\w+)$/
    )[3];

    // setBarChartData([true, barChartArr1, barChartArr2, unit]);
    barChartData = [true, barChartArr1, barChartArr2, unit]; // since barChartData can be derived from 'state', it will not be it's own state
  }
  // }, [state]);

  if (!state || state.length !== 2) {
    navigate("/");
    return;
  }

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginLeft: { xs: "3.2rem", md: "12.7rem" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BarChartIcon sx={{ fontSize: "3rem", mr: "0.5rem" }} /> Compare
        Products
      </Typography>
      <Typography
        sx={{
          marginLeft: { xs: "3.5rem", md: "13rem" },
          marginTop: "1rem",
          marginBottom: "0.5rem",
          fontSize: "1.1rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
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
        // justifyContent="space-between"
        sx={{
          paddingLeft: { xs: "3.7rem", md: "13.2rem" },
          paddingRight: "1.5rem",
          display: "flex",
        }}
      >
        {barChartData[0] ? (
          <Grid item mt={3} md={6} xs={12}>
            <BarChart
              // width={570}
              height={600}
              series={[
                { data: barChartData[1], label: "Product 1", id: "aId" },
                { data: barChartData[2], label: "Product 2", id: "bId" },
              ]}
              xAxis={[{ data: labels, scaleType: "band" }]}
              yAxis={[{ label: barChartData[3] }]}
            />
          </Grid>
        ) : (
          <></>
        )}
        <Grid item md={6} xs={12}>
          {commonKeysArr.map((key, idx) => {
            if (key === "name") return;

            const obj1 = state[0][`${key}`];
            const obj2 = state[1][`${key}`];
            let innerCommonKeysArr = [];

            // TODO: temporary code
            const doesObjectHasOnlyOneKey = typeof obj1 === "string"; // for name
            if (doesObjectHasOnlyOneKey) {
              innerCommonKeysArr = [obj1, obj2];
            } else innerCommonKeysArr = commonKeys(obj1, obj2);

            if (innerCommonKeysArr.length === 0) return; // no common keys (ex. Supplemental Information)

            // for bar chart
            /* const aData = [];
            const bData = [];
            if (key === "Performance") {
              innerCommonKeysArr.map((key, idx) => {
                aData.push(obj1[key]);
                bData.push(obj2[key]);
              });

              setBarChartData([aData, bData]);
            } */

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
