import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// من الأفضل تعريف المصفوفة هنا لضمان قراءتها
const countries = [
  
  { code: "DA", label: "Damascus" },
];

export default function CountrySelectFilter() {
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        id="country-select-demo"
        options={countries}
        autoHighlight
        openOnFocus
        // حذفنا filterOptions اليدوية مؤقتاً لأن MUI ذكي بما يكفي للبحث في الـ label تلقائياً
        getOptionLabel={(option) => option.label}
        sx={{
          width: "79%",
          backgroundColor: "white",
          borderRadius: "6px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            padding: "7px 9px !important",
            "& fieldset": { borderColor: "#D1D9E2" },
            "&:hover fieldset": { borderColor: "#D73220" },
            "&.Mui-focused fieldset": {
              borderColor: "#D73220",
              borderWidth: "1px",
            },
          },
          transition: "transform 0.3s, box-shadow 0.3s", // لجعل الحركة ناعمة
          "&:hover": {
            transform: "scale(1.02)", // تكبير بسيط جداً
            boxShadow: "0 5px 5px rgba(0,0,0,0.12)", // زيادة الظل عند المرور
            cursor: "pointer", // تغيير شكل الماوس
          },
        }}
        renderOption={(props, option) => (
          // تأكد من تمرير props هنا بشكل مباشر ومبسط
          <li
            {...props}
            key={option.code}
            style={{
              fontFamily: "Almarai",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <img
              loading="lazy"
              width="18"
              style={{ marginRight: "10px" }}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code})
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            size="small"
            color="black"
            // استخدمنا inputProps القديمة لضمان التوافق مع القائمة
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Almarai",
                fontSize: "15px",
                left: 0,
                transformOrigin: "left",
              },
            }}
            // تعديل بسيط هنا لضمان ظهور الخط داخل الحقل
            sx={{ "& input": { fontFamily: "Almarai", fontSize: "15px" } }}
          />
        )}
      />
    </div>
  );
}
