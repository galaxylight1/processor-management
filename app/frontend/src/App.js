import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";
import Comparison from "./components/Comparison/Comparison";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = { xs: 50, md: 200 }; // TODO: change or remove this

const styles = (theme) => ({
  content: {
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
  },
});

// TODO: remove this when not needed
// let intialCategory = "Legacy Intel Xeon Processors";
// let categoryCount = 0;
export default function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [customFilterModel, setCustomFilterModel] = useState({
    items: [],
  });
  const matches = useMediaQuery("(min-width:900px)");

  // TODO: remove this when not needed
  // useEffect(() => {
  //   // finding number of different product collections
  //   jsonData.map((item) => {
  //     // const currCategory = item.Essentials["Product Collection"];
  //     // if (currCategory !== intialCategory) {
  //     //   categoryCount++;
  //     //   intialCategory = currCategory;
  //     // }

  //     if (item["Performance"] && item["Performance"]["Processor Base Frequency"])
  //   });
  // }, [jsonData]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div>
        <Navbar />
        <Sidebar
          open={open}
          handleOnChevronClick={() => {
            setOpen(!open);
          }}
          matches={matches}
          handleSetCustomFilterModel={setCustomFilterModel}
        />
        <main style={styles(theme).content}>
          <Routes>
            <Route
              path="/"
              element={
                <Table
                  // jsonData={jsonData}
                  open={open}
                  matches={matches}
                  customFilterModel={customFilterModel}
                  handleSetCustomFilterModel={setCustomFilterModel}
                />
              }
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/compare"
              element={<Comparison open={open} matches={matches} />}
            ></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
