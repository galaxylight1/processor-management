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

const aData = [2400, 1398, 9800, 3908];
const bData = [4000, 3000, 2000, 2780];
const labels = ["Cache", "Processor Base Frequency", "Bus Speed", "Cores"];

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state || state.length !== 2) {
    navigate("/");
    return;
  }

  const obj1 = state[0];
  const obj2 = state[1];
  commonKeysArr = commonKeys(obj1, obj2);
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
        // width="vw"
        // justifyContent="space-between"
        sx={{
          paddingLeft: { xs: "3.7rem", md: "13.2rem" },
          paddingRight: "0.5rem",
          display: "flex",
        }}
      >
        <Grid item mt={3} md={6} xs={12}>
          <BarChart
            // width={570}
            height={600}
            series={[
              { data: aData, label: "A", id: "aId" },
              { data: bData, label: "B", id: "bId" },
            ]}
            xAxis={[{ data: labels, scaleType: "band" }]}
          />
        </Grid>
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
