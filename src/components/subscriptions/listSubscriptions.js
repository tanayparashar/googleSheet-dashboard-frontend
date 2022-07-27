import { useEffect,useState } from "react";
import Grid from '@mui/material/Grid';
import { EmailComponent } from "./emailComponent";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import { Loader } from "../utility/loader";

const ListDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
 
export const ListSubscriptions = () => {
  const [subscriptions,setSubscriptions]=useState([]);
  const [loader, setLoader] = useState(false);
  const getSubscriptions = async () => {
    setLoader(true);
    try {
      const req = await fetch("http://localhost:3001/subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await req.json();
      setSubscriptions(data.data);
      setLoader(false)
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  useEffect(() => {
    getSubscriptions();
  },[]);

  return(
    <div>
      <Grid item xs={10} md={6}>
        <ListDiv>
          <List>
            <Grid container spacing={2}>
            <Grid sx={{m:2}}>
            {
              subscriptions?.map((ele) => 
                <EmailComponent key={ele.refresh_token} email={ele.email} refresh_token={ele.refresh_token}/>
              )
            }
            </Grid>
            </Grid>
          </List>
        </ListDiv>
      </Grid>
      <Loader isVisible={loader} />
    </div>
  );
};
