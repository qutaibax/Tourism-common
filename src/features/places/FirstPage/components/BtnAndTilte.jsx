import { useState } from "react";

// Matirial ui
import Button from "@mui/material/Button";
import CityInfoForm from "./CreateCityDialog";
export default function BtnAndTilte() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    //   {/* Main Div for BTN AND TITLE OF ADMIN */}
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        width: "80%",
        margin: "0 auto",
        marginBottom: "-25px",
        marginTop: " 70px",
      }}
    >
      {/* Title Of Admin */}
      <div
        style={{
          color: "#332C2B",
          // padding: "10px",
          marginLeft: "15px",
        }}
      >
        <h1 style={{ 
          fontSize:"60px"
         }}>Cities</h1>
      </div>
      {/*== Title Of Admin ==*/}
      {/* Add Btn */}
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            padding: "10px 100px",
            fontSize: "16px",
            backgroundColor: "#D73220",
            color: "white",
            borderRadius: "8px",
            textTransform: "none", // لمنع تحويل النص لـ Capital
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#D73220",
              transform: "scale(1.02)",
            },
          }}
        >
          Add City +
        </Button>
        {/* Dialog */}
        <CityInfoForm open={open} onClose={handleClose} />
        {/*== Dialog  ==*/}
      
      </div>
      {/*== Add Btn ==*/}
    </div>
    //   {/*== Main Div for BTN AND TITLE OF ADMIN ==*/}
  );
}
