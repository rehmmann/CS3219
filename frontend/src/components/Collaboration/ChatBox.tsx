import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

import { SocketContext } from '../../contexts';
import './ChatBox.scss';
import { useContext, useState } from 'react';
import { ClientEvents } from '../../utils/types';
import { Socket } from 'socket.io-client';

type ChatType = {
  currentUser: string | null,
  conversation: { 
    userId: string, 
    message: string
    date: number
  }[],
  roomId: string | null,
}

const ChatBox = (props: ChatType) => {
  const { currentUser, conversation, roomId } = props;
  const soc = useContext<Socket | null>(SocketContext);
  const [message, setMessage] = useState<string>("");
  const handleSendMessage = () => {
    if (soc) {
      setMessage("");
      soc.emit(ClientEvents.MESSAGE, { roomId, message });
    }
  }
  const renderConversation = () => conversation.map(respond => 
    <ListItem key={respond.date}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText 
            sx={{
              textAlign: respond.userId === currentUser ? "right" : "left",
            }}
           primary={respond.message}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText 
           sx={{
            textAlign: respond.userId === currentUser ? "right" : "left",
          }}
          secondary={respond.date}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }
  return (
    <div className="chat_container">
      <Grid container className="chat_grid_container">
        <List className="chat_list">
          {renderConversation()}
        </List>
        <Divider light={true} className="divider_style"/>
        <Grid container className="chat_input_container">
          <Grid item xs={10}>
            <TextField 
              id="outlined-basic-email" 
              value={message} 
              label="" 
              fullWidth 
              onChange={handleChangeMessage}
            />
          </Grid>
          <Grid
            item 
            xs={1} 
            sx={{
              textAlign: "right",
              marginTop: "auto",
            }}
          >
            <Fab sx={{backgroundColor: '#FFD900', '&:hover': {backgroundColor:'#FFD900'}}} aria-label="add" onClick={handleSendMessage}><SendIcon /></Fab>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatBox;