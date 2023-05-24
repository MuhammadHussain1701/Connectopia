import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import loader from "../../assets/loader.gif";
import Form from "./Form";
import { NavLink } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [loadingEffect, setLoadingEffect] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingEffect(false);
    }, 2000);
  },[]);
  return (
    <>
      {loadingEffect ? (
        <div className="login-loading">

          <HashLoader  color="#02aaff" size={200} />
        </div>
      ) : (
        <Box>
          <Box  
            width="100%"
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
          >
            <NavLink to="/" className="textDecoration">
              <Typography
                fontWeight="bold"
                fontSize="32px"
                color="primary"
                fontFamily="cursive"
              >
                Connectopia.
              </Typography>
            </NavLink>
          </Box>

          <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              Welcome to Connectopia, the Social Media for Sociopaths!
            </Typography>
            <Form />
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
