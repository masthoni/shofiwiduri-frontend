import React from 'react';
import { useParams } from 'react-router-dom';
import Beranda from './pages/Beranda';
import Kajian_offline from './pages/Kajian_offline';
import Dzikir from './pages/Dzikir';
import Doa from './pages/Doa';
import Kajian_online from './pages/Kajian_online';
import Kategori from './pages/Kategori';
import Postingan_artikel from './pages/Postingan_artikel';
import Rangkuman_kajian from './pages/Rangkuman_kajian';

const Content = () => {
    const { isi } = useParams();

    let tampil;

    if (isi === 'beranda') {
        tampil = <Beranda />
    }
    if (isi === 'dzikir') {
        tampil = <Dzikir />
    }
    if (isi === 'doa') {
        tampil = <Doa />
    }
    if (isi === 'kajian_offline') {
        tampil = <Kajian_offline />
    }
    if (isi === 'kajian_online') {
        tampil = <Kajian_online />
    }
    if (isi === 'kategori') {
        tampil = <Kategori />
    }
    if (isi === 'postingan_artikel') {
        tampil = <Postingan_artikel />
    }
    if (isi === 'rangkuman_kajian') {
        tampil = <Rangkuman_kajian />
    }
    

    return (
        <>
            {tampil}
        </>
    );
}

export default Content;
