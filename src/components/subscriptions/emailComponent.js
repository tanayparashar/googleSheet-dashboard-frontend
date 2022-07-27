import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

var client_id ="178477115618-is2tbrn0oidajb24ca3etv1ofo7vcrgb.apps.googleusercontent.com";
var client_pass = "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";

export const EmailComponent = (props) => {
    const {email,refresh_token}=props;
    const navigate = useNavigate();
    const handleAccountClick=async ()=>{
        fetch("https://www.googleapis.com/oauth2/v4/token", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
            client_id: client_id,
            client_secret: client_pass,
            grant_type: "refresh_token",
            refresh_token: refresh_token,
            }),
        })
        .then((res) => {
            res.json().then((data) => {
                console.log(data);
                navigate(`/selectSheet/${email}/${data.access_token}`)
            });
        })
      .catch((err) => console.log(err));
    }
  return(
    <div onClick={handleAccountClick} className="EmailDiv">
      <Paper elevation={6} sx={{m:2}}>
        <ListItem>
            <ListItemIcon>
                <GoogleIcon />
            </ListItemIcon>
            <ListItemText
                primary={email}
            />
        </ListItem>
        <Divider/>
      </Paper>
    </div>
  );
};
