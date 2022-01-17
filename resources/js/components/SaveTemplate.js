import React , {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Popup from 'reactjs-popup';
import Navbar from './Navbar';
import Box from '@mui/material/Box';



const schema = yup.object({
    name:yup.string().required("กรุณาป้อนชื่อ Template"),
    detail:yup.string().required("กรุณาป้อนลักษณะ Template"),
  }).required();


const SaveTemplate = ({setOpen}) => {
    
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
        setOpen(false)
    }


    return (
        <Box className="container">
            <Box className="row justify-content-center">

            {/* <Navbar Template='active'/> */}

            <Box className="col-md-8">
                    <Box className="card">
                        <Box className="card-header">Email Form</Box>

                        
                          {waitSave.message.length > 0 &&
                                    <Box className={waitSave.status ? "alert alert-success " : "alert alert-warning"} role="alert">
                                    {waitSave.message}
                                  </Box>
                        }

                        <Box className="form-group">
                            <Box className="card-body">
                                <form onSubmit={handleSubmit(formSubmit)}>
                                    <label id='create-template-label'>Create Template</label>
                                    
                                    <Box>
                                        <Box id='template-name-form'>
                                            <label htmlFor="formControlInput" className="form-label">Template Name</label>
                                            <p style={{color:'red'}}>{errors.name?.message}</p>
                                        </Box>
                                        </Box>
                                        
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

                                    <Box id='template-form-style'>
                                        <label htmlFor="formControlInput" className="form-label">Template Style</label>

                                        <p style={{color:'red'}}>{errors.detail?.message}</p>
                                    </Box>   
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

                                    <button type="button" onClick={handleSubmit(formSubmit)} className="btn btn-primary" id="create">Save Template</button>
                                    

                                </form>

                            </Box>
                                    
                        </Box>




                    </Box>
            </Box>

            </Box>
        </Box>


    )
}

export default SaveTemplate
