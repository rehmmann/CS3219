import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

import './ChatBox.scss';

type ChatType = {
  currentUser: string,
  conversation: { 
    userId: string, 
    message: string
    date: number
  }[],
}

const ChatBox = (props: ChatType) => {
  const { currentUser, conversation } = props;

  const renderConversation = () => conversation.map(respond => 
    <ListItem key={respond.date}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={respond.userId === currentUser ? "right" : "left"} primary={respond.message}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={respond.userId === currentUser ? "right" : "left"} secondary={respond.date}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );

  return (
    <div className="chat_container">
      <Grid container className="chat_grid_container">
        <List className="chat_list">
          {renderConversation()}
        </List>
        <Divider light={true} className="divider_style"/>
        <Grid container className="chat_input_container">
          <Grid item xs={10}>
            <TextField id="outlined-basic-email" label="" fullWidth />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatBox;