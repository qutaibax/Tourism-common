import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const EditPlaceDialog = ({ open, onClose, onSave }) => {
  const [placeType, setPlaceType] = useState("");
  const [placeImage, setPlaceImage] = useState(null);

  const handleSaveAction = () => {
    // نمرر البيانات للمكون الأب عند الحفظ
    onSave({ placeType, placeImage });
    onClose(); // إغلاق بعد الحفظ
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: "10px" } }}
      
    >
      <DialogTitle sx={{ fontWeight: 700, px: 3 }}>
        📍 Add New Place
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        <Typography variant="body2" sx={{ color: "#718096", mb: 3 }}>
          Enter the place details and upload a featured photo.
        </Typography>

        {/* حقل النوع */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Type of Place</InputLabel>
          <Select
            value={placeType}
            label="Type of Place"
            onChange={(e) => setPlaceType(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="Restaurant">🍴 Restaurant</MenuItem>
            <MenuItem value="Hotel">🏨 Hotel</MenuItem>
            <MenuItem value="Park">🌳 Park</MenuItem>
            <MenuItem value="Museum">🏛️ Museum</MenuItem>
          </Select>
        </FormControl>

        {/* حقل رفع الصورة */}
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, mb: 1, color: "#4A5568" }}
        >
          Place Image
        </Typography>
        <Box
          component="label"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #E2E8F0",
            borderRadius: "16px",
            padding: "25px",
            cursor: "pointer",
            backgroundColor: "#F7FAFC",
            transition: "0.2s",
            "&:hover": { borderColor: "#D73220", backgroundColor: "#FFF5F5" },
          }}
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setPlaceImage(e.target.files[0])}
          />
          <Box sx={{ fontSize: "30px", mb: 1 }}>📸</Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, color: "#A0AEC0" }}
          >
            {placeImage ? placeImage.name : "Click to upload photo"}
          </Typography>
        </Box>

        {/* حقل الوصف العام */}
        <TextField
          label="General Description"
          fullWidth
          multiline
          rows={3}
          variant="standard"
          placeholder="Write a brief overview about the city history and culture..."
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputLabel-root": {
              color: "#718096",
              fontWeight: 600,
              fontSize: "14px",
            },
            "& .MuiInput-root": { fontSize: "15px", fontWeight: 500, pt: 0.5 },
            "& .MuiInput-underline:after": { borderBottomColor: "#D73220" },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
        <Button onClick={onClose} sx={{ color: "#718096", fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveAction}
          variant="contained"
          sx={{
            bgcolor: "#D73220",
            borderRadius: "10px",
            px: 4,
            textTransform: "none",
            "&:hover": { bgcolor: "#b52618" },
          }}
        >
          Save Place
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPlaceDialog;
