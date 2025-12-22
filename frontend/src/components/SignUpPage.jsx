import Header from "./Header"; // Başlık bileşeni
import { Formik, useFormik } from "formik";
import React, { useState } from "react"; // React ve state hook'u
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name:Yup.string().
            required("Bu alan zorunludur"),
            email:Yup.string().email("Geçerli bir eposta giriniz.").
            required("Bu alan zorunludur"),
            password:Yup.string().
            required("Bu alan zorunludur"),
        }),
        onSubmit: async (values,{ setSubmitting, resetForm }) => {
            try{
                const response=await VenueDataService.signUp(values);
                const token=response.data.token;
                localStorage.setItem("userToken",token);
                dispatch({type:"SIGNUP_SUCCESS",payload:{token,"user":response.data.user}});
                resetForm();
                navigate("/login");
            }
            catch(err){
               console.error(err);
            }
            finally{
                setSubmitting(false);
            }
        }

    });


    return (
        <><Header
            headerText="Mekanbul"
            motto="Civarınızdaki Mekanlarınızı Keşfedin!" />
            <header className="form-header">Kayıt Ol</header>
            <form onSubmit={formik.handleSubmit} className="form">
                {formik.errors.general && (
                    <div style={{
                        color: 'red',
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid red',
                        borderRadius: '4px'
                    }}>
                        {formik.errors.general}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">İsim</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">E-posta</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Şifre</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="form-input" />
                </div>
                <button type='submit' className='submit-button' disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                </button>
            </form></>
    )
};
export default SignUpPage;