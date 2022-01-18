import React,{useEffect,useState} from 'react'
import axios from 'axios'
import EditTemplate from './EditTemplate';
import Navbar from './Navbar';
import CreateTemplateDialog from './CreateTemplateDialog';
import PreviewTemplateDialog from './PreviewTemplateDialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



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

        <Box className="container">
            <Box className="row justify-content-center">

            <Navbar Template='active'/>

            <Table className="table table-striped">
                <TableHead>
                    <TableRow>
                    <TableCell  scope="col">#</TableCell >
                    <TableCell  scope="col">Template Name</TableCell >
                    <TableCell  scope="col"></TableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {template.map((temp,i) => (
                        <tr key={temp.template_id}>
                            <TableCell scope="row">{i+1}</TableCell>
                            <TableCell>{temp.template_name}</TableCell>
                            <TableCell><button type="button" className="btn btn-warning" onClick={() => editTemplate(temp.template_id)}>แก้ไข</button>
                            <Button onClick={() => handleDeleteTemplate(temp.template_id)} variant="contained" color="error" id="delete">
                            ลบ
                            </Button>
                            <PreviewTemplateDialog templateId={temp.template_id}/></TableCell>
                        </tr>
                    ))}
                </TableBody>
                <br />
            </Table>
            {/* <a href="/createtemplate"><button type="button" className="btn btn-primary" >Add Template</button></a> */}
            <CreateTemplateDialog />



            </Box>
        </Box>
        )
        
    )
}

export default Template;
