import React from 'react'

const History = () => {
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
                    <th scope="col">วันที่ส่ง</th>
                    <th scope="col">ผู้ส่ง</th>
                    <th scope="col">กลุ่มที่ส่ง</th>
                    <th scope="col">หัวเรื่อง</th>
                    <th scope="col">จำนวณที่ส่ง</th>
                    <th scope="col">สำเร็จ/ล้มเหลว</th>
                    <th scope="col">สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>6</td>
                    <td>success</td>
                    <td>200</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </table>
        </div>
     </div>
     </div>
    )
}

export default History
