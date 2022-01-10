import React,{useEffect,useState} from 'react'
import axios from 'axios'
import EditTemplate from './EditTemplate';

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

    const fetchData = async() => {
        const templateApi = await fetch('api/template')
        const templateApiResult = await templateApi.json();
        setTemplate(templateApiResult);
    }

    useEffect(() => {
        fetchData();
    },[])


    return (

        (editClick ? <EditTemplate template={templateData} handleEditClick={setEditClick}/> : 

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
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/history">History</a>
                            <a className="nav-link" href="/createtemplate">Create Template</a>
                            <a className="nav-link active" href="/template">Template</a>
                         </div>
                        </div>
                     </div>
            </nav>

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
                        <tr key={temp.id}>
                            <th scope="row">{i+1}</th>
                            <td>{temp.template_name}</td>
                            <td><button type="button" className="btn btn-warning" onClick={() => editTemplate(temp.id)}>แก้ไข</button></td>
                        </tr>
                    ))}
                </tbody>
                <br />
            </table>
            <a href="/createtemplate"><button type="button" className="btn btn-primary" >Add Template</button></a>



            </div>
        </div>
        )
        
    )
}

export default Template;
