import { GoogleLogin } from "react-google-login";
import {gapi} from "gapi-script"
var client_id ="178477115618-is2tbrn0oidajb24ca3etv1ofo7vcrgb.apps.googleusercontent.com";
var client_pass = "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";
export const GLogin = () => {
  const postSubscriptions = async (data, userDetails) => {
    try {
      var obj = { refresh_token: data.refresh_token, email: userDetails.email };
      const req = await fetch("http://localhost:3001/addSubscriptions", {// eslint-disable-line
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(obj),
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const gSignSuccess = (successSignInRes) => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.grantOfflineAccess().then((res) => {
      fetch("https://www.googleapis.com/oauth2/v4/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: client_id,
          client_secret: client_pass,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000",
          code: res.code,
        }),
      })
      .then((res) => {
        res.json().then((data) => {
          postSubscriptions(data, successSignInRes.profileObj);
        });
      })
      .catch((err) => console.log(err));
    })
    .catch((err)=>console.log(err));
  };

  const gSignFailure = (res) => {
    console.log("failure", res);
  };

  return (
    <div className="GoogleButton">
      <GoogleLogin
        clientId="178477115618-is2tbrn0oidajb24ca3etv1ofo7vcrgb.apps.googleusercontent.com"
        buttonText="Login" onSuccess={gSignSuccess}
        onFailure={gSignFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};
