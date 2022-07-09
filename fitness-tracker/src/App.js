import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme.config";

import SignIn from "./pages/SignIn";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<SignIn />} />
                <Route path="/sign-up" />
            </Routes>
        </Router>
    );
}

export default App;
