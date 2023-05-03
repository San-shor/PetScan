import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const QuestionLog = (props) => {
  const { question, index, handleDelete } = props;
  const answeredTrack = question.isAnswered;
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 0,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <List>
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "none",
          }}
        >
          <ListItemText
            sx={{
              padding: "2%",
              backgroundColor: question.isAnswered ? "#f1efef" : "#FFFFFF",
              borderRadius: 2
            }}
            primaryTypographyProps={{
              fontSize: "1.3rem",
              fontFamily: "Roboto",
              fontWeight: "bold"
            }}
            secondaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
              color: question.isAnswered ? "#000000" : "red",
            }}
            primary={`${index + 1}. ${question.question}`}
            secondary={answeredTrack ? ' - '+question.answer : "Not Answered"}
          />
          <DeleteForeverIcon
            onClick={() => handleDelete(question._id)}
            sx={{
              color: "red",
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default QuestionLog;