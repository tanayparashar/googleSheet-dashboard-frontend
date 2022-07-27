import { useEffect } from "react";
import { gapi } from "gapi-script";
import {GLogin} from "./googleLogin"
import { ListSubscriptions } from "./listSubscriptions";
export const Suscription=()=>{
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
      <div className="PageCenter">
        <div id='gSignButton'>
          {/* <GLogin/> */}
        </div>
        <div>
          <ListSubscriptions/>
        </div>
      </div>
    );
}