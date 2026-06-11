import  { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Button,
  Stack,
  Container,
  Divider,
  Card,
} from "@mui/material";

const AddRoomForm = () => {
  const [roomData, setRoomData] = useState({
    roomType: "",
    maxGuests: "",
    price: "",
    description: "",
  });

  const [addedRooms, setAddedRooms] = useState([]);
  const roomTypes = [
    "Single Room",
    "Double Room",
    "Deluxe Suite",
    "Presidential Suite",
    "Studio",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "maxGuests" || name === "price") && value < 0) return;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleAddRoomToList = () => {
    if (!roomData.roomType || !roomData.price)
      return alert("Please fill room type and price!");
    setAddedRooms([...addedRooms, { ...roomData, id: Date.now() }]);
    setRoomData({ roomType: "", maxGuests: "", price: "", description: "" });
  };

  const handleDeleteRoom = (id) => {
    setAddedRooms(addedRooms.filter((room) => room.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* العنوان الرئيسي */}
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "900", color: "#1a237e" }}
      >
        Room Management
      </Typography>

      <Stack spacing={4}>
        {/* --- نموذج الإضافة --- */}
        <Paper
          variant="outlined"
          sx={{ p: 4, borderRadius: 3, bgcolor: "#fff" }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
          >
            + Add New Room Category
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <TextField
                sx={{ flex: 2, minWidth: "250px" }}
                select
                label="Room Type"
                name="roomType"
                value={roomData.roomType}
                onChange={handleChange}
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                sx={{ flex: 1, minWidth: "120px" }}
                type="number"
                label="Max Guests"
                name="maxGuests"
                value={roomData.maxGuests}
                onChange={handleChange}
              />

              <TextField
                sx={{ flex: 1, minWidth: "120px" }}
                type="number"
                label="Price ($)"
                name="price"
                value={roomData.price}
                onChange={handleChange}
              />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Room Features"
              name="description"
              placeholder="e.g. Wi-Fi, AC, King Bed..."
              value={roomData.description}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleAddRoomToList}
              sx={{ alignSelf: "flex-start", px: 4, fontWeight: "bold" }}
            >
              Add to Preview List
            </Button>
          </Box>
        </Paper>

        {/* --- قائمة العرض --- */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Added Rooms List ({addedRooms.length})
          </Typography>

          <Stack spacing={2}>
            {addedRooms.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: "1px dashed #ccc",
                  borderRadius: 2,
                }}
              >
                <Typography color="textSecondary">
                  No rooms added yet.
                </Typography>
              </Box>
            ) : (
              addedRooms.map((room) => (
                <Card
                  key={room.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderLeft: "5px solid #4caf50",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {room.roomType}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {room.maxGuests} Guests |{" "}
                      <strong>${room.price}/Night</strong>
                    </Typography>
                  </Box>
                  <Button
                    color="error"
                    variant="text"
                    onClick={() => handleDeleteRoom(room.id)}
                    sx={{ fontWeight: "bold" }}
                  >
                    Remove
                  </Button>
                </Card>
              ))
            )}
          </Stack>
        </Box>

        <Divider />

        {/* أزرار الحفظ النهائي */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pb: 5 }}
        >
          <Button variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            disabled={addedRooms.length === 0}
            sx={{ px: 6, fontWeight: "bold" }}
          >
            Save & Publish All
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default AddRoomForm;
