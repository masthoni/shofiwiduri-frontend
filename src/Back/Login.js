import React from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();

    const history = useHistory()

    function login(data) {
        let token = 'salah'
        if (data.username === 'admin_yukngaji' && data.password === '********') {
            token = 'ahdshfhsjfiajsofjsdhf'
        }

        sessionStorage.setItem('token', token)

        reset()

        if (getToken() === 'ahdshfhsjfiajsofjsdhf') {
            history.push('/admin')
            window.location.reload()
        }
    }

    if (sessionStorage.getItem('token') === 'ahdshfhsjfiajsofjsdhf') {
        history.push('/admin')
        window.location.reload()
    }

    const getToken = () => (sessionStorage.getItem('token'))

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: 'coral' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '25rem' }}>
                            <div className="card-body" style={{ borderRadius: '5rem' }}>
                                <div classname="wrap">
                                <div className="row mt-5">
                                    <div className="mx-auto col-12">
                                        <form onSubmit={handleSubmit(login)}>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <input type="text" className="form-control" name="username" {...register("username", { required: true })} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" name="password" {...register("password", { required: true })} />
                                            </div>
                                            <div className="pt-2 mb-6">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
