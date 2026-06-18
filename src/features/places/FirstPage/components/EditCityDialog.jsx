import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Menu } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";
import { useState, useEffect } from "react";

export default function EditCityDialog({ open, onClose, onSave, cityData }) {
  ////////////////////Get Cities from API to show in the select menu//////////////////////
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        // GET cities from API
        const response = await axios.get("http://127.0.0.1:8000/api/names");

        // Save only the array of cities
        setCities(response.data.data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////

  const [cityName, setCityName] = useState(cityData.city_name.id || "");
  const [description, setDescription] = useState(cityData.description || "");
  const [emergencyNumber, setEmergencyNumber] = useState(
    cityData.emergency_number || "",
  );
  const [imageFile, setImageFile] = useState(null);

  const handleClearAndClose = () => {
    setCityName("");
    setDescription("");
    setEmergencyNumber("");
    setImageFile(null);
    onClose();
  };
  const saveChanges = async () => {
    try {
      const userData = {
        city_name_id: cityName,
        description: description,
        emergency_number: emergencyNumber,
      };

      // الخطوة 1: تحديث بيانات المدينة
      await axios.put(
        `http://127.0.0.1:8000/api/cities/${cityData.id}`,
        userData,
      );

      // الخطوة 2: رفع الصورة إذا تم اختيار ملف جديد
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        imageFormData.append("imageable_id", cityData.id);
        imageFormData.append("imageable_type", "City"); // المسار الكامل لتجنب الخطأ السابق

        await axios.post(
          "http://127.0.0.1:8000/api/uploadImages",
          imageFormData,
        );
      }

      // === المكان الصحيح للاستدعاء ===
      if (onSave) {
        onSave(); // لتحديث البيانات في الصفحة الرئيسية فوراً
      }
      handleClearAndClose(); // لتنظيف الحقول وإغلاق النافذة
      // =============================
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: "16px", padding: "8px" },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#1A202C", pb: 1 }}>
          Edit City Info
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          {/* حقل النوع */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            >
              City Name
            </InputLabel>
            <Select
              label="Type of Place"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              sx={{ borderRadius: "12px" }}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* حقل تعديل الاسم */}
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 3, mt: 1 }}
          />

          {/* تصميم حقل رفع الصورة الأنيق */}
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#4A5568", mb: 1 }}
          >
            City Image
          </Typography>
          <Box
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #CBD5E0",
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer",
              backgroundColor: "#F7FAFC",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#EDF2F7",
                borderColor: "#4A5568",
              },
            }}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <span style={{ fontSize: "24px" }}>📸</span>
            <Typography
              variant="caption"
              sx={{ color: "#718096", mt: 1, fontWeight: 500 }}
            >
              Click to upload a new image
            </Typography>
          </Box>

          {/* حقل تعديل الاسم */}
          <TextField
            value={emergencyNumber}
            onChange={(e) => setEmergencyNumber(e.target.value)}
            autoFocus
            margin="dense"
            label="emergency number"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 3, mt: 1 }}
          />
        </DialogContent>

        {/* أزرار التحكم بالـ Modal */}
        <DialogActions sx={{ pt: 2, px: 2 }}>
          <Button
            onClick={onClose}
            sx={{ color: "#718096", fontWeight: 600, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              saveChanges();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#D73220",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#b52618" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
