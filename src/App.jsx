import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    
      <AppRoutes />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "360px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
          },

          success: {
            duration: 3000,
            style: {
              background: "#ecfdf5",
              color: "#166534",
              border: "1px solid #bbf7d0",
            },
          },

          error: {
            duration: 4000,
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            },
          },
        }}
      />
    </>
  );
}

export default App;