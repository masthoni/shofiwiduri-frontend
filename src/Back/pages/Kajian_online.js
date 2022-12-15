import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';

const Kajian_online = () => {
    const [isi, setIsi] = useState([]);
    const [pesan, setPesan] = useState('');
    const [id, setIdKajian_online] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  
    useEffect(() => {
        getKajian_online()
    }, [refresh]);

    async function getKajian_online() {
        const res = await link.get('kajian_online')
        setIsi(res.data)
    }

    async function simpan(data) {
        if (pilihan) {
            const res = await link.post('/kajian_online', data);
            setPesan(res.data.message);
        } else {
            let ubah = {
                id: id,
                judul: data.judul,
                pemateri: data.pemateri,
                link: data.link,
                waktu: data.waktu

            }
            const res = await link.put('/kajian_online', ubah);
            setPesan(res.data.message);
            setPilihan(true);
        }

        reset();
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/kajian_online/' + id);
            setPesan(res.data.message);
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('judul', data.judul);
        setValue('pemateri', data.pemateri);
        setValue('link', data.link);
        setValue('waktu', data.waktu);
        setIdKajian_online(data.id);
        setPilihan(false);
    }

    let no = 1;

    return (
        <div style={{ backgroundColor: '' }}>
            <div className="row">
                <h2>Data Kajian Online</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="card  mb-4" style={{ backgroundColor: '' }}>
            <div className="row">
                <div className="mx-auto col-11">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="judul" className="form-label">Judul</label>
                            <input type="text" className="form-control" id="judul" placeholder="judul" {...register("judul", { required: true })} />
                            {errors.judul && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pemateri" className="form-label">Pemateri</label>
                            <input type="text" className="form-control" id="pemateri" placeholder="pemateri" {...register("pemateri", { required: true })} />
                            {errors.pemateri && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">Link</label>
                            <input type="text" className="form-control" id="link" placeholder="link" {...register("link", { required: true })} />
                            {errors.link && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="waktu" className="form-label">Waktu</label>
                            <input type="datetime-local" className="form-control" id="waktu" placeholder="waktu" {...register("waktu", { required: true })} />
                            {errors.cara && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-success" />
                        </div>
                    </form>
                </div>
                </div>
            </div>

            <div className="col-10 mx-auto">
                {
                    isi.map((val, index) => (
                        <div key={index} className="card border-warning mb-4">
                            <div className="card-header"><b>{val.judul}</b></div>
                            <div className="card-body">
                                <p><b>Pemateri : </b>{val.pemateri}</p>
                                <p><b>Link     : </b>{val.link}</p>
                                <p><b>Waktu    : </b>{val.waktu.replace(  ' T ' , ' ')}</p>
                                <button onClick={() => hapus(val.id)} className="btn btn-danger">Hapus</button>
                                <button onClick={() => showData(val)} className="btn btn-warning">Ubah</button>


                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
}

export default Kajian_online;
