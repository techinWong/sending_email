import React , {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';



const Index = () => {
    const [mailSender , setMailSender] = useState([]);

    // const fetchData = async () => {
    //     const api = await fetch("{{url}}/show");
        
    // }

    // useEffect(() => {
    //     fetchData();
    // },[])

    // console.log(api);
    const fetchData = async () => {
        const api = await fetch('api/mailsender')
        const data = await api.json();
        setMailSender(data);
    }

    useEffect(() => {
        fetchData();
    },[]);

    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Email Form</div>

                        <div className="card-body">
                            <form >
                                <div className="input">
                                    <label>ผู้ส่ง</label>
                                    <select id="sender" name="sender">
                                        {mailSender.map(sender => (
                                            <option>{sender.mail_sender_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='input'>
                                    <label>กลุ่มผู้ได้รับเมล์</label>
                                    <select id="receiver" name="receiver">
                                         <option>Test1</option>
                                        <option>Test1</option>  
                                    </select>
                                </div>
                                <div className='text-area'>
                                    <label>หัวเรื่อง</label>
                                    <textarea name="section" id="" cols="30" rows="2"></textarea>
                                </div>
                                <div className="text-area">
                                    <label>เนื้อหาในเมลล์</label>
                                    <textarea name="section" id="" cols="80" rows="10"></textarea>
                                </div>
                                <button>ส่งเมล์</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;


