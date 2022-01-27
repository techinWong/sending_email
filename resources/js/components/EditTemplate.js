import React,{useState,useEffect} from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';




const schema = yup.object({
    name:yup.string().required("กรุณาป้อนชื่อ Template"),
    detail:yup.string().required("กรุณาป้อนลักษณะ Template"),
  }).required();

const EditTemplate = ({templateId,setOpen,handleFetchData}) => {

    const [editTemplate , setEditTemplate] = useState({
        template_id:templateId,
    })

    const fetchData = async () => {
        
        const editTemplateApi = await axios.post('api/edittemplate',{
            id:templateId
        })
        setEditTemplate(editTemplateApi.data)
        setValue('name',editTemplateApi.data.template_name)
    }

    

    const editorConfiguration = {
        removePlugins:["EasyImage","ImageUpload","MediaEmbed"],
        height:'100px'
    }

    const { register, handleSubmit, setValue,formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    // setValue('data',template.template_detail)

    const formSubmit = async () => {
        await axios.post('api/saveedittemplate',editTemplate)
        .then(res => console.log(res))
        // window.location.reload();
        setOpen(false)
        handleFetchData()
        
    }

    useEffect(() => {
        fetchData();
        // setValue('detail',editTemplate.template_detail)
    },[])

    return (

        
        <Box className="container">
            <Box className="row justify-content-center">

            
            <Navbar Template='active'/>

            <Box className="col-md-8">
                    <Box className="card">
                        <Box className="card-header">Email Form</Box>

                        <Box className="form-group">
                            <Box className="card-body">
                                <form onSubmit={handleSubmit(formSubmit)}>
                                    <label id='create-template-label'>Edit Template</label>
                                    
                                    <Box>
                                        <Box id='template-name-form'>
                                            <label htmlFor="formControlInput" className="form-label">Template Name</label>
                                            <p style={{color:'red'}}>{errors.name?.message}</p>
                                        </Box>
                                        </Box>
                                        
                                        <input 
                                        {...register("name")}
                                        className="form-control" 
                                        id="formControlInput" 
                                        value={editTemplate.template_name}
                                        onChange={e => {
                                            setEditTemplate({...editTemplate,template_name:e.target.value})  
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
                                            value={editTemplate.template_detail}
                                            data={editTemplate.template_detail}
                                            name="detail"
                                            onChange={(event,editor) => {
                                                const data = editor.getData();
                                                setEditTemplate({...editTemplate, template_detail:data})
                                                setValue('detail',data);
                                            }}
                                        />
                                        <h6 className="notice">*การใช้ link กรุณาใส่ https:// ด้วย เช่น https://www.google.com</h6>

                                     
                                    <br />
                                    <Box style={{float:'right'}}>
                                    <Button type="submit"  variant="contained">Save Template</Button>
                                    
                                    </Box>

                                           
                                </form>
                                
                            </Box>
                                    
                        </Box>


                    </Box>
            </Box>


            </Box>
        </Box>
    )
}

export default EditTemplate
