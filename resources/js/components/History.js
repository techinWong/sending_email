import React from 'react'

const History = () => {
    return (
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
    )
}

export default History
