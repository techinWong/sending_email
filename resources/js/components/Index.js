import React , {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Editor from 'ckeditor5-custom-build/build/ckeditor';

const schema = yup.object({
    sender:yup.string().required("กรุณาเลือกกลุ่มผู้ส่ง"),
    receiver:yup.string().required("กรุณาเลือกกลุ่มผู้รับ"),
    topic: yup.string().required("กรุณาใส่หัวข้อเรื่อง"),
    detail: yup.string().required("กรุณาใส่เนื้อหา")
  }).required();



  const editorConfiguration = {
    removePlugins:["EasyImage","ImageUpload","MediaEmbed"],
    height:'350px'
   
    // toolbar: [ 'bold', 'italic' , 'link', 'bulletedList', 'numberedList', 'blockQuote' ] ,
    // heading: {
    //     options: [
    //         { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //         { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //         { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    //     ]
    // }
    }

const Index = () => {
    const [mailSender , setMailSender] = useState([]);
    const [mailGroup , setMailGroup] = useState([]);
    const [resData , setResData] = useState([]);
    const [waitData , setWaitData] = useState(false);

    const { register, handleSubmit, setValue,formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const [mailData , setMailData] = useState({
        sender:"",
        receiver:"",
        topic:"",
        detail:"",
        file:"",
        // editortest:""
    });

    const handleFileChange = e => {
        setMailData({...mailData , file:e.target.files[0]})
    }

    const handleChange = e => {
        const data = {...mailData}
        data[e.target.name] = e.target.value
        setMailData(data);
    }
    
    const resetForm = () => {
       setMailData({sender:'',topic:'',receiver:'',detail:'',file:''})
    }

    

    const formSubmit = e => {
        let formData = new FormData()
        formData.append('receiver',mailData.receiver)
        formData.append('sender',mailData.sender)
        formData.append('topic',mailData.topic)
        formData.append('detail',mailData.detail)
        formData.append('file',mailData.file)
        resetForm()
        setResData("Emails are on pending ! Please wait for a sec")
        axios.post('api/send' , formData , {
            mode: 'cors',
            headers: { 'Content-Type':  'multipart/form-data' }
      })
        .then(res => {
            setWaitData(true);
            setResData(res.data.message);
         } )
        .catch(err => console.log(err.response));
        
    }
    

    const fetchData = async () => {
        const mailSenderApi = await fetch('api/mailsender')
        const mailSenderApiResult = await mailSenderApi.json();

        const mailGroupApi = await fetch('api/mailgroup')
        const mailGroupApiResult = await mailGroupApi.json();

        setMailSender(mailSenderApiResult);
        setMailGroup(mailGroupApiResult);
    }

   

    useEffect(() => {
        fetchData();
    },[]);


    
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
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="/history">History</a>
                            <a className="nav-link" href="/createtemplate">Create Template</a>
                         </div>
                        </div>
                     </div>
            </nav>

            



                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Email Form</div>

                        {resData.length > 0 &&
                                    <div className={waitData ? "alert alert-success " : "alert alert-warning"} role="alert">
                                    {resData}
                                  </div>
                        }
                        
                        <div className="card-body">
                            <form onSubmit={handleSubmit(formSubmit)} id='form-group'>
                                <div className="input">
                                    <label htmlFor="formControlInput" className="form-label">ผู้ส่ง</label>
                                    <div className="col-md-4">
                                        <select {...register("sender")}id="sender" name="sender" style={{width:'50'}} className="form-select form-select-sm" aria-label="Small select" value={mailData.sender} onChange={e => handleChange(e)}>
                                        <option value=""> -- select an E-mail -- </option>
                                            {mailSender.map(sender => (
                                                <option key={sender.mail_sender_name} value={sender.id_mail_sender}>{sender.mail_sender_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <p style={{color:'red' , marginLeft:'4rem'}}>{errors.sender?.message}</p>
                                <div className='input'>
                                    <label htmlFor="formControlInput" className="form-label">กลุ่มผู้ได้รับเมล์</label>
                                    <div className="col-md-4">
                                        <select {...register("receiver")} id="receiver" name="receiver" className="form-select form-select-sm" aria-label="Small select" value={mailData.receiver} onChange={e => handleChange(e)}>
                                        <option value=""> -- select an E-mail -- </option>
                                            {mailGroup.map(mail => (
                                                <option key={mail.group_name} value={mail.id_group}>{mail.group_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <p style={{color:'red' , marginLeft:'4rem'}}>{errors.receiver?.message}</p>
                                <div className='form-group'>
                                    <label htmlFor="formControlInput" className="form-label">หัวเรื่อง</label>
                                    <p style={{color:'red' }}>{errors.topic?.message}</p>
                                    <textarea 
                                    {...register("topic")}
                                    className="form-control" 
                                    value={mailData.topic} 
                                    name="topic" 
                                    cols="30" rows="1" 
                                    onChange={e => handleChange(e)}
                                    ></textarea>
                                </div>

                               

                                <div className="form-group">
                                    <label>เนื้อหาในเมลล์</label>
                                    <p style={{color:'red'}}>{errors.detail?.message}</p>
                                    <h6 className="notice">*การใช้ link กรุณาใส่ https:// ด้วย เช่น https://www.google.com</h6>
                                    <CKEditor 
                                        editor ={ClassicEditor}
                                        config={editorConfiguration}
                                        data={mailData.detail}
                                        name="detail"
                                        onChange={(event,editor) => {
                                            const data = editor.getData();
                                            setMailData({...mailData, detail:data})
                                            setValue('detail',data);
                                        }}
                                    />
                                    
                                </div>
                                {/* <div className="form-group">
                                    <label>เนื้อหาในเมลล์</label>
                                    <p style={{color:'red'}}>{errors.detail?.message}</p>
                                    <textarea 
                                    {...register("detail")}
                                    className="form-control" 
                                    value={mailData.detail} 
                                    name="detail" 
                                    cols="80" rows="10" 
                                    onChange={e => handleChange(e)}
                                    ></textarea>
                                </div> */}
                                

                                <div className="form-group">
                                    <label htmlFor="formFile" className="form-label">เพิ่มไฟล์</label>
                                    <input 
                                    onChange={e => handleFileChange(e)} 
                                    // value={mailData.file.name}
                                    className="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    name="file"/>
                                </div>

                                

                                <button type="submit" className="btn btn-secondary" id="send">SEND</button>

                                

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;


