import { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
// Icons
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//Axios
import axios from "axios";

export default function CityDialog({ open, onClose }) {
  const [cityName, setCityName] = useState("");
  const [description, setDescription] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  ////////////////////Get Cities from API to show in the select menu//////////////////////
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/names");
        setCities(response.data.data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////

  const handleClearAndClose = () => {
    setCityName("");
    setDescription("");
    setEmergencyNumber("");
    setImageFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // تشغيل مؤشر التحميل
    try {
      // الخطوة أ: إنشاء سجل المدينة
      const cityPayload = {
        city_name_id: cityName,
        description: description,
        emergency_number: emergencyNumber,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/cities/",
        cityPayload,
      );

      // استخراج ID المدينة الجديدة من الرد (حسب هيكلة الـ API الخاص بك)
      const newCityId = response.data.data.id;

      // الخطوة ب: رفع الصورة وربطها بالـ ID الجديد (إذا اختار المستخدم صورة)
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        imageFormData.append("imageable_id", newCityId);
        imageFormData.append("imageable_type", "City"); // تأكد أن هذا هو الاسم المتوقع في الباك آند

        await axios.post(
          "http://127.0.0.1:8000/api/uploadImages",
          imageFormData,
        );
      }

      // الخطوة ج: النجاح
      handleClearAndClose();
      // يمكنك هنا إضافة Toast أو Alert للنجاح
    } catch (error) {
      console.error("Full Error Process:", error);
      // تنبيه المستخدم بوجود خطأ
    } finally {
      setLoading(false); // إيقاف التحميل في كل الحالات (نجاح أو فشل)
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClearAndClose}
      fullWidth
      maxWidth="sm"
      scroll="body"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(13, 14, 18, 0.3)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          padding: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {/* زر إغلاق (X) */}
      <IconButton
        aria-label="close"
        onClick={handleClearAndClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: "#A0AEC0",
          "&:hover": { color: "#2D3748" },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pt: 3 }}>
        {/* رأس الـ Dialog */}
        <Box sx={{ mb: 4, pr: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#1A202C", letterSpacing: "-0.5px" }}
          >
            Add New City Profile
          </Typography>
          <Typography variant="body2" sx={{ color: "#718096", mt: 0.5 }}>
            Create a detailed gateway for this province.
          </Typography>
        </Box>

        {/* حقول الإدخال */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* City Name Field*/}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>City Name</InputLabel>
            <Select
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* حقل رفع الصورة الجديد بعرض مدمج وأنيق للغاية */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#718096",
                fontWeight: 600,
                mb: 1.5,
                fontSize: "13px",
              }}
            >
              City Cover Photo
            </Typography>

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <Box
              onClick={() => fileInputRef.current.click()}
              sx={{
                width: "500px", // تحديد العرض ليصبح أصغر ومحاذاة لليسار
                height: "48px", // ارتفاع رشيّق جداً يشبه الأزرار الفخمة
                borderRadius: "10px",
                border: imageFile ? "1px solid #D73220" : "1px dashed #CBD5E0",
                backgroundColor: imageFile ? "#FFF5F5" : "#FAFAFA",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
                padding: "0 12px",
                "&:hover": {
                  borderColor: "#D73220",
                  backgroundColor: "#FFF5F5",
                },
              }}
            >
              <CloudUploadIcon
                sx={{
                  color: imageFile ? "#D73220" : "#A0AEC0",
                  fontSize: "18px",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: imageFile ? "#D73220" : "#4A5568",
                  fontWeight: 600,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {imageFile ? imageFile.name : "Choose Photo"}
              </Typography>
            </Box>
          </Box>

          {/* حقل الوصف العام */}
          <TextField
            label="General Description"
            fullWidth
            multiline
            variant="standard"
            placeholder="Write a brief overview about the city history and culture..."
            InputLabelProps={{ shrink: true }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#718096",
                fontWeight: 600,
                fontSize: "14px",
              },
              "& .MuiInput-root": {
                fontSize: "15px",
                fontWeight: 500,
                pt: 0.5,
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#D73220" },
            }}
          />

          {/* حقل أرقام الطوارئ */}
          <TextField
            label="Emergency Number"
            fullWidth
            variant="standard"
            placeholder="e.g., 999, 911, 112"
            InputLabelProps={{ shrink: true }}
            value={emergencyNumber}
            onChange={(e) => setEmergencyNumber(e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#718096",
                fontWeight: 600,
                fontSize: "14px",
              },
              "& .MuiInput-root": {
                fontSize: "15px",
                fontWeight: 500,
                pt: 0.5,
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#D73220" },
            }}
          />

          {/* أزرار التحكم السفلية */}
          <Box
            sx={{ display: "flex", gap: 2, mt: 1, justifyContent: "flex-end" }}
          >
            <Button
              onClick={handleClearAndClose}
              sx={{
                color: "#718096",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading} // تعطيل الزر أثناء التحميل لمنع التكرار
              sx={{
                backgroundColor: "#1A202C",
                color: "#FFFFFF",
                padding: "10px 32px",
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "14px",
                position: "relative", // للتحكم بتموضع الـ Spinner
                "&:hover": {
                  backgroundColor: "#D73220",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#A0AEC0", // لون رمادي عند التعطيل
                  color: "#FFFFFF",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#FFFFFF", // لون الأبيض ليتناسب مع الزر
                  }}
                />
              ) : (
                "Save City Profile"
              )}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
