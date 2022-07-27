import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export const SheetsAccessForm=()=>{
    let { access_token } = useParams();
    const [sheets,setSheets]=useState([]);
    const [pages,setPages]=useState([]);
    const [selectedSheet,setSelectedSheet]=useState("");
    const [sheetName,setSheetName]=useState("");
    const requestGoogleSheets = async()=>{
        var options = {
            'contentType': 'application/json',
            'method'     : 'get',
            'headers'    : { Authorization: 'Bearer ' + access_token },
            'muteHttpExceptions': true,
        };
        var res=await fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'",options);
        var data=await res.json();
        setSheets(data.files);
    }
    const requestPages=async()=>{
        var options = {
            'contentType': 'application/json',
            'method'     : 'get',
            'headers'    : { Authorization: 'Bearer ' + access_token },
            'muteHttpExceptions': true,
        };
        var res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${selectedSheet}?includeGridData=false`,options);
        var data=await res.json();
        var pagesArray=[];
        data?.sheets.map((ele)=>{
            pagesArray.push(ele.properties.title)
        })
        setPages(pagesArray); 
        setSheetName(data.properties.title);
    }
    const handleSheetChange=async(e)=>{
        setSelectedSheet(e.target.value);
        console.log(e.target.value);
    }
    useEffect(()=>{
        requestGoogleSheets();
    },[])
    useEffect(()=>{
        requestPages();
    },[selectedSheet])
    return(
        <Grid container className="PageCenterWithoutMargin">
            <Grid item xs={10} md={5}>
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
            </Grid>
        </Grid >
    );
}