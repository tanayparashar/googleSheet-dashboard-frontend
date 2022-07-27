import {useEffect,useState} from "react";
import { Grid,Typography,Paper,Stack,Button,Divider } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Loader } from "../utility/loader";

var client_id ="178477115618-is2tbrn0oidajb24ca3etv1ofo7vcrgb.apps.googleusercontent.com";
var client_pass = "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";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#DEE4E7',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export const Dashboard= ()=>{
    const navigate = useNavigate();
    const [dashboardData,setDashboardData]=useState([]);
    const [refreshTokens,setRefreshTokens]=useState([]);
    const [dashboardSheets,setDashboardSheets]=useState([]);
    const [loader, setLoader] = useState(false);

    const getDashboardSheets = async () => {
        try {
        setLoader(true)
        const req = await fetch("https://googlesheets-backend.herokuapp.com/spreadsheets", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
            },
        });
        const data = await req.json();
        setDashboardData(data.data);
        setLoader(false)
        } catch (err) {
            console.log(err);
            setLoader(false)
        }
    }; 
    const getRefreshTokens=async()=>{
        setLoader(true)
        try{
            const req = await fetch("https://googlesheets-backend.herokuapp.com/subscriptions", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
                },
            });
            const data = await req.json();
            setRefreshTokens(data.data);
            setLoader(false)
        } 
        catch (err) {
            console.log(err);
            setLoader(false)
        }
    } 
    function getEmailRefreshToken(email)
    {
        for(let i=0;i<refreshTokens.length;i++)
        {
            var ele=refreshTokens[i];
            if(ele.email===email)
            {
                return ele.refresh_token;
            }
        }
    }
    const genrateSheetsCredentials=async ()=>{
        if(dashboardData?.length>0 && refreshTokens.length>0)
        {
            setLoader(true);
            var newArr=[];
            for(let itr=0;itr<dashboardData.length;itr++)
            {
                var ele=dashboardData[itr]; 
                var rt=getEmailRefreshToken(ele.email);
                var accesstoken=await fetch("https://www.googleapis.com/oauth2/v4/token", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                    client_id: client_id,
                    client_secret: client_pass,
                    grant_type: "refresh_token",
                    refresh_token: rt,
                    }),
                });
                accesstoken=await accesstoken.json();
                accesstoken=accesstoken.access_token;
                var options = {
                    'contentType': 'application/json',
                    'method'     : 'get',
                    'headers'    : { Authorization: 'Bearer ' + accesstoken },
                    'muteHttpExceptions': true,
                };
                var res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${ele.spreadsheetID}/values/${ele.TabName}!A1:Z10`,options);
                var data=await res.json();
                var columns=(data.values[0]);
                columns=columns.filter((ele)=>{
                    if(ele==="" || ele===" " || ele==="  ")
                    {
                        return false;
                    }
                    else{
                        return true;
                    }
                })
                var spreadsheetObj={columns:columns, speadsheetName:ele.spreasheetName, TabName:ele.TabName};
                newArr.push(spreadsheetObj);
            }
            setLoader(false)
            setDashboardSheets(newArr);
        }
    }
    useEffect(()=>{
        getRefreshTokens();
        getDashboardSheets();
        genrateSheetsCredentials();
    },[]);// eslint-disable-line
    useEffect(()=>{
        genrateSheetsCredentials();
    },[dashboardData,refreshTokens]);// eslint-disable-line
    return(
        <div>
            <div className="DasboardTop">
                <Typography variant="h4" sx={{m:2}}>Dashboard</Typography>
                <div>
                    <Button sx={{mr:4,backgroundColor:"#0f60b6"}} variant="filled" onClick={()=>{navigate("/subscriptions")}}>Go To Subscriptions</Button>
                </div>
            </div>
            <Divider/>
            <Grid container sx={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                {dashboardSheets?.length>0?
                dashboardSheets?.map((ele)=>
                    <Grid item xs={10} md={5} sx={{m:3}}>
                        <Paper elevation={6} sx={{p:2}}>
                        <Typography>{`Speadsheet Name: ${ele.speadsheetName}`}</Typography>
                        <Typography>{`Tab Name: ${ele.TabName}`}</Typography>
                        <Typography>{`Number of columns: ${ele.columns.length}`}</Typography>
                        <Stack spacing={2}>
                            {ele.columns.map(x=><Item> {x} </Item>)}
                        </Stack>
                        </Paper>
                    </Grid>
                )  :<Typography variant="h4">No spreadsheet added. Add them in subscriptions.</Typography>        
                }
            </Grid>
            <Loader isVisible={loader} />
        </div>
    );
}