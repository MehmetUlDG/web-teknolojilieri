import Header from "./Header"; // Başlık bileşeni
import { Formik, useFormik } from "formik";
import React, { useState } from "react"; // React ve state hook'u
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const LogInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Geçerli bir eposta giriniz.").
                required("Bu alan zorunludur"),
            password: Yup.string().
                required("Bu alan zorunludur"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            dispatch({ type: "LOGIN_INIT" });
            try {
                const response = await VenueDataService.login(values);
                const token = response.data.token;
                localStorage.setItem("userToken", token);
                if (token) {
                    const payloadPart = token.split(".")[1];
                    const decodedToken = JSON.parse(atob(payloadPart));
                    const user = {
                        name: decodedToken.name,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        isAuthenticated: true
                    }
                    localStorage.setItem("userToken", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch({ type: "LOGIN_SUCCESS", payload: { token, "user": user } });
                    resetForm();
                    if (user?.role == "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                }

            }
            catch (err) {
                dispatch({ type: "LOGIN_FAILURE" })
                console.error(err);
            }
            finally {
                setSubmitting(false);
            }
        }

    });


    return (
        <><Header
            headerText="Mekanbul"
            motto="Civarınızdaki Mekanlarınızı Keşfedin!" />
            <header className='form-header'>Giriş Yap</header>
            {formik.errors.general && <div className="error-message">{formik.errors.general}</div>}
            <form onSubmit={formik.handleSubmit} className='form'>
                <div className='form-group'>
                    <label htmlFor='email' className='form-label'>E-Posta</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`form-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="validation-error">{formik.errors.email}</div>
                    )}
                </div>
                <div className='form-group'>
                    <label htmlFor='password' className='form-label'>Şifre</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`form-input ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
                        autoComplete='current-password'
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="validation-error">{formik.errors.password}</div>
                    )}
                </div>
                <button
                    type='submit'
                    className='submit-button'
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
            </form></>
    )
};
export default LogInPage;