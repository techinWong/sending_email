import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'



const Navbar = ({Home,History,Template}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Box className="container-fluid">
                <a className="navbar-brand" href="/">Email Form</a>
                <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </Button>
                <Box className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                    <Box className="navbar-nav">
                        <a className={`nav-link ${Home}`} aria-current="page" href="/">Home</a>
                        <a className={`nav-link ${History}`} href="/history">History</a>
                        <a className={`nav-link ${Template}`} href="/template">Template</a>
                    </Box>
                </Box>
             </Box>
        </nav>
    )
}

export default Navbar
