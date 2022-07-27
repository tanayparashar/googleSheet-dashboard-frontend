import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Grid,Typography,Paper, Button } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import { Loader } from "../utility/loader";

export const SheetsAccessForm=()=>{
    const navigate=useNavigate();
    let  {email,access_token } = useParams();
    const [loader, setLoader] = useState(false);
    const [sheets,setSheets]=useState([]);
    const [selectedSheet,setSelectedSheet]=useState("");
    const [pages,setPages]=useState([]);
    const [selectedPage,setSelectedPage]=useState("");
    const [sheetName,setSheetName]=useState("");
    const addToDashboard=async ()=>{
        var obj={email:email, spreasheetName:sheetName, spreadsheetID:selectedSheet, TabName:selectedPage}; 
        setLoader(true);
        try {
            const req = await fetch("https://googlesheets-backend.herokuapp.com/addSpreadsheets", {// eslint-disable-line
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(obj),
            });
            navigate("/dashboard")
            setLoader(false);
        } 
        catch (err) {
            setLoader(false);
            console.log(err);
        }
    }
    const requestGoogleSheets = async()=>{
        setLoader(true);
        var options = {
            'contentType': 'application/json',
            'method'     : 'get',
            'headers'    : { Authorization: 'Bearer ' + access_token },
            'muteHttpExceptions': true,
        };
        var res=await fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'",options);
        var data=await res.json();
        setSheets(data.files);
        setLoader(false);
    }
    const requestPages=async()=>{
        setLoader(true);
        var options = {
            'contentType': 'application/json',
            'method'     : 'get',
            'headers'    : { Authorization: 'Bearer ' + access_token },
            'muteHttpExceptions': true,
        };
        var res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${selectedSheet}?includeGridData=false`,options);
        var data=await res.json();
        var pagesArray=[];
        data?.sheets.map((ele)=>{// eslint-disable-line
            pagesArray.push(ele.properties.title)
        })
        setPages(pagesArray); 
        setSelectedPage("");
        setSheetName(data.properties.title);
        setLoader(false);
    }
    const handleSheetChange=async(e)=>{
        setSelectedSheet(e.target.value);
        console.log(e.target.value);
    }
    useEffect(()=>{
        requestGoogleSheets();
    },[])// eslint-disable-line
    useEffect(()=>{
        requestPages();
    },[selectedSheet])// eslint-disable-line
    return(
        <Grid container className="PageCenterWithoutMargin">
            <Grid item xs={10} md={5}>
                <Paper elevation={6} sx={{p:5}}>
                    <div>
                        <Typography variant="h5" >{`Add spreadsheets from `}</Typography>
                        <Typography variant="h5" fontStyle= 'italic' fontFamily={"italic"}>{`${email}`}</Typography>
                        <Typography variant="h5" >{`to Dashboard`}</Typography>
                    </div>
                    <div style={{margin:"5%"}}>
                    <FormControl fullWidth>
                        <InputLabel>Spreadsheet</InputLabel>
                        <Select
                        value={selectedSheet}
                        label="Spreadsheet"
                        onChange={handleSheetChange}
                        >
                            {
                                sheets.map((ele)=>
                                    <MenuItem value={ele.id}>{ele.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div style={{margin:"5%"}}>
                    <FormControl fullWidth>
                        <InputLabel>Tab Name</InputLabel>
                        <Select
                        value={selectedPage}
                        label="Tab Name"
                        onChange={(e)=>{setSelectedPage(e.target.value)}}
                        >
                            {
                                pages.map((ele)=>
                                    <MenuItem value={ele}>{ele}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div className="flexRight">
                        <Button variant="filled" sx={{backgroundColor:"#03dac5"}} onClick={addToDashboard}>Add Sheet</Button>
                    </div>
                </Paper>
            </Grid>
            <Loader isVisible={loader} />
        </Grid >
    );
}