import {Button, Stack, Typography} from "@mui/material";
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-config.js';

export const Navbar = (props) => {
    const logout = async () => {
        try {
            await signOut(auth)
            props.setLoggedIn(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (<Stack
        sx={{py: 2, borderBottom: "1px solid dimgray"}}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
    >
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">Fault Manager</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" color="error" onClick={logout}>
                Logout
            </Button>
        </Stack>
    </Stack>)
}