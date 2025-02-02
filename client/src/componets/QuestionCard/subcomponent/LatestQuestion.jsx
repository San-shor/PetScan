import { useState, useContext } from "react";
import apiClient from "../../../ApiServices/ApiClientService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AnswerBox from "./AnswerBox";
import "./LatestQuestion/LatestQuestion.css";
import AnswerText from "./AnswerText";
import { NewsFeedContext } from "../../NewsFeed/NewsFeed";
import moment from "moment";

const LatestQuestion = () => {
  const { latestQuestion, setLatestQuestion, setPrevQuestion } =
    useContext(NewsFeedContext);
  // if (!latestQuestion.votedClients) return <div>Loading...</div>;
  const answered = latestQuestion.isAnswered;
  const date = moment(latestQuestion.postDate).format("MMMM Do YYYY, h:mm a");
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [voted, setVoted] = useState(false);

  const userId = localStorage.getItem("userId");
  const questionId = latestQuestion._id;

  const handleLatestUpVote = async (e) => {
    e.preventDefault();
    // toggle the button
    setUpVote(!upVote);
    // send userId to the question votedClients array

    const updatedVotedQuestions = await apiClient.upVoter(questionId, userId);

    setLatestQuestion(updatedVotedQuestions[0]);
    // sort the questions by the number of votes
    const sortedQuestions = updatedVotedQuestions.slice(1).sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });

    // set the sorted questions to the prevQuestions
    setPrevQuestion(sortedQuestions);
  };

  const handleLatestDownVote = (e) => {
    e.preventDefault();
    // too lazy to implement this
    // just toogle the button
    setDownVote(!downVote);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        mt: 0,
      }}
    >
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "35vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            p: 2,
            transition: "all 0.3s ease-in-out",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            ":hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, color: "#001952" }}>
            Recent Question
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontSize: 20, fontWeight: "bold", color: "#001952" }}
          >
            {latestQuestion.question}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: 13, color: "#808080" }}
          >
            Asked by <strong>{latestQuestion.clientName}</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: 13, color: "#001979" }}
          >
            Posted on {date}
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
          {answered && (
            <>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontSize: 13, color: "#001979" }}
              >
                Answered by <strong>{latestQuestion.vetName}</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontSize: 13, color: "#001979" }}
              >
                Answered on{" "}
                <strong>
                  {moment(latestQuestion.answerDate).format(
                    "MMMM Do YYYY, h:mm a"
                  )}{" "}
                </strong>
              </Typography>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              p: 2,
            }}
          >
            <AnswerText answerText={latestQuestion} />
          </Box>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              color: "#001952",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            <ThumbUpIcon sx={{ fontSize: 24, color: "#4CAF50", mr: 0.5 }} />
            {latestQuestion.votedClients ? (
              <Typography
                variant="body2"
                sx={{ fontSize: 16, color: "#001952" }}
              >
                <strong>{latestQuestion.votedClients.length}</strong> people
                found this helpful
              </Typography>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              background: "linear-gradient(to bottom, #bdd9e7, #8fc3e6);",
              color: "black",
              fontWeight: "bold",
              borderRadius: "4px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              marginBottom: "1rem",
            }}
          >
            {answered ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 16, fontWeight: "bold", mr: 1 }}
                >
                  WAS THIS ANSWER HELPFUL?
                </Typography>
                <IconButton
                  sx={{
                    ml: 1,
                    backgroundColor: upVote ? "#34A853" : "#fff",
                    color: upVote ? "#fff" : "#34A853",
                    "&:hover": {
                      backgroundColor: upVote ? "#34A853" : "#E8F5E9",
                    },
                  }}
                  aria-label="upvote"
                  onClick={handleLatestUpVote}
                  disabled={downVote}
                >
                  {upVote ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                </IconButton>
                <IconButton
                  sx={{
                    ml: 1,
                    backgroundColor: downVote ? "#EA4335" : "#fff",
                    color: downVote ? "#fff" : "#EA4335",
                    "&:hover": {
                      backgroundColor: downVote ? "#EA4335" : "#FFEBEE",
                    },
                  }}
                  aria-label="downvote"
                  onClick={handleLatestDownVote}
                  disabled={upVote}
                >
                  {downVote ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                </IconButton>
              </>
            ) : (
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                Helpful votes are not available for unanswered questions
              </Typography>
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default LatestQuestion;
