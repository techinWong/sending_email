import React,{useState} from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    name:yup.string().required("กรุณาใส่ชื่อ")
  }).required();

const SaveTemplate = ({setClick}) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [template,setTemplate] = useState({
        name:""
    })

    const formSubmit = e => {
       e.preventDefault()
    }
    console.log(template)


    return (
        <div className="toast toast-demo fade show" role="alert" aria-live="assertive" aria-atomic="true">
            <form onSubmit={handleSubmit(formSubmit)} id="template-form">
                <div className="toast-body">
                    <p style={{color:'red'}}>{errors.name?.message}</p>
                    <label htmlFor="">Enter Template Name</label>
                    <input
                    {...register("name")} 
                    value={template.name}
                    name='name'
                    type="text" 
                    onChange={e => setTemplate({name:e.target.value})}
                    />
                    <div className="mt-2 pt-2 border-top">
                        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        <button onClick={() => setClick(false)} type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SaveTemplate
