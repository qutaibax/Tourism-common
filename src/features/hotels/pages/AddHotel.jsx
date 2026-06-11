import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Container,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HotelIcon from "@mui/icons-material/Hotel";
//import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CollectionsIcon from "@mui/icons-material/Collections";

const AddHotelForm = () => {
  const { setCurrentTitle } = useAdmin();

  useEffect(() => {
    setCurrentTitle("Add New Hotel Property"); // تحديث عنوان الـ Navbar فورياً
  }, [setCurrentTitle]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    services: [],
    roomType: "",
    maxGuests: 0,
    price: 0,
  });

  const locations = [
    "New York, USA",
    "London, UK",
    "Dubai, UAE",
    "Paris, France",
    "Tokyo, Japan",
  ];
  // const roomTypes = ["Single Room", "Double Room", "Deluxe Suite", "Presidential Suite"];
  const availableServices = [
    "Free Wi-Fi",
    "Swimming Pool",
    "Parking",
    "Restaurant",
    "Room Service",
    "Gym",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "maxGuests" || name === "price") && value < 0) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (service) => {
    const currentIndex = formData.services.indexOf(service);
    const newServices = [...formData.services];
    currentIndex === -1
      ? newServices.push(service)
      : newServices.splice(currentIndex, 1);
    setFormData({ ...formData, services: newServices });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "900", color: "#1a237e" }}
      >
        Add New Hotel Entry
      </Typography>

      <Stack spacing={4}>
        {/* --- SECTION 1: HOTEL INFO (FLEXBOX) --- */}
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <HotelIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Hotel General Information
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Row 1: Name & Location */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <TextField
                sx={{ flex: 2, minWidth: "300px" }}
                label="Hotel Name"
                name="name"
                onChange={handleChange}
              />
              <TextField
                sx={{ flex: 1, minWidth: "250px" }} // حجم مناسب لاسم الموقع
                select
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Row 2: Description (Full Width) */}
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Detailed Description"
              name="description"
              placeholder="Provide a deep dive into the hotel details..."
              onChange={handleChange}
            />

            {/* Row 3: Services (Flex Wrap) */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Services
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {availableServices.map((service) => (
                  <FormControlLabel
                    key={service}
                    sx={{ minWidth: "150px" }}
                    control={
                      <Checkbox
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceChange(service)}
                      />
                    }
                    label={service}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* --- SECTION 2: ROOM INFO (FLEXBOX) ---
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <MeetingRoomIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">Room Specifications</Typography>
          </Stack>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <TextField
              sx={{ flex: 2,maxWidth: '200px' }} // حجم مرن يناسب اسم الغرفة
              select
              label="Room Category"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
            >
              {roomTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField 
              sx={{ flex: 1, minWidth: '150px' }} 
              type="number" 
              label="Guests" 
              name="maxGuests" 
              onChange={handleChange} 
              inputProps={{ min: 0 }} 
            />

            <TextField 
              sx={{ flex: 1, minWidth: '150px' }} 
              type="number" 
              label="Price ($)" 
              name="price" 
              onChange={handleChange} 
              inputProps={{ min: 0 }} 
            />
          </Box>
        </Paper> */}

        {/* --- SECTION 3: IMAGE UPLOAD (FLEXBOX CENTERED) --- */}
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <CollectionsIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Gallery Management
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #1976d2",
              borderRadius: 4,
              p: 6,
              bgcolor: "#f8fbff",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: "#f0f7ff",
                borderColor: "#1565c0",
                transform: "scale(1.01)",
              },
            }}
            component="label"
          >
            <input type="file" hidden multiple accept="image/*" />
            <Box sx={{ bgcolor: "#e3f2fd", p: 2, borderRadius: "50%", mb: 2 }}>
              <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            </Box>
            <Typography variant="h6" color="primary">
              Upload Media Assets
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Drop your high-quality hotel images here
            </Typography>
          </Box>
        </Paper>

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="text" color="inherit" size="large">
            Discard
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 6, fontWeight: "bold" }}
          >
            Publish Hotel
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default AddHotelForm;
