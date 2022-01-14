import React,{useState,useEffect} from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';



const PreviewTemplate= ({templateId}) => {

    const [editTemplate , setEditTemplate] = useState([])


    const fetchData = async () => {
        await axios.post('api/edittemplate',{
        id:templateId
        })
        .then(res => {
            setEditTemplate(res.data[0])
        })
    }

    const editorConfiguration = {
        removePlugins:["EasyImage","ImageUpload","MediaEmbed"],
        height:'100px'
    }

    useEffect( () => {
         fetchData();
    },[])


    return (

        
        <div className="container">
            <div className="row justify-content-center">

            
            <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Email Form</div>

                        <div className="form-group">
                            <div className="card-body">
                                <form>
                                    <label id='create-template-label'>Preview Template</label>
                                    
                                    <div>
                                        <div id='template-name-form'>
                                            <label htmlFor="formControlInput" className="form-label">Template Name</label>
                                        </div>
                                        </div>
                                        
                                        <input 
                                        disabled
                                        type="text" 
                                        className="form-control" 
                                        id="formControlInput" 
                                        placeholder="Enter Template Name" 
                                        value={editTemplate.template_name}
                                        />
                                        
                                        <br />

                                    <div id='template-form-style'>
                                        <label htmlFor="formControlInput" className="form-label">Template Style</label>

                            
                                    </div>   
                                        <CKEditor 
                                            disabled
                                            editor ={ClassicEditor}
                                            config={editorConfiguration}
                                            value={editTemplate.template_detail}
                                            data={editTemplate.template_detail}
                                            name="detail"
                                        />
                                        <h6 className="notice">*การใช้ link กรุณาใส่ https:// ด้วย เช่น https://www.google.com</h6>

                                     
                                    <br />

                                   
                                    

                                </form>

                            </div>
                                    
                        </div>


                    </div>
            </div>


            </div>
        </div>
    )
}

export default PreviewTemplate
