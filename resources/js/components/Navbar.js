import React from 'react'

const Navbar = ({Home,History,Template}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Email Form</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className={`nav-link ${Home}`} aria-current="page" href="/">Home</a>
                        <a className={`nav-link ${History}`} href="/history">History</a>
                        <a className={`nav-link ${Template}`} href="/template">Template</a>
                    </div>
                </div>
             </div>
        </nav>
    )
}

export default Navbar
