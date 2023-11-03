import * as React from "react";
import Form from "./pages/form";
import Check from "./pages/check";
import History from "./pages/history";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/check" element={<Check />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
