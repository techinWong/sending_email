import axios from 'axios';
import React,{useEffect , useState} from 'react'
import moment from 'moment'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import Navbar from './Navbar';
import Box from '@mui/material/Box';





const History = () => {

    let today = new Date();
    let year = today.getFullYear();
    const [history,setHistory] = useState([]);
    const [data,setData] = useState({
        fromDate:new Date(),
        toDate:new Date(),
        year:new Date(),
        dateChecked:false,
        yearChecked:true
    })
    
    
    const fetchData = async () => {
        const mailHisToryApi = await axios.post('api/history',{
            fromDate:data.fromDate,
            toDate:data.toDate,
            year:data.year.getFullYear(),
            dateChecked:data.dateChecked,
            yearChecked:data.yearChecked
        })
        setHistory(mailHisToryApi.data);
    }


    useEffect(() => {
        fetchData();
    },[data])

 
    return (
        <Box className="container">
            <Box className="row justify-content-center">

            <Navbar History='active'/>

            <Box>
            <Box className="form-check">
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    defaultValue 
                    id="formCheckChecked" 
                    checked={data.yearChecked} 
                    onChange={() => {setData({...data,yearChecked:!data.yearChecked , dateChecked:false})}}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disabled={data.dateChecked && true}
                                views={["year"]}
                                label="Year only"
                                value={data.year}
                                onChange={newYearValue => setData({...data,year:newYearValue})}
                            />
                        </LocalizationProvider>    
                    </MuiPickersUtilsProvider>
                </Box>

                <Box className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        defaultValue 
                        id="formCheckDefault" 
                        checked={data.dateChecked} 
                        onChange={() => {setData({...data,dateChecked:!data.dateChecked , yearChecked:false})}}
                        />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disabled={data.yearChecked && true}
                        label="FROM"
                        value={data.fromDate}
                        onChange={(newDateValue) => {
                        setData({...data,fromDate:newDateValue});
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </MuiPickersUtilsProvider>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disabled={data.yearChecked && true}
                        label="TO"
                        value={data.toDate}
                        onChange={(newDateValue) => {
                        setData({...data,toDate:newDateValue});
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </MuiPickersUtilsProvider>
                </Box>

                
            </Box>
            
                    
                <Box>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">วันที่ส่ง</th>
                        <th scope="col">ผู้ส่ง</th>
                        <th scope="col">กลุ่มที่ส่ง</th>
                        <th scope="col">หัวเรื่อง</th>
                        <th scope="col">จำนวนที่ส่ง</th>
                        <th scope="col">สำเร็จ/ล้มเหลว</th>
                        <th scope="col">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item,i) => (
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
                                <td>{item.group_name}</td>
                                <td>{item.user_send}</td>
                                <td>{item.mail_topic}</td>
                                <td>จำนวนที่ส่ง</td>
                                <td>{item.status === '200' ? 'success' : 'failed'}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </Box>
        {/* } */}

        
     </Box>
     </Box>
    )
}

export default History
