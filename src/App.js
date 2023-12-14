import {Auth} from "./pages/Auth.js";
import {useState} from "react";
import {Dashboard} from "./pages/Dashboard.js";
import {Navbar} from "./components/Navbar.js";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [colorMode, setColorMode] = useState('light')

    const darkTheme = createTheme({
        palette: {
            mode: colorMode,
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                {loggedIn ?
                    <>
                        <Navbar setLoggedIn={setLoggedIn} setColorMode={setColorMode} colorMode={colorMode}/>
                        <Dashboard/>
                    </>
                    :
                    <Auth setLoggedIn={setLoggedIn}/>
                }
            </ThemeProvider>
        </>
    )
}

export default App
