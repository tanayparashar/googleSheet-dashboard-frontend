import { useEffect } from "react";
import { gapi } from "gapi-script";
import {GLogin} from "./googleLogin"
import { ListSubscriptions } from "./listSubscriptions";
import { Typography,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Suscription=()=>{
  const navigate=useNavigate();
    var client_id= "178477115618-is2tbrn0oidajb24ca3etv1ofo7vcrgb.apps.googleusercontent.com";
    useEffect(()=>{
      function start(){
        gapi.client.init({
          client_id: client_id,
          scope: "https://www.googleapis.com/auth/drive.readonly",
        });
      }
      gapi.load('client:auth2',start);
    },[]);

    return (
      <div >
         <div className="DasboardTop">
            <Typography variant="h4" sx={{m:2}}>Dashboard</Typography>
            <div>
                <Button sx={{mr:4,backgroundColor:"#0f60b6"}} variant="filled" onClick={()=>{navigate("/dashboard")}}>Go To Dashboard</Button>
            </div>
          </div>
            <div className="PageCenter">
                <div id='gSignButton'>
                  <GLogin/>
                </div>
                <div>
                  <ListSubscriptions/>
                </div>
                <div>
                  <Typography variant="h5">Click on your Google account to add spreadsheet.</Typography>
                </div>
            </div>
      </div>
    );
}