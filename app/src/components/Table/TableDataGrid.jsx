import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControlLabel, Switch } from "@mui/material";
import customToolbar from "./CustomToolbar";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.id;
    },
  },
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 500,
    renderCell: (cellValues) => {
      return cellValues.row.name;
    },
  },
  {
    field: "productCollection",
    headerName: "Product Collection",
    minWidth: 300,
    valueGetter: (val) => {
      return val;
    },
    renderCell: (cellValues) => {
      return cellValues.row.productCollection;
    },
  },
  {
    field: "cores",
    headerName: "# of Cores",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.cores === 0 ? "-" : cellValues.row.cores;
    },
  },
  {
    field: "status",
    headerName: "Product Status",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.status;
    },
  },
];

let comparisonProductsArr = [];

export default function Table({ jsonData }) {
  const navigate = useNavigate();
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [isSnackbarVisible, setIsSnackBarVisible] = useState(false);

  const handleOnSnackbarClick = () => {
    const passOnProductsArr = [...comparisonProductsArr];
    comparisonProductsArr = []; // reset
    navigate(`/compare`, { state: passOnProductsArr });
  };

  // pre-processing, TODO: explore useEffect here
  jsonData = jsonData.map((item, idx) => ({
    id: idx, // TODO: id: 27076 + idx,
    name: item.name,
    productCollection: item.Essentials["Product Collection"],
    status: item.Essentials.Status,
    cores: item.Performance ? parseInt(item.Performance["# of Cores"]) : 0,
  }));

  const handleRowSelectionModel = (newRowSelectionModel) => {
    const ele = jsonData[newRowSelectionModel.slice(-1)];
    if (ele) comparisonProductsArr.push(ele);
    setRowSelectionModel(newRowSelectionModel);
  };

  const rows = () => [...jsonData];

  return (
    <Box sx={{ height: "100%" }}>
      <Typography
        variant="h6"
        noWrap
        sx={{
          marginLeft: { xs: "3.5rem", md: "13rem" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
        }}
      >
        All Processors
      </Typography>
      <Box sx={{ mb: 1, marginLeft: { xs: "3.5rem", md: "13rem" } }}>
        <FormControlLabel
          label="Select two products for comparison"
          control={
            <Switch
              checked={checkboxSelection}
              onChange={(event) => setCheckboxSelection(event.target.checked)}
            />
          }
        />
      </Box>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows()}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        sx={{
          // TODO: change this slightly
          marginLeft: { xs: "50px", md: "200px" },
          minHeight: "10rem",
        }}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        getSele
        onRowSelectionModelChange={(newRowSelectionModel) => {
          if (newRowSelectionModel.length > 2) {
            return;
          }
          if (newRowSelectionModel.length === 2) {
            setIsSnackBarVisible(true);
          }
          if (newRowSelectionModel.length < 2) {
            comparisonProductsArr.pop();
            setIsSnackBarVisible(false);
          }
          handleRowSelectionModel(newRowSelectionModel);
        }}
        slots={{ toolbar: customToolbar }}
      />
      <Snackbar
        open={isSnackbarVisible}
        TransitionComponent={Slide}
        onClick={handleOnSnackbarClick}
        key="compareProducts"
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#0067B4",
            cursor: "pointer",
          }}
          message="Compare products"
          action={<ArrowForwardIcon />}
        ></SnackbarContent>
      </Snackbar>
    </Box>
  );
}
