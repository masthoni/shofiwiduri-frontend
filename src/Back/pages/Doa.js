import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const Doa = () => {
    const [isi, setIsi] = useState([]);
    const [dataLatin, setDataLatin] = useState('');
    const [dataArti, setDataArti] = useState('');
    const [pesan, setPesan] = useState('');
    const [id, setIdDoa] = useState('');
    const [pilihan, setPilihan] = useState(true);

    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    
    useEffect(() => {
        getDoa()
    }, [refresh]);


    async function getDoa() {
        const res = await link.get('doa/')
        setIsi(res.data)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                judul: data.judul,
                latin: dataLatin,
                arti: dataArti

            }

            const res = await link.post('/doa', tambah);
            setPesan(res.data.message);
        } else {
            let ubah = {
                id: id,
                judul: data.judul,
                latin: dataLatin,
                arti: dataArti
            }
            const res = await link.put('/doa', ubah);
            setPesan(res.data.message);
            setPilihan(true);
        }

        reset();
        setRefresh(Math.random)
        setDataLatin('')
        setDataArti('')
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/doa/' + id);
            setPesan(res.data.message);
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('judul', data.judul);
        setDataLatin(data.latin);
        setDataArti(data.arti);
        setIdDoa(data.id);
        setPilihan(false);
    }

    let no = 1;
    // batasan untuk edit
    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <div className="row">
                <h2>Data Doa Dalam keseharian</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="card border-warning  mb-3" style={{ backgroundColor: '' }}>
            <div className="row">
                <div className="mx-auto col-11">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="judul" className="form-label">judul</label>
                            <input type="text" className="form-control" id="judul" placeholder="judul" {...register("judul", { required: true })} />
                            {errors.judul && <span>This field is required</span>}
                        </div>
                        
                            <label htmlFor="latin" className="form-label">Latin</label>
                            <CKEditor
                            editor={ClassicEditor}
                            data={dataLatin}
                            onChange={(event, editor) => {
                                setDataLatin(editor.getData())
                            }}
                            />
                        <div className="mb-3">
                            <label htmlFor="arti" className="form-label">Arti</label>
                            <CKEditor
                            editor={ClassicEditor}
                            data={dataArti}
                            onChange={(event, editor) => {
                                setDataArti(editor.getData())
                            }}
                            />
                        </div>
                        
                        <div className="mb-4">
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
                            <div className="card-header">{val.judul}</div>
                            <div className="card-body">
                                <b>Latin :</b>{val.latin}
                                <p><b>Arti  : </b>{val.arti}</p>
                                <button onClick={() => hapus(val.id)} className="btn btn-danger">Hapus</button>
                                <button onClick={() => showData(val)} className="btn btn-warning">Ubah/Detail</button>
                            </div>
                        </div>

                    ))
                }

            </div>
        </div>
    );
}

export default Doa;
