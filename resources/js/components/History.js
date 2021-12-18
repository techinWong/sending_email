import React,{useEffect , useState} from 'react'
import Moment from 'react-moment';


const History = () => {

    const [history,setHistory] = useState([]);

    const fetchData = async () => {
        const mailHistoryApi = await fetch('api/history');
        const mailHistoryApiResult = await mailHistoryApi.json();
        setHistory(mailHistoryApiResult);
        console.log(mailHistoryApiResult);
    }

    useEffect(() => {
        fetchData();
    },[])

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
                            <td>{item.sender_mail}</td>
                            <td>{item.user_send}</td>
                            <td>{item.topic_mail}</td>
                            <td>จำนวนที่ส่ง</td>
                            <td>status</td>
                            <td>200</td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
     </div>
     </div>
    )
}

export default History
