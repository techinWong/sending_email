import React , {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const schema = yup.object({
    name:yup.string().required("กรุณาป้อนชื่อ Template"),
    detail:yup.string().required("กรุณาป้อนลักษณะ Template"),
  }).required();


const SaveTemplate = () => {
    
    const editorConfiguration = {
        removePlugins:["EasyImage","ImageUpload","MediaEmbed"],
        height:'100px'
    }

    const { register, handleSubmit, setValue,formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const [template , setTemplate] = useState({
        name:"",
        detail:""
    })

    const [waitSave , setWaitSave] = useState({
        status:false,
        message:''
    })

    const formSubmit = () => {
        setWaitSave({message:'Template are on pending ! Please wait for a sec'})
        axios.post('api/savetemplate',template)
        .then(  res => {
           console.log(res)
            setWaitSave({status:true , message:'Template have been save !'})
        })

        setTemplate({name:'',detail:''})
    }


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
                            <a className="nav-link" aria-current="page" href="http://127.0.0.1:8000/">Home</a>
                            <a className="nav-link" href="/history">History</a>
                            <a className="nav-link active" href="/createtemplate">Create Template</a>
                         </div>
                        </div>
                     </div>
            </nav>

            <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Email Form</div>

                        
                          {waitSave.message.length > 0 &&
                                    <div className={waitSave.status ? "alert alert-success " : "alert alert-warning"} role="alert">
                                    {waitSave.message}
                                  </div>
                        }

                        <div className="form-group">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(formSubmit)}>
                                    <label id='create-template-label'>Create Template</label>
                                    
                                    <div>
                                        <div id='template-name-form'>
                                            <label htmlFor="formControlInput" className="form-label">Template Name</label>
                                            <p style={{color:'red'}}>{errors.name?.message}</p>
                                        </div>
                                        </div>
                                        
                                        <input 
                                        {...register("name")}
                                        type="text" 
                                        className="form-control" 
                                        id="formControlInput" 
                                        placeholder="Enter Template Name" 
                                        value={template.name}
                                        onChange={e => {
                                            setTemplate({...template,name:e.target.value})                                            
                                            }}
                                        />
                                        
                                        <br />

                                    <div id='template-form-style'>
                                        <label htmlFor="formControlInput" className="form-label">Template Style</label>

                                        <p style={{color:'red'}}>{errors.detail?.message}</p>
                                    </div>   
                                        <CKEditor 
                                            editor ={ClassicEditor}
                                            config={editorConfiguration}
                                            data={template.detail}
                                            name="detail"
                                            onChange={(event,editor) => {
                                                const data = editor.getData();
                                                setTemplate({...template, detail:data})
                                                setValue('detail',data);
                                            }}
                                        />
                                        <h6 className="notice">*การใช้ link กรุณาใส่ https:// ด้วย เช่น https://www.google.com</h6>

                                     
                                    <br />

                                    <button type="submit" className="btn btn-primary" id="create">Save Template</button>

                                </form>

                            </div>
                                    
                        </div>




                    </div>
            </div>

            </div>
        </div>


    )
}

export default SaveTemplate
