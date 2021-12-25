import axios from 'axios';
import React,{useEffect , useState} from 'react'
import Moment from 'react-moment';


const History = () => {

    const [history,setHistory] = useState([]);
    const [selectValue,setSelectValue] = useState({
        value:'0'
    });
    

    const fetchData = async () => {
        const mailHisToryApi = await axios.post('api/history',selectValue)
        // setHistory(mailHisToryApi.data);
        setHistory(mailHisToryApi.data);
        // .then(res => {
        //     console.log(res)
        //     setHistory(res.data);
        // })
        // const mailHistoryApi = await fetch('api/history');
        // const mailHistoryApiResult = await mailHistoryApi.json();
        
        // console.log(mailHistoryApiResult);
    }

    useEffect(() => {
        fetchData();
    },[selectValue])

    const handleSelectChange = (e) => {
        setSelectValue({value:e.target.value})
    }

    console.log(selectValue);

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

            <div className="form-floating">
                <select 
                className="form-select" 
                id="floatingSelect" 
                aria-label="Floating label select example"
                onChange={e => handleSelectChange(e)}
                value={selectValue.value}
                >
                    <option value={0} selected>Open this select menu</option>
                    <option value={1}>Newest</option>
                    <option value={2}>Oldest</option>
                </select>
                <label htmlFor="floatingSelect">Filter By Date</label>
            </div>

        {selectValue.value !== '0' && 
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
                                <td><Moment format="YYYY/MM/DD">{item.updated_at}</Moment></td>
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
        }

        
     </div>
     </div>
    )
}

export default History
