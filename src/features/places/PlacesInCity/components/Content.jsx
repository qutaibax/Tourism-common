// React
import { useEffect, useState } from "react";
import axios from "axios";
import CreatePlaceDialog from "./CreatePlaceDialog";
// MUI Components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import PlaceCard from "./PlaceCard";
import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router-dom";
export default function Content() {
  const [openDialog, setOpenDialog] = useState(false);
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [placesError, setPlacesError] = useState("");
  const {cityId}=useParams();

  
  useEffect(() => {
    const fetchPlaces = async () => {
      setLoadingPlaces(true);
      setPlacesError("");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/places?city_name_id=${cityId}`);
        setPlaces(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlacesError("Unable to load places right now.");
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, [cityId]);

  const handleDialogClose = async () => {
    setOpenDialog(false);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/places?city_name_id=${cityId}`);
      setPlaces(response.data?.data || []);
    } catch (error) {
      console.error("Error refreshing places:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "40px",
        backgroundColor: "#F7FAFC", // خلفية رمادية فاتحة جداً للموقع بالكامل لراحة العين
        minHeight: "100vh",
      }}
    >
      {/* ==================== PLACES CONTAINER ==================== */}
      <Box
        sx={{
          width: "70%", // زيادة المساحة لتعرض الكروت براحة أكبر
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f0f0f0",
          overflow: "hidden", // لمنع خروج العناصر عن الحواف الدائرية
        }}
      >
        {/* Sticky Header: هيدر ثابت عند التمرير */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)", // تأثير زجاجي شفاف خفيف
            backdropFilter: "blur(8px)",
            padding: "24px",
            borderBottom: "1px solid #E2E8F0", // فاصل ناعم بديل لـ hr
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* جهة اليسار: العنوان وعدد العناصر */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1A202C" }}>
              Explore Places
            </Typography>
            <Typography variant="body2" sx={{ color: "#718096", mt: 0.5 }}>
              Manage and view all registered locations
            </Typography>
          </Box>

          {/* جهة اليمين: شريط البحث وزر الإضافة */}
          <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {/* زر الإضافة المتطور */}
            <Button
              onClick={() => setOpenDialog(true)}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                padding: "8px 24px",
                fontSize: "15px",
                fontWeight: "600",
                backgroundColor: "#D73220",
                color: "white",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(215, 50, 32, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#BC2B1A",
                  transform: "translateY(-2px)", // تأثير ارتفاع طفيف عند الهوفر
                  boxShadow: "0px 6px 20px rgba(215, 50, 32, 0.3)",
                },
              }}
            >
              Add New
            </Button>
            {/* Dialog */}
            <CreatePlaceDialog
              open={openDialog}
              handleClose={handleDialogClose}
            />
            {/*== Dialog ==*/}
          </Box>
        </Box>

        {/* Places Grid: شبكة الكروت بداخل حاوية قابلة للتمرير */}
        <Box
          sx={{
            padding: "24px",
            maxHeight: "calc(100vh - 180px)", // تحديد ارتفاع متناسب مع الشاشة
            overflowY: "auto", // تفعيل التمرير العمودي للكروت فقط
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
            scrollBehavior: "smooth",
          }}
        >
          {loadingPlaces ? (
            <Box
              sx={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                py: 6,
              }}
            >
              <CircularProgress size={22} sx={{ color: "#D73220" }} />
              <Typography variant="body2" sx={{ color: "#718096" }}>
                Loading places...
              </Typography>
            </Box>
          ) : placesError ? (
            <Typography
              variant="body2"
              sx={{ gridColumn: "1 / -1", color: "#D73220", py: 3 }}
            >
              {placesError}
            </Typography>
          ) : (
            places.map((place) => <PlaceCard key={place.id} place={place} />)
          )}
        </Box>
      </Box>

      {/* ==================== FILTER CONTAINER ==================== */}
      <Box
        sx={{
          width: "25%",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f0f0f0",
          position: "sticky",
          top: "40px", // يجعل الفلتر ثابتاً في مكانه أيضاً أثناء نزولك لأسفل الصفحة
        }}
      >
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <FormLabel
            component="legend"
            sx={{
              color: "#1A202C",
              fontWeight: 700,
              fontSize: "18px",
              marginBottom: "16px",
              "&.Mui-focused": { color: "#1A202C" },
            }}
          >
            Filter By
          </FormLabel>

          <RadioGroup defaultValue="female" name="radio-buttons-group">
            {[
              { value: "female", label: "Female Layout" },
              { value: "male", label: "Male Layout" },
              { value: "other", label: "Other Options" },
            ].map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                control={
                  <Radio
                    sx={{
                      color: "#D73220",
                      "&.Mui-checked": { color: "#D73220" },
                    }}
                  />
                }
                sx={{
                  margin: "4px 0",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#fcf2f1",
                  },
                  "& .MuiFormControlLabel-label": {
                    fontSize: "15px",
                    color: "#4A5568",
                    fontWeight: 500,
                  },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
