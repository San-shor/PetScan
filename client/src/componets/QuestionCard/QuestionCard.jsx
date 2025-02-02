import { useState, useContext, useEffect } from "react";
import { forwardRef } from "react";
import apiClient from "../../ApiServices/ApiClientService";
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import MuiAlert from "@mui/material/Alert";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import "./QuestionCard.css";
import moment from "moment";
import AnswerBox from "./subcomponent/AnswerBox";
import AnswerText from "./subcomponent/AnswerText";
import { NewsFeedContext } from "../NewsFeed/NewsFeed";

const QuestionCard = (props) => {
  const { answerBox, setPrevQuestion, setLatestQuestion } =
    useContext(NewsFeedContext);
  const { question, date } = props;
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [voted, setVoted] = useState(false);
  const answered = question.isAnswered;
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const questionId = question._id;

  const handleUpVote = async (e) => {
    e.preventDefault();
    // toggle the button
    setUpVote(!upVote);
    // send userId to the question votedClients array
    const updatedVotedQuestions = await apiClient.upVoter(questionId, userId);
    // console.log(response);
    setLatestQuestion(updatedVotedQuestions[0]);
    // sort the questions by the number of votes
    const sortedQuestions = updatedVotedQuestions.slice(1).sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });
    // set the sorted questions to the prevQuestions
    setPrevQuestion(sortedQuestions);
  };

  const handleDownVote = (e) => {
    e.preventDefault();
    // too lazy to implement this
    // just toogle the button
    setDownVote(!downVote);
  };

  const checkVoted = () => {
    if (question.votedClients.includes(userId)) {
      setVoted(true);
      setUpVote(true);
    }
  };

  useEffect(() => {
    checkVoted();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        width: "80%",
        mt: 1,
        ml: 20,
      }}
    >
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Question
            <Chip
              label={question.category}
              variant="filled"
              color={
                question.category === "Cat"
                  ? "success"
                  : question.category === "Dog"
                  ? "error"
                  : question.category === "Bird"
                  ? "warning"
                  : question.category === "General"
                  ? "primary"
                  : "info"
              }
              sx={{
                ml: 1,
                fontSize: 12,
              }}
            />
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 0.8, fontSize: 20, color: "#001952", fontWeight: "bold" }}
          >
            {question.question}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "flex-start",
            }}
          >
            <Avatar
              alt={question.clientName}
              src={question.clientName}
              sx={{ width: 34, height: 34, mr: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="body2"
                sx={{ mb: 0.2, fontSize: 13, color: "#001979" }}
              >
                Asked by <strong>{question.clientName}</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontSize: 13, color: "#001979" }}
              >
                Posted on <strong>{date}</strong>
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", my: 2 }} />
          {answered && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar
                  alt={question.vetName}
                  src={question.vetProfile}
                  sx={{ width: 38, height: 38, mr: 1 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mb: 0.2, fontSize: 13, color: "#001979" }}
                  >
                    Answered by <strong>{question.vetName}</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontSize: 13, color: "#001979" }}
                  >
                    Answered on{" "}
                    <strong>
                      {moment(question.answerDate).format(
                        "MMMM Do YYYY, h:mm a"
                      )}{" "}
                    </strong>
                  </Typography>
                </Box>
              </Box>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              p: 2,
            }}
          >
            {answerBox ? (
              <AnswerBox value={question} />
            ) : (
              <AnswerText answerText={question} />
            )}
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
            <Typography variant="body2" sx={{ fontSize: 16, color: "#001952" }}>
              <strong>{question.votedClients.length}</strong> people found this
              helpful
            </Typography>
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
            {answered && userId ? (
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
                  onClick={handleUpVote}
                  disabled={downVote ? true : false}
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
                  onClick={handleDownVote}
                  disabled={upVote ? true : false}
                >
                  {downVote ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                </IconButton>
              </>
            ) : (
              <>
                {userId ? (
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    Helpful votes are not available for unanswered questions
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    Please login to vote
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default QuestionCard;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
