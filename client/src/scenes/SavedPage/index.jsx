import { Box, useMediaQuery, Grid, Paper, Typography, Select, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { PhotoAlbumOutlined } from "@mui/icons-material";
import PostWidget from "scenes/widgets/PostWidget";
import HashLoader from "react-spinners/HashLoader";
const SavedPage = () => {
  const [savedPosts, setsavedPosts] = useState([]);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingEffect, setLoadingEffect] = useState(true);
  const getsavedPosts = () => {
    const savedPosts = window.localStorage.getItem('savedPosts');
    const data = JSON.parse(savedPosts);
    setsavedPosts(data);
    console.log('19-->', data)
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRemoveItem = (index) => {
    const items = JSON.parse(localStorage.getItem('savedPosts')) || [];
    items.splice(index, 1);
    localStorage.setItem('savedPosts', JSON.stringify(items));
    window.location.reload();
  }
  const deleteAllSaved = () => {
    localStorage.removeItem("savedPosts")
  }

  useEffect(() => {
    getsavedPosts();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoadingEffect(false);
    }, 2000);
  },[]);
  const filteredImages = selectedCategory === 'all'
    ? savedPosts
    : savedPosts.filter((image) => image.category === selectedCategory);

  return (
    <>
      {loadingEffect ? (
        <div className="login-loading">

          <HashLoader  color="#02aaff" size={200} />
        </div>
      ) : (
        <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1">
              My Saved Images
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="great">Great</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="ok">Ok</MenuItem>
              </Select>
            </Box>
          </Grid>
          {filteredImages?.length > 0 ? (
            filteredImages?.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PostWidget
                  postId={image.postId}
                  postUserId={image.userId}
                  name={image.name}
                  description={image.description}
                  location={image.location}
                  picturePath={image?.picturePath}
                  userPicturePath={image?.userPicturePath}
                  likes={image?.likes}
                  comments={image?.comments}
                />
                {/* <Button variant="contained" color="error" style={{ marginTop: '1rem' }}
                  onClick={() => handleRemoveItem(index)}>Remove</Button> */}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <PhotoAlbumOutlined fontSize="large" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2">
                      No saved images found for this category
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
      )}
    </>
    
  );
};

export default SavedPage;