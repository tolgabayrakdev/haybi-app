import {
    Box,
    Link,
    Typography,
    
  } from "@mui/material";
const Footer = () => {
    return ( 
        <Box sx={{p:3, textAlign:'center'}}>
            <Typography>© 2023 All rights reserved by <Link href="https://www.github.com/tolgabayrakdev/dashboard-app-global">Dashboard App</Link> </Typography>
        </Box>
     );
}
 
export default Footer;