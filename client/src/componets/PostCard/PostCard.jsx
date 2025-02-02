import React from "react";
import apiClient from "../../ApiServices/ApiClientService";
import { useState, useContext } from "react";
import { Paper, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./PostCard.css";
import { NewsFeedContext } from "../NewsFeed/NewsFeed";

const categories = ["Cat", "Dog", "Bird", "Fish", "General"];
const categoriesSelected = [false, false, false, false, false];

const PostCard = () => {
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState(categoriesSelected);
  const accessToken = localStorage.getItem("accessToken");

  const { setLatestQuestion, setPrevQuestion, latestQuestion, prevQuestion } =
    useContext(NewsFeedContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(question);
    const newQuestion = {
      category: category[0],
      question: question,
      postDate: new Date(),
    };
    const response = await apiClient.postQuestion(accessToken, newQuestion);
    console.log(response);
    // set prevQuestion
    setPrevQuestion([...prevQuestion, latestQuestion]);
    setLatestQuestion(response);
    // reset the form
    setQuestion("");
    setSuccess(true);
    setCategorySelected(categoriesSelected);
  };

  return (
    <section className="post-question-container">
      <div className="post-question-header">
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            mb: 2,
          }}
        >
          <h2>Create a post </h2>
          <TextField
            sx={{
              wwidth: "100%",
              mt: 2,
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.5rem",
                backgroundColor: "#F7F7F7",
                "& fieldset": {
                  borderColor: "#E0E0E0",
                },
                "&:hover fieldset": {
                  borderColor: " #007bff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007bff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#6B6B6B",
                fontWeight: 600,
                marginBottom: "0.5rem",
              },
            }}
            label="Post a Question"
            variant="outlined"
            value={question}
            multiline
            maxRows={9}
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Stack
            direction="row"
            spacing={0.5}
            flexWrap={"wrap"}
            sx={{ width: "100%", mt: 2.5, mb: 1 }}
          >
            <h3 className="select-pet" sx={{ mb: 1 }}>
              Select Your Pet
            </h3>
            <Chip
              label="Cat"
              color={categorySelected[0] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([
                  !categorySelected[0],
                  categorySelected[1],
                  categorySelected[2],
                  categorySelected[3],
                  categorySelected[4],
                ]);
                if (categorySelected[0]) {
                  setCategory(category.filter((item) => item !== "Cat"));
                } else {
                  setCategory([...category, "Cat"]);
                }
              }}
            />
            <Chip
              label="Dog"
              color={categorySelected[1] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([
                  categorySelected[0],
                  !categorySelected[1],
                  categorySelected[2],
                  categorySelected[3],
                  categorySelected[4],
                ]);
                if (categorySelected[1]) {
                  setCategory(category.filter((item) => item !== "Dog"));
                } else {
                  setCategory([...category, "Dog"]);
                }
              }}
            />
            <Chip
              label="Bird"
              color={categorySelected[2] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([
                  categorySelected[0],
                  categorySelected[1],
                  !categorySelected[2],
                  categorySelected[3],
                  categorySelected[4],
                ]);
                if (categorySelected[2]) {
                  setCategory(category.filter((item) => item !== "Bird"));
                } else {
                  setCategory([...category, "Bird"]);
                }
              }}
            />
            <Chip
              label="General"
              color={categorySelected[4] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([categorySelected.map]);
                if (categorySelected[4]) {
                  setCategory(category.filter((item) => item !== "General"));
                } else {
                  setCategory([...category, "General"]);
                }
              }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              background: "linear-gradient(45deg, #2196F3 30%, #00BCD4 90%)",
              borderRadius: "3px",
              border: 0,
              height: 48,
              padding: "0 30px",
              boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #00BCD4 30%, #2196F3 90%)",
              },
            }}
            onClick={handleSubmit}
          >
            Post
          </Button>
          <Snackbar
            open={success}
            autoHideDuration={2000}
            onClose={() => setSuccess(false)}
          >
            <Alert onClose={() => setSuccess(false)} severity="success">
              Question posted successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </div>
    </section>
  );
};

export default PostCard;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
