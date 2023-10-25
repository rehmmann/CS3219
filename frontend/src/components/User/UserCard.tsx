// Import react
import { useEffect, useState } from "react";
import { useFindMatchMutation } from "../../redux/api";
// Import MUI
import { Box, IconButton, Paper, Stack } from "@mui/material";

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { initMatch } from "../../redux/slices/matchSlice";

import { firebaseAuth } from "../../utils/firebase";
type UserLogoProps = {
  logoLink?: string;
};

type MatchButtonProps = {
  type: "topic" | "difficulty";
  title: string;
  value: string;
};

//----------------------------------------------------------------//
//                      LOCAL COMPONENTS                          //
//----------------------------------------------------------------//
const UserLogo = (props: UserLogoProps) => {
  const { logoLink } = props;
  return (
    <Stack
      sx={{
        width: 81,
        height: 81,
        backgroundImage: logoLink ?? "/user/ellipse-bg.svg",
        backgroundColor: "#D9D9D9",
        borderRadius: "50%",
        display: "flex",
        flexdirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: 81,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img
          height="64"
          width="59"
          src="/user/default-male-user-logo.svg"
          alt="user"
        />
      </Stack>
    </Stack>
  );
};

const UserCard = () => {
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: RootState) => state.user);
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();
  const [findMatch, {}] = useFindMatchMutation();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in. Get the user's email and token.
        const email = user?.email;
        user.getIdToken().then((token) => {
          setUserEmail(email);
          setUserToken(token);
        });
      } else {
        // User is signed out.
        setUserEmail(null);
        setUserToken(null);
      }
    });

    // Clean up the listener when the component unmounts.
    return () => {
      unsubscribe();
    };
  }, []);
  //----------------------------------------------------------------//
  //                     LOCAL COMPONENTS                           //
  //----------------------------------------------------------------//
  const MatchButton = (props: MatchButtonProps) => {
    const { type, title, value } = props;
    const getBackgroundColor = () => {
      if (value === selectedTopic || value === selectedDifficulty) {
        return "#FFD900";
      } else {
        return "white";
      }
    };
    return (
      <IconButton
        sx={{
          color: "black",
          backgroundColor: getBackgroundColor(),
          height: 33,
          width: type === "topic" ? 85 : 100,
          borderRadius: 14,
          border: "3px solid black",
          "&:hover": {
            color: "black",
            border: "3px solid black",
          },
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 13,
        }}
        disableRipple
        onClick={() => {
          if (value === selectedTopic || value === selectedDifficulty) {
            type === "topic" ? setSelectedTopic("") : setSelectedDifficulty("");
          } else {
            type === "topic"
              ? setSelectedTopic(value)
              : setSelectedDifficulty(value);
          }
        }}
      >
        {title}
      </IconButton>
    );
  };
  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  return (
    <Paper
      sx={{
        width: "100%",
        height: "fit-content",
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Stack spacing={5} sx={{}}>
        <Stack direction={"row"} justifyContent={"center"} spacing={3}>
          <UserLogo />
          <Stack direction={"column"}>
            <Box
              sx={{
                fontWeight: 600,
                fontSize: 17,
                textAlign: "left",
              }}
            >
              {user?.username}
            </Box>
            <Box
              sx={{
                textAlign: "left",
              }}
            >
              Level 10
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          spacing={3}
          sx={{
            borderTop: "1px solid #D9D9D9",
            pt: 3,
          }}
        >
          <h4>Topic</h4>
          <Stack direction={"row"} justifyContent={"center"} spacing={1}>
            <MatchButton type="topic" title="Arrays" value="Arrays" />
            <MatchButton type="topic" title="Algorithms" value="Algorithms" />
            <MatchButton type="topic" title="Strings" value="Strings" />
            <MatchButton type="topic" title="Databases" value="Databases" />
          </Stack>
          <h4>Difficulty</h4>
          <Stack direction={"row"} justifyContent={"center"} spacing={2}>
            <MatchButton type="difficulty" title="Easy" value="Easy" />
            <MatchButton type="difficulty" title="Medium" value="Medium" />
            <MatchButton type="difficulty" title="Hard" value="Hard" />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{
              mt: 3,
            }}
          >
            <IconButton
              sx={{
                color: "black",
                backgroundColor: "white",
                height: 33,
                width: 85,
                borderRadius: 14,
                border: "3px solid black",
                "&:hover": {
                  color: "black",
                  border: "3px solid black",
                },
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 13,
              }}
              disableRipple
              onClick={() => {
                findMatch({
                  email: userEmail ? userEmail : "",
                  id: userToken ? userToken : "",
                  topic: selectedTopic ? selectedTopic : "",
                  difficulty: selectedDifficulty ? selectedDifficulty : "",
                }).then((res) => {
                  console.log(res);
                  dispatch(initMatch(true));
                });
              }}
            >
              Match
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserCard;
