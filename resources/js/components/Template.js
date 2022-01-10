import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Template = () => {

    const [template , setTemplate] = useState([]);

    const fetchData = async() => {
        const templateApi = await fetch('api/template')
        const templateApiResult = await templateApi.json();
        setTemplate(templateApiResult);
    }

    useEffect(() => {
        fetchData();
    },[])


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
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {template.map((temp,i) => (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{temp.template_name}</td>
                            <td><button type="button" className="btn btn-warning">Warning</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>


            </div>
        </div>
    )
}

export default Template;
