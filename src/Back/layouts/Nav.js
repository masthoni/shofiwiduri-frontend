import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Link, useRouteMatch } from 'react-router-dom';

const Nav = () => {
    const history = useHistory()
    const { url } = useRouteMatch();
    const [activeTab, setActiveTab] = useState('active');

    function hapus() {
        sessionStorage.setItem('token', 'salah')
        history.push('/login')
    }

    return (
        <div className="mt-6 mb-6 ">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid" style={{backgroundColor:'moccasin'}} >
                    <Link to="/admin"><div className="navbar-brand">YukNgaji</div></Link>
                    <text className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-brand mb-0 h1" />
                    </text>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav nav-item" id="nav-tab" role="tablist">
                                <Link to={`${url}/beranda`} className="nav-link active" aria-current="page">Beranda</Link>

                            </li>
                            
                            <li className="navbar-nav me-auto dropdown ">
                                <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Doa dan dzikir
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to={`${url}/doa`} className="dropdown-item">Doa</Link></li>
                                    <li>
                                        <Link to={`${url}/dzikir`} className="dropdown-item">Amalan Rutin Dzikir</Link></li>
                                </ul>
                            </li>
                            <li className="navbar-nav me-auto dropdown ">
                                <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Kajian
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to={`${url}/kajian_offline`} className="dropdown-item">Kajian Offline</Link></li>
                                    <li>
                                        <Link to={`${url}/kajian_online`} className="dropdown-item">Kajian Online</Link></li>
                                </ul>
                            </li>
                            <li className="navbar-nav me-auto" id="nav-tab" role="tablist">
                                <Link to={`${url}/kategori`} className="nav-link active">Kategori</Link>
                            </li>
                            <li className="navbar-nav me-auto" id="nav-tab" role="tablist">
                                <Link to={`${url}/postingan_artikel`} className="nav-link active">Postingan Artikel</Link>
                            </li>
                            <li className="navbar-nav me-auto" id="nav-tab" role="tablist">
                                <Link to={`${url}/rangkuman_kajian`} className="nav-link active">Rangkuman Kajian</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button onClick={hapus} className="btn btn-outline-danger" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>


    );
}

export default Nav;
