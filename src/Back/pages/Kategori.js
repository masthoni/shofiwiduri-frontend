import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';

const Kategori = () => {
    const [isi, setIsi] = useState([]);
    const [pesan, setPesan] = useState('');
    const [id, setIdKategori] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        getKategori()
    }, [refresh]);

    async function getKategori(){
        const res = await link.get('kategori')
        setIsi(res.data)
    }


    async function simpan(data) {
        if (pilihan) {
            const res = await link.post('/kategori', data);
            setPesan(res.data.message);
        } else {
            let ubah={
                id:id, kategori:data.kategori
            }
            const res = await link.put('/kategori', ubah);
            setPesan(res.data.message);
            setPilihan(true);
        }

        reset();
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/kategori/' + id);
            setPesan(res.data.message);
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('kategori', data.kategori);
        setIdKategori(data.id);
        setPilihan(false);
    }

    let no = 1;

    return (
        <div style={{backgroundColor:''}}>
            <div className="row">
                <h2>Data Kategori</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="row">
                <div className="mx-auto col-11">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="kategori" className="form-label">kategori</label>
                            <input type="text" className="form-control" id="kategori" placeholder="kategori" {...register("kategori", { required: true })} />
                            {errors.kategori && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-success" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kategori</th>
                            <th>Hapus</th>
                            <th>Ubah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.kategori}</td>
                                    <td>
                                        <button onClick={() => hapus(val.id)} className="btn btn-danger">Hapus</button>
                                    </td>
                                    <td>
                                        <button onClick={() => showData(val)} className="btn btn-warning">Ubah</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                    
                </table>
            </div>
        </div>
    );
}

export default Kategori;
