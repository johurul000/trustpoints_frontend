import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminApp from "./admin/AdminApp";
import UserApp from "./user/UserApp";
import { ThemeProvider } from "./theme/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      
        <Routes>
          <Route path="admin/*" element={<AdminApp />} />
          <Route path="*" element={<UserApp />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
