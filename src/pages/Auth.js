import {Button, Container, Paper, Stack, Typography} from "@mui/material";
import {auth, googleProvider} from '../firebase-config';
import { signInWithPopup} from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

export const Auth = (props) => {

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            props.setLoggedIn(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (<Container maxWidth="xs">
        <Paper sx={{p: 6, mt: "25%"}} elevation={2}>
            <Stack spacing={2}>
                <Typography variant="h4" alignSelf="center">Sign in</Typography>

                <Button sx={{p: 1.2}} variant="contained" onClick={signInWithGoogle}> <GoogleIcon
                    sx={{mb: .2, mr: 1}}/> Continue with
                    Google</Button>

            </Stack>
        </Paper>
    </Container>)
}
