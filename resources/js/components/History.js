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
        const mailHisToryApi = await axios.post('api/history',data)
        setHistory(mailHisToryApi.data);
    }


    useEffect(() => {
        fetchData();
    },[data])

    console.log(data);
 
    return (
        <div className="container">
            <div className="row justify-content-center">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Email Form</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="http://127.0.0.1:8000/">Home</a>
                            <a className="nav-link" href="http://127.0.0.1:8000/history">History</a>
                         </div>
                        </div>
                     </div>
            </nav>

            <div>
                <div className="form-check">
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
                </div>

                <div className="form-check">
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
                </div>
            </div>
            
                    
                <div>
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
                                <td>{item.topic_mail}</td>
                                <td>จำนวนที่ส่ง</td>
                                <td>{item.status === '200' ? 'success' : 'failed'}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        {/* } */}

        
     </div>
     </div>
    )
}

export default History
