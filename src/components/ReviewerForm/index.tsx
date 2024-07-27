"use client";
import { ReviewerForm, addReviewerRequest , successResponse} from '@/types';
import { addReviewer } from '@/lib/reviewers';
import React from 'react'
import { useState } from 'react';
import {  object, string, ref } from 'yup';


const AddReviewerForm = () => {

    const [formData, setData] = useState<ReviewerForm>({
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        firstname: '',
        lastname: '',
        expert_at: ''
    });

    const [errors, setErrors] = useState<ReviewerForm>(() => ({
        email: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        firstname: '',
        lastname: '',
        expert_at: ''
    }));

    const [registerError, setRegisterError] = useState<string>(''); // [loginError, setLoginError

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const formValidation: any = object({
        email: string().email("Should be an email").required(),
        password: string().required("Password is required")
            .matches(passwordRegex, "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character")
            .min(8, "Password should be at least 8 characters"),
        confirmPassword: string().required('Confirm password is required')
            .oneOf([ref('password')], 'Passwords must match'),
        firstname: string().required()
            .matches(/^[A-Za-z\s]+$/, "First name should contain only alphabets")
            .min(5, "First name should be at least 5 characters")
            .max(20, "First name should be at most 20 characters"),
        lastname: string().required()
            .matches(/^[A-Za-z\s]+$/, "Last name should contain only alphabets")
            .min(5, "Last name should be at least 5 characters")
            .max(20, "Last name should be at most 20 characters"),
        expert_at: string().required()
            .matches(/^[A-Za-z\s]+$/, "Expertise should contain only alphabets")
            .min(5, "Expertise should be at least 5 characters")
            .max(20, "Expertise should be at most 20 characters"),
    });

   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit triggered");
        event.preventDefault();
        try {
            await formValidation.validate(formData, { abortEarly: false });
            setErrors({
                email: '',
                password: '',
                showPassword: false,
                confirmPassword: '',
                firstname: '',
                lastname: '',
                expert_at: ''
            });
            console.log("Validation Success");
        }
        catch (error: any) {
            const newErrors: ReviewerForm = {
                email: '',
                password: '',
                showPassword: false,
                confirmPassword: '',
                firstname: '',
                lastname: '',
                expert_at: ''
            };

            (error as any).inner.forEach((err: any) => {
                if (err.path === 'email') newErrors.email = err.message;
                else if (err.path === 'password') newErrors.password = err.message;
                else if (err.path === 'confirmPassword') newErrors.confirmPassword = err.message;
                else if (err.path === 'firstname') newErrors.firstname = err.message;
                else if (err.path === 'lastname') newErrors.lastname = err.message;
                else if (err.path === 'expert_at') newErrors.expert_at = err.message;
            });
            setErrors(newErrors);
            return;
        }

        const reviewerRequest : addReviewerRequest = {
            email: formData.email,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
            expert_at: [formData.expert_at]
        }
        // api call
       try {
            const responseData : successResponse = await addReviewer(reviewerRequest);
            const { message } = responseData;
            setErrors({
                email: '',
                password: '',
                showPassword: false,
                confirmPassword: '',
                firstname: '',
                lastname: '',
                expert_at: ''
            });
            alert(message);
        } 
        catch (error : any) {
            console.log(error.message);
       }
    }

    return (
        <div className='flex flex-row justify-center items-start h-auto'>
            <div className="side-heading flex flex-col justify-start items-center
            h-screen w-1/5
        
             ">
                <h1 className="text-4xl font-bold text-gray-900 my-10">Add Reviewer</h1>
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 
            lg:px-8">
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">

                    
                        <form className="space-y-6"
                            onSubmit={handleSubmit} >
                            <div className=''>
                                <div className="left-col">
                                    <div className=''>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='Email'
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block p-5 text-2xl w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => { setData(prev => ({ ...prev, email: e.target.value })) }}
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-md">*{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='First Name'
                                                id="firstname"
                                                name="firstname"
                                                type="text"
                                                autoComplete="firstname"
                                                className="block p-5 text-2xl w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => { setData(prev => ({ ...prev, firstname: e.target.value })) }}
                                            />
                                        </div>
                                        {errors.firstname && <p className="text-red-500 text-md">*{errors.firstname}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                            Last Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='Last Name'
                                                id="lastname"
                                                name="lastname"
                                                type="text"
                                                autoComplete="lastname"
                                                className="block p-5 text-2xl w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => { setData(prev => ({ ...prev, lastname: e.target.value })) }}
                                            />
                                        </div>
                                        {errors.lastname && <p className="text-red-500 text-md">*{errors.lastname}</p>}
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                placeholder='Password'
                                                id="password"
                                                name="password"
                                                type={formData.showPassword ? "text" : "password"}
                                                autoComplete="current-password"
                                                className="block text-md p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => { setData(prev => ({ ...prev, password: e.target.value })) }}
                                            />
                                        </div>
                                        {errors.password && <p className="text-red-500 text-md">*{errors.password}</p>}
                                        <div className='mt-3'>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Confirm Password
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    placeholder='Password'
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={formData.showPassword ? "text" : "password"}
                                                    autoComplete="current-password"
                                                    className="block text-md p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={(e) => { setData(prev => ({ ...prev, confirmPassword: e.target.value })) }}
                                                />
                                            </div>
                                            {errors.confirmPassword && <p className="text-red-500 text-md">*{errors.confirmPassword}</p>}
                                        </div>

                                        <div className="flex items-center mt-2">
                                            <input
                                                id="showPassword"
                                                name="showPassword"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                checked={formData.showPassword}
                                                onChange={(e) => { setData(prev => ({ ...prev, showPassword: e.target.checked })) }}
                                            />
                                            <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900">
                                                Show Password
                                            </label>
                                        </div>


                                    </div>

                                </div>
                                <div className="right-col
                    ">
                                    <div>
                                        <label htmlFor="expert_at" className="block text-sm font-medium leading-6 text-gray-900">
                                            Expert At
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='First Name'
                                                id="expert_at"
                                                name="expert_at"
                                                type="text"
                                                autoComplete="firstname"
                                                className="block p-5 text-2xl w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => { setData(prev => ({ ...prev, expert_at: e.target.value })) }}
                                            />
                                        </div>
                                        {errors.expert_at && <p className="text-red-500 text-md">*{errors.expert_at}</p>}
                                    </div>
                                </div>
                            </div>


                            {/* {loginError && <p className="text-red-500 text-md">*{loginError}</p>} */}
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </form>
                        

                    
                </div>
            </div>
        </div>
    );

}

export default AddReviewerForm
