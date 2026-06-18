import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// استيراد مكونات الـ Modal من MUI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import EditCityDialog from "./EditCityDialog";

import axios from "axios";

export default function ImgMediaCard({ city }) {
  const navigate = useNavigate();

  // 1. حالات التحكم بالـ Modal والبيانات المؤقتة أثناء التعديل
  const [open, setOpen] = useState(false);

  // دالة لفتح الـ Modal
  const handleOpen = () => {
    setOpen(true);
  };

  // دالة لإغلاق الـ Modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cities/${id}`,
      );

      alert("City deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const BASE_URL = "http://127.0.0.1:8000"; // تأكد من أن هذا هو الرابط الصحيح للوصول إلى الصور المخزنة
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
          onClick={() => navigate(`/${city.city_name.name.toLowerCase()}/${city.city_name.id}`)}
        >
          <CardMedia
            component="img"
            alt={city.city_name.name}
            height="150"
            image={
              city.images && city.images.length > 0
                ? `${BASE_URL}${city.images[city.images.length - 1].image_path}` // أخذ آخر عنصر في المصفوفة
                : "src/Images/download (1).jpg"
            }
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
            onClick={() => navigate(`/${city.city_name.name.toLowerCase()}/${city.city_name.id}/places`)}
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
            {city.city_name.name}
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
            onClick={handleOpen}
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
            onClick={() => {
              handleDelete(city.id);
            }} // تأكد من تمرير الـ id الصحيح
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
      <EditCityDialog open={open} onClose={handleClose} cityData={city} />
    </>
  );
}
