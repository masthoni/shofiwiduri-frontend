import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const Dzikir = () => {
    const [isi, setIsi] = useState([]);
    const [dataManfaat, setDataManfaat] = useState('');
    const [pesan, setPesan] = useState('');
    const [id, setIdDzikir] = useState('');
    const [pilihan, setPilihan] = useState(true);

    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

   

    useEffect(() => {
        getDzikir()
    }, [refresh]);


    async function getDzikir() {
        const res = await link.get('dzikir/' )
        setIsi(res.data)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                latin: data.latin,
                arti: data.arti,
                cara: data.cara,
                manfaat: dataManfaat

            }

            const res = await link.post('/dzikir', tambah);
            setPesan(res.data.message);
        } else {
            let ubah = {
                id: id,
                latin: data.latin,
                arti: data.arti,
                cara: data.cara,
                manfaat: dataManfaat

            }
            const res = await link.put('/dzikir', ubah);
            setPesan(res.data.message);
            setPilihan(true);
        }

        reset();
        setRefresh(Math.random)
        setDataManfaat('')
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/dzikir/' + id);
            setPesan(res.data.message);
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('latin', data.latin);
        setValue('arti', data.arti);
        setValue('cara', data.cara);
        setDataManfaat(data.manfaat);
        setIdDzikir(data.id);
        setPilihan(false);
    }

    let no = 1;
    // batasan untuk edit
    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <div className="row">
                <h2>Data dzikir pengamalan rutin</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="card  mb-3" style={{ backgroundColor: '' }}>
            <div className="row">
                <div className="mx-auto col-11">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="latin" className="form-label">Latin</label>
                            <input type="text" className="form-control" id="latin" placeholder="latin" {...register("latin", { required: true })} />
                            {errors.latin && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="arti" className="form-label">Arti</label>
                            <input type="text" className="form-control" id="arti" placeholder="arti" {...register("arti", { required: true })} />
                            {errors.arti && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cara" className="form-label">Cara</label>
                            <input type="text" className="form-control" id="cara" placeholder="cara" {...register("cara", { required: true })} />
                            {errors.cara && <span>This field is required</span>}
                        </div>
                        <label htmlFor="cara" className="form-label">Manfaat</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={dataManfaat}
                            onChange={(event, editor) => {
                                setDataManfaat(editor.getData())
                            }}
                        />
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
                            <div className="card-header">{val.latin}</div>
                            <div className="card-body">
                                <p><b>Arti : </b>{val.arti}</p>
                                <p><b>Cara : </b>{val.cara}</p>
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

export default Dzikir;
