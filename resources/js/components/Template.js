import React,{useEffect,useState} from 'react'
import axios from 'axios'
import EditTemplate from './EditTemplate';
import Navbar from './Navbar';
import CreateTemplateDialog from './CreateTemplateDialog';
import PreviewTemplateDialog from './PreviewTemplateDialog';
import Button from '@mui/material/Button';


const Template = () => {

    const [template , setTemplate] = useState([]);

    const [templateData , setTemplateData] = useState([]);

    const [editClick , setEditClick] = useState(false);

    const editTemplate = async id => {
        console.log(id)
        
        await axios.post('api/edittemplate',{
            id:id
        })
        .then(res => {
            console.log(res.data)
            setTemplateData(res.data)
            setEditClick(true)
        })
    }

    const handleDeleteTemplate = async id => {
        await axios.post('api/deletetemplate',{
            id:id
        })
        .then(res => {
            setTemplate(res.data)
        })
    }

    const fetchData = async() => {
        const templateApi = await fetch('api/template')
        const templateApiResult = await templateApi.json();
        setTemplate(templateApiResult);
    }

    useEffect(() => {
        fetchData();
    },[]) //เช็คตรงนี้


    return (

        (editClick ? <EditTemplate template={templateData} handleEditClick={setEditClick}/> : 

        <div className="container">
            <div className="row justify-content-center">

            <Navbar Template='active'/>

            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Template Name</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {template.map((temp,i) => (
                        <tr key={temp.template_id}>
                            <th scope="row">{i+1}</th>
                            <td>{temp.template_name}</td>
                            <td><button type="button" className="btn btn-warning" onClick={() => editTemplate(temp.template_id)}>แก้ไข</button>
                            <Button onClick={() => handleDeleteTemplate(temp.template_id)} variant="contained" color="error" id="delete">
                            ลบ
                            </Button>
                            <PreviewTemplateDialog templateId={temp.template_id}/></td>
                        </tr>
                    ))}
                </tbody>
                <br />
            </table>
            {/* <a href="/createtemplate"><button type="button" className="btn btn-primary" >Add Template</button></a> */}
            <CreateTemplateDialog />



            </div>
        </div>
        )
        
    )
}

export default Template;
