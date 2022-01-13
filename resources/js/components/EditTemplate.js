import React,{useState,useEffect} from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Navbar from './Navbar';


const schema = yup.object({
    name:yup.string().required("กรุณาป้อนชื่อ Template"),
    detail:yup.string().required("กรุณาป้อนลักษณะ Template"),
  }).required();

const EditTemplate = ({template,handleEditClick}) => {

    const [editTemplate , setEditTemplate] = useState(...template)

    

    const editorConfiguration = {
        removePlugins:["EasyImage","ImageUpload","MediaEmbed"],
        height:'100px'
    }

    const { register, handleSubmit, setValue,formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    // setValue('data',template.template_detail)

    const formSubmit = () => {
        axios.post('api/saveedittemplate',editTemplate)
        .then(res => console.log(res))
    }

    useEffect(() => {
        setValue('detail',editTemplate.template_detail)
    },[])

    console.log(editTemplate);

    return (

        
        <div className="container">
            <div className="row justify-content-center">

            
            <Navbar Template='active'/>

            <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Email Form</div>

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
                                        value={editTemplate.template_name}
                                        onChange={e => {
                                            setEditTemplate({...editTemplate,template_name:e.target.value})                                            
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

                                    <button type="submit" className="btn btn-primary" id="create">Save Template</button>
                                    <button onClick={() => handleEditClick(false)}type="button" className="btn btn-danger" id="create">Cancel</button>
                                    

                                </form>

                            </div>
                                    
                        </div>


                    </div>
            </div>


            </div>
        </div>
    )
}

export default EditTemplate
