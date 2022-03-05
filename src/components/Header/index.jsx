import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function DisabledTabs() {
  const location = useLocation();
  const params = location.pathname;
  const id = params.charAt(4);

  const [value, setValue] = React.useState(
    Number.parseInt(id - 1 >= 0 ? id - 1 : 0)
  );
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Bai1"
        variant="fullWidth"
      >
        <Tab
          label="Bai1"
          onClick={() => {
            navigate("/bai1");
          }}
        />
        <Tab
          label="Bai2"
          onClick={() => {
            navigate("/bai2");
          }}
        />
        <Tab
          label="Bai3"
          onClick={() => {
            navigate("/bai3");
          }}
        />
        <Tab
          label="Bai4"
          onClick={() => {
            navigate("/bai4");
          }}
        />
        <Tab
          label="Bai5"
          onClick={() => {
            navigate("/bai5");
          }}
        />
      </Tabs>
      <Outlet />
    </Box>
  );
}
