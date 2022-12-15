import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import axios from 'axios'


const Postingan_artikel = () => {
    const [gambar, setGambar] = useState('');
    const [kategoriPost, setKategoriPost] = useState('');
    const [kategori, setKategori] = useState([]);
    const [idKategori, setIdKategori] = useState();
    const [isi, setIsi] = useState([]);
    const [dataIsi, setDataIsi] = useState('');
    const [pesan, setPesan] = useState('');
    const [id, setIdPostingan_artikel] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

   
    useEffect(() => {
        getPostingan_artikel()
    }, [refresh]);

    useEffect(() => {
        getKategori()
    }, []);

   
    async function getPostingan_artikel() {
        const res = await link.get('postingan_artikel')
        setIsi(res.data)
    }

    async function getKategori() {
        const res = await link.get('kategori')
        setKategori(res.data)
    }

    function klikKategori(e) {
        setIdKategori(e.value)
    }

    async function simpan(data) {
        if (data.gambar[0]) {
            const formData = new FormData()
            formData.append('gambar', data.gambar[0])
            const firstRespon = await axios.post("https://sihaq.com/yukngaji/gambar/upload.php", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let dataPostingan = {
                id: id,
                judul: data.judul,
                isi: dataIsi,
                kategori: idKategori,
                gambar: firstRespon.data.nama
            }

            if (pilihan) {
                const res = await link.post('/postingan_artikel', dataPostingan)
                setPesan(res.data.message)
            } else {
                const res = await link.put('/postingan_artikel', dataPostingan)
                setPesan(res.data.message)
                setPilihan(true);
            }
        } else {
            let dataPostingan = {
                id: id,
                judul: data.judul,
                isi: dataIsi,
                kategori: idKategori,
                gambar: gambar
            }

            const res = await link.put('/postingan_artikel', dataPostingan)
            setPesan(res.data.message)
            setPilihan(true);
        }

        reset();
        setRefresh(Math.random)
        setDataIsi('')
        setKategoriPost('')
        setGambar('')
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/postingan_artikel/' + id);
            setPesan(res.data.message);
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('judul', data.judul);
        setDataIsi(data.isi);
        setIdKategori(data.kategori);
        setKategoriPost(data.nama_kategori);
        setGambar(data.gambar)
        setIdPostingan_artikel(data.id);
        setPilihan(false);
        console.log(data.kategori)
    }

    let no = 1;

    return (
        <div style={{ backgroundColor: '' }}>
            <div className="row">
                <h2>Postingan Artikel</h2>
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
                        <label htmlFor="judul" className="form-label">Isi Artikel</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={dataIsi}
                            onChange={(event, editor) => {
                                setDataIsi(editor.getData())
                            }}
                        />
                        <div className="mb-3">
                            kategori:{kategoriPost}
                            <Select
                                onChange={klikKategori.bind(this)}
                                options={
                                    kategori.map(kategori => ({
                                        value: kategori.id, label: kategori.kategori
                                    }))
                                }
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">Gambar</label>
                            <input type="file" className="form-control" id="gambar" placeholder="gambar" {...register("gambar")} />
                            {errors.gambar && <span>This field is required</span>}
                        </div>

                        <div>
                            {
                                gambar !== '' ? <img src={gambar} alt="" width="500" height="400" /> : ''
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
                                <p><b>Kategori: </b>{val.nama_kategori}</p>
                                <p><b>Gambar  : </b>{val.gambar}</p>
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

export default Postingan_artikel;
