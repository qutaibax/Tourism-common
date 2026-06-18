import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import { useParams } from "react-router-dom";
// استيراد الأيقونات
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function CreatePlaceDialog({ open, handleClose }) {
  const [cityId, setCityId] = useState("");
  const [location, setLocation] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [cities, setCities] = useState([]);
  const [placeTypes, setPlaceTypes] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingPlaceTypes, setLoadingPlaceTypes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [placeTypesError, setPlaceTypesError] = useState("");
  const fileInputRef = useRef(null);

 const {cityIdP} = useParams();

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/names");
        const names = response.data?.data || [];

        setCities(names);
        if (names.length > 0) {
          setCityId((currentCityId) => (currentCityId ? currentCityId : names[0].id));
        }
      } catch (error) {
        console.log("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchPlaceTypes = async () => {
      setLoadingPlaceTypes(true);
      setPlaceTypesError("");

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/place-types",
        );
        const types = response.data?.data || [];

        setPlaceTypes(types);
        if (types.length > 0) {
          setSelectedType((currentSelectedType) =>
            currentSelectedType ? currentSelectedType : types[0].id,
          );
        }
      } catch (error) {
        console.log("Error fetching place types:", error);
        setPlaceTypesError("Unable to load place types.");
      } finally {
        setLoadingPlaceTypes(false);
      }
    };

    fetchPlaceTypes();
  }, []);

  const resetForm = () => {
    setCityId("");
    setLocation("");
    setOpenTime("");
    setCloseTime("");
    setDescription("");
    setImageFile(null);
    setSelectedType("");
    setSubmitError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        city_name_id: cityIdP || cityId,
        place_type_id: selectedType,
        location,
        description,
        open_time: openTime,
        close_time: closeTime,
      };

      const response = await axios.post("http://127.0.0.1:8000/api/places", payload);
      const newPlaceId = response.data?.data?.id;

      if (imageFile && newPlaceId) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        imageFormData.append("imageable_id", newPlaceId);
        imageFormData.append("imageable_type", "Place");

        await axios.post("http://127.0.0.1:8000/api/uploadImages", imageFormData);
      }

      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error creating place:", error);
      setSubmitError("Unable to create the place. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
    
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm" // يضمن عرضاً مثالياً ورشيقاً (حوالي 600 بكسل)
      scroll="body" // لجعل الـ Scrollbar يظهر بسلاسة لجميع أحجام الشاشات
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(13, 14, 18, 0.4)", // تعتيم خفيف وراقي خلف النافذة
            backdropFilter: "blur(6px)", // التأثير الزجاجي الضبابي الفخم لمنع التشتت
          },
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px", // زوايا دائرية ناعمة تتوافق مع التصميم المودرن
          padding: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* زر الإغلاق (X) في الزاوية العلوية */}
      <IconButton
        aria-label="close"
        onClick={handleClose}
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
            Add New Destination
          </Typography>
          <Typography variant="body2" sx={{ color: "#718096", mt: 0.5 }}>
            Fill in the details to publish this place.
          </Typography>
        </Box>

        {/* جسم الاستمارة */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel
              shrink
              sx={{ color: "#718096", fontWeight: 600, fontSize: "14px" }}
            >
              City Name
            </InputLabel>
            <Select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              displayEmpty
              disabled={loadingCities}
              sx={{ fontSize: "16px", fontWeight: 500, pt: 0.5 }}
            >
              {loadingCities ? (
                <MenuItem value="" disabled>
                  Loading cities...
                </MenuItem>
              ) : (
                cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* حقل الموقع */}
          <TextField
            fullWidth
            variant="standard"
            label="Name of the Place"
            placeholder="e.g. Old Damascus, Syria"
            InputLabelProps={{ shrink: true }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#718096",
                fontWeight: 600,
                fontSize: "14px",
              },
              "& .MuiInput-root": {
                fontSize: "16px",
                fontWeight: 500,
                pt: 0.5,
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#D47A56" },
            }}
          />

          <TextField
            fullWidth
            variant="standard"
            label="Description"
            placeholder="Write a short description about the place"
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
                fontSize: "16px",
                fontWeight: 500,
                pt: 0.5,
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#D47A56" },
            }}
          />

          {/* أوقات العمل في سطر واحد */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="Opens at"
              type="time"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#718096", fontWeight: 600 },
                "& .MuiInput-underline:after": { borderBottomColor: "#D47A56" },
              }}
            />
            <TextField
              label="Closes at"
              type="time"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#718096", fontWeight: 600 },
                "& .MuiInput-underline:after": { borderBottomColor: "#D47A56" },
              }}
            />
          </Box>

          {/* قسم نوع المكان (الكبسولات) */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#718096",
                fontWeight: 600,
                mb: 1.5,
                fontSize: "13px",
              }}
            >
              Type of Place
            </Typography>
            {loadingPlaceTypes ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={18} sx={{ color: "#D47A56" }} />
                <Typography variant="caption" sx={{ color: "#718096" }}>
                  Loading place types...
                </Typography>
              </Box>
            ) : placeTypesError ? (
              <Typography variant="caption" sx={{ color: "#D47A56" }}>
                {placeTypesError}
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {placeTypes.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <Box
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      sx={{
                        padding: "6px 14px",
                        borderRadius: "30px",
                        border: isSelected
                          ? "2px solid #D47A56"
                          : "1px solid #E2E8F0",
                        backgroundColor: isSelected ? "#FFF7F4" : "#FFFFFF",
                        color: isSelected ? "#D47A56" : "#4A5568",
                        fontWeight: 600,
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        "&:hover": {
                          borderColor: "#D47A56",
                          backgroundColor: "#FFF7F4",
                        },
                      }}
                    >
                      {type.type_name}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* منطقة رفع الصور */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#718096",
                fontWeight: 600,
                mb: 1.5,
                fontSize: "13px",
              }}
            >
              Upload Images
            </Typography>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: "100%",
                  height: "110px",
                  borderRadius: "10px",
                  border: imageFile ? "1px solid #D47A56" : "1px dashed #CBD5E0",
                  backgroundColor: imageFile ? "#FFF7F4" : "#FAFAFA",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#D47A56",
                    backgroundColor: "#FFF7F4",
                  },
                }}
              >
                <CloudUploadIcon
                  sx={{ color: imageFile ? "#D47A56" : "#A0AEC0", fontSize: "24px", mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: imageFile ? "#D47A56" : "#718096", fontWeight: 500 }}
                >
                  {imageFile ? imageFile.name : "Click to upload photos"}
                </Typography>
              </Box>
          </Box>

          {/* أزرار التحكم بالـ Dialog في الأسفل */}
          <Box
            sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "flex-end" }}
          >
            <Button
              onClick={() => {
                resetForm();
                handleClose();
              }}
              sx={{ color: "#718096", textTransform: "none", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                submitting ||
                !cityId ||
                !selectedType ||
                !location ||
                !description ||
                !openTime ||
                !closeTime
              }
              sx={{
                backgroundColor: "#1A202C",
                color: "#FFFFFF",
                padding: "10px 32px",
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#D47A56",
                },
              }}
            >
              {submitting ? "Saving..." : "Save Destination"}
            </Button>
          </Box>
          {submitError ? (
            <Typography
              variant="caption"
              sx={{ color: "#D47A56", textAlign: "right" }}
            >
              {submitError}
            </Typography>
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
