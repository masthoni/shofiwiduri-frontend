import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios'

const Rangkuman_kajian = () => {
    const [oneKajian, setOneKajian] = useState([])
    const [lampiran, setLampiran] = useState('');
    const [kategoriPost, setKategoriPost] = useState('');
    const [kajianPost, setKajianPost] = useState('');
    const [idKategori, setIdKategori] = useState(1);
    const [kajian, setKajian] = useState([]);
    const [idKajian, setIdKajian] = useState();
    const [isi, setIsi] = useState([]);
    const [pesan, setPesan] = useState('');
    const [id, setIdRangkuman_kajian] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        getRangkuman_kajian()
    }, [refresh]);

    useEffect(() => {
        getKajian()
    }, [idKategori, idKajian]);

    async function getRangkuman_kajian() {
        const res = await link.get('rangkuman_kajian')
        setIsi(res.data)
        getOneKajian(res.data)
    }

    async function getKajian() {
        if (idKategori === 1) {
            const res = await link.get('kajian_offline')
            setKajian(res.data)
        } else if (idKategori === 2) {
            const res = await link.get('kajian_online')
            setKajian(res.data)
        }

    }

    function klikKategori(e) {
        setIdKategori(e.value)
    }

    function klikKajian(e) {
        setIdKajian(e.value)
    }

    async function simpan(data) {
        if (data.lampiran[0]) {
            const formData = new FormData()
            formData.append('file', data.lampiran[0])
            const firstRespon = await axios.post("https://sihaq.com/yukngaji/rangkuman/upload.php", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let dataRangkuman = {
                id: id,
                judul: data.judul,
                keterangan: data.keterangan,
                kategori: idKategori,
                id_kajian: idKajian,
                lampiran: firstRespon.data.nama
            }

            if (pilihan) {
                const res = await link.post('/rangkuman_kajian', dataRangkuman)
                setPesan(res.data.message)
            } else {
                const res = await link.put('/rangkuman_kajian', dataRangkuman)
                setPesan(res.data.message)
                setPilihan(true);
            }
        } else {
            let dataRangkuman = {
                id: id,
                judul: data.judul,
                keterangan: data.keterangan,
                kategori: idKategori,
                id_kajian: idKajian,
                lampiran: lampiran
            }

            const res = await link.put('/rangkuman_kajian', dataRangkuman)
            setPesan(res.data.message)
            setPilihan(true);
        }

        reset();
        setRefresh(Math.random)
        setKategoriPost('')
        setKajianPost('')
        setLampiran('')
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/rangkuman_kajian/' + id);
            setPesan(res.data.message);
            setRefresh(Math.random)
        }
    }

    async function showData(data, judul) {
        setValue('judul', data.judul);
        setValue('keterangan', data.keterangan);
        setIdKategori(data.kategori);
        setIdKajian(data.id_kajian);
        setIdRangkuman_kajian(data.id);
        setKategoriPost(data.kategori === 1 ? 'kajian offline' : 'kajian online');
        setKajianPost(judul)
        setLampiran(data.lampiran);
        setPilihan(false);
    }

    async function fetchKajianOffline(id) {
        const res = await link.get(`/kajian_offline/${id}`)
        return res.data
    }

    async function fetchKajianOnline(id) {
        const res = await link.get(`/kajian_online/${id}`)
        return res.data
    }

    async function getOneKajian(isi) {
        const obj = await Promise.all(isi.map(isi => isi.kategori === 1 ? fetchKajianOffline(isi.id_kajian) : fetchKajianOnline(isi.id_kajian)))
        setOneKajian(obj)
        console.log('ambil kajian sesuai Id')
    }

    return (
        <div style={{ backgroundColor: '' }}>
            <div className="row">
                <h2>Rangkuman </h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="row">
            <div className="card  mb-4" style={{ backgroundColor: '' }}>
                <div className="mx-auto col-11">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="judul" className="form-label">Judul</label>
                            <input type="text" className="form-control" id="judul" placeholder="judul" {...register("judul", { required: true })} />
                            {errors.judul && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keterangan" className="form-label">keterangan</label>
                            <input type="text" className="form-control" id="keterangan" placeholder="keterangan" {...register("keterangan", { required: true })} />
                            {errors.keterangan && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            kategori:{kategoriPost}
                            <Select

                                onChange={klikKategori.bind(this)}
                                options={[
                                    { value: 1, label: 'kajian offline' },
                                    { value: 2, label: 'kajian online' }
                                ]}
                            />
                        </div>
                        <div className="mb-3">
                            kajian:{kajianPost}
                            <Select
                                onChange={klikKajian.bind(this)}
                                options={
                                    kajian.map(kajian => ({
                                        value: kajian.id, label: kajian.judul
                                    }))
                                }
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="lampiran" className="form-label">lampiran</label>
                            <input type="file" className="form-control" id="lampiran" placeholder="lampiran" {...register("lampiran")} />
                            {errors.lampiran && <span>This field is required</span>}
                        </div>

                        <div>
                            {
                                lampiran !== '' ? <iframe src={lampiran} alt="" width="100%" height="500px" /> : ''
                            }
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
                                <p><b>Keterangan : </b>{val.keterangan}</p>
                                <p><b>Kategori   : </b>{val.kategori === 1 ? 'kajian offline' : 'kajian online'}</p>
                                <p><b>Id-Kajian  : </b>{oneKajian[index]?.judul}</p>
                                <p><b>Lampiran   : </b>{val.lampiran}</p>
                                <button onClick={() => hapus(val.id)} className="btn btn-danger">Hapus</button>
                                <button onClick={() => showData(val, oneKajian[index]?.judul)} className="btn btn-warning">Ubah/Detail</button>


                            </div>
                        </div>

                    ))
                }

            </div>
        </div>
    );
}

export default Rangkuman_kajian;
