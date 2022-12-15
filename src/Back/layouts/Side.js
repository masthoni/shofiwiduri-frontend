import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Side = () => {
    const { url } = useRouteMatch();

    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-header">
                    Menu Aplikasi
                </div>
                <ul className="list-group list-group-flush">
                    <Link to={`${url}/beranda`}><li className="list-group-item">Beranda</li></Link>
                    <Link to={`${url}/doa`}><li className="list-group-item">Doa</li></Link>
                    <Link to={`${url}/dzikir`}><li className="list-group-item">Dzikir</li></Link>
                    <Link to={`${url}/kajian_offline`}><li className="list-group-item">Kajian_offline</li></Link>
                    <Link to={`${url}/kajian_online`}><li className="list-group-item">Kajian_online</li></Link>
                    <Link to={`${url}/kategori`}><li className="list-group-item">Kategori</li></Link>
                    <Link to={`${url}/postingan_artikel`}><li className="list-group-item">Postingan_artikel</li></Link>
                    <Link to={`${url}/rangkuman_kajian`}><li className="list-group-item">Rangkuman_kajian</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Side;
