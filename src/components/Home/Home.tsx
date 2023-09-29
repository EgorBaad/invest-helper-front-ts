import { Alert, Box } from "@mui/material";
import Cookies from "universal-cookie"

export function Home () {
    const cookies = new Cookies();

    return (
        <Box>
            {!cookies.get("api-token") && <Alert severity="info">Your token is empty. Please set your token in the settings before starting.</Alert>}
        </Box>
    )
}