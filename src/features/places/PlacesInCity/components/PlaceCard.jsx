import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPlaceDialog from "./EditPalceDialog";
import axios from "axios";
export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const location = place?.location || "No location provided";
  const cityName = place?.city_name?.name || "Unknown city";
  const placeType = place?.place_type?.type_name || "Unknown type";
  const openTime = place?.open_time ? place.open_time.slice(0, 5) : "--:--";
  const closeTime = place?.close_time ? place.close_time.slice(0, 5) : "--:--";
  const imagePath = place?.images?.[0]?.image_path
    ? `http://127.0.0.1:8000${place.images[0].image_path}`
    : "src/Images/download (1).jpg";


const handleDelete =async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/places/${id}`);
    alert("Place deleted successfully!");
    window.location.reload();
  }catch (error) {
    console.log(error);
  }
}


  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #E2E8F0",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {/* حاوية الصورة */}
        <Box
          sx={{ overflow: "hidden", cursor: "pointer" }}
          onClick={() => navigate("/damascus")}
        >
          <CardMedia
            component="img"
            alt={location}
            height="150"
            image={imagePath}
            sx={{
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: "scale(1.06)",
              },
            }}
          />
        </Box>

        {/* المحتوى النصي */}
        <CardContent sx={{ padding: "20px 16px 12px 16px" }}>
          <Typography
            onClick={() => navigate("/damascus")}
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: "#1A202C",
              cursor: "pointer",
              transition: "color 0.2s",
              "&:hover": {
                color: "#D73220",
              },
            }}
          >
            {location}
          </Typography>
          <Typography variant="body2" sx={{ color: "#718096", mb: 0.5 }}>
            {placeType}
          </Typography>
          <Typography variant="body2" sx={{ color: "#4A5568" }}>
            {cityName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#718096", mt: 0.75 }}>
            {openTime} - {closeTime}
          </Typography>
        </CardContent>

        {/* أزرار التحكم */}
        <CardActions
          sx={{
            justifyContent: "space-between",
            padding: "0 16px 16px 16px",
            borderTop: "1px solid #F7FAFC",
            pt: 1.5,
          }}
        >
          {/* تعديل الزر ليقوم بفتح المودال بدلاً من الـ navigate */}
          <Button
            onClick={() => setOpenEditDialog(true)}
            size="small"
            sx={{
              color: "#4A5568",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "6px",
              padding: "4px 12px",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#EDF2F7",
                color: "#1A202C",
              },
            }}
          >
            ✏️ Edit
          </Button>

          <Button
            onClick={()=>{handleDelete(place.id)}}
            size="small"
            sx={{
              color: "#E53E3E",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "6px",
              padding: "4px 12px",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#FFF5F5",
              },
            }}
          >
            🗑️ Delete
          </Button>
        </CardActions>
      </Card>

      {/* ==================== تصميم الـ Modal المضاف ==================== */}
     <EditPlaceDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} />
    </>
  );
}
