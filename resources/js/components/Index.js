import React , {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Navbar from './Navbar';
import Popup from 'reactjs-popup';
import SendMailDialog from './SendMailDialog';

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
    }

const Index = () => {
    const [mailSender , setMailSender] = useState([]);
    const [mailGroup , setMailGroup] = useState([]);
    const [template , setTemplate] = useState([]);
    const [templateSelect , setTemplateSelect] = useState(0);
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
    
    const handleSelectChange = e => {
        setTemplateSelect(e.target.value)
        console.log(template)
        console.log(e.target.value)
        if(e.target.value === '0'){
            setMailData({...mailData , detail:''})
        }
        else{
            const filterTemplate = template.filter(temp => temp.template_id == e.target.value)
            setMailData({...mailData , detail:filterTemplate[0].template_detail})
        }
    }

    

    const fetchData = async () => {
        const mailSenderApi = await fetch('api/mailsender')
        const mailSenderApiResult = await mailSenderApi.json();

        const mailGroupApi = await fetch('api/mailgroup')
        const mailGroupApiResult = await mailGroupApi.json();

        const templateApi = await fetch('api/template')
        const templateApiResult = await templateApi.json();

        setMailSender(mailSenderApiResult);
        setMailGroup(mailGroupApiResult);
        setTemplate(templateApiResult);
        
    }


   
    useEffect(() => {
        fetchData();
    },[]);


    
    return (
        

        <div className="container">
            <div className="row justify-content-center">

            <Navbar Home='active'/>

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
                                                <option key={sender.mail_sender_name} value={sender.mail_sender_id}>{sender.mail_sender_name}</option>
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
                                                <option key={mail.group_name} value={mail.group_id}>{mail.group_name}</option>
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
                                    


                                    <div style={{display:'flex'}} className="form-floating">
                                        <select onChange={e => handleSelectChange(e)} value={templateSelect} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option selected value="0">None</option>
                                            {template.map(temp => {
                                               return <option value={temp.template_id} key={temp.template_id}>{temp.template_name}</option>
                                            })}
                                        </select>
                                        <label htmlFor="floatingSelect">Template</label>
                                        <a href="/createtemplate" target="_blank"><button type="button" className="btn btn-secondary">Add Template</button></a>
                                    </div>

                                    
                                    <h6 className="notice">*สามารถเลือก template ที่สร้างไว้ได้เพียงหนึ่ง template</h6>
                                    <br />
                                    
                                   
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
                                    <h6 className="notice">*การใช้ link กรุณาใส่ https:// ด้วย เช่น https://www.google.com</h6>
                                    
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

                                
                                <SendMailDialog onFormSubmit={handleSubmit(formSubmit)} />
                                {/* <button type="submit" className="btn btn-secondary" id="send">SEND</button> */}
                                

                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;


