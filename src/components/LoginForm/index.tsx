"use client";
import React from 'react'
import { useState } from 'react';
import { object, string } from 'yup';
import Link from 'next/link';
import { failureResponse, loginForm, loginResponse } from '@/types';
import { getToken } from '@/lib/authentication';
import { useRouter } from 'next/navigation';


interface LoginFormProps {
}


const LoginForm: React.FC<LoginFormProps> = () => {

    const [formData, setData] = useState<loginForm>({
        email: '',
        password: '',
        showPassword: false
    });
    const router = useRouter();

    const [errors, setErrors] = useState<loginForm>(() => ({
        email: '',
        password: '',
        showPassword: false
    }));

    const [loginError, setLoginError] = useState<string>(''); // [loginError, setLoginError

    const formValidation = object({
        email: string().email("Should be an email").required(),
        password: string().required()
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("sumit triggered");

        console.log(formData);
        try {
            await formValidation.validate(formData, { abortEarly: false });
            console.log("Validation Success");
        }
        catch (error: any) {
            const newErrors: loginForm = {
                email: '',
                password: '',
                showPassword: false
            };

            (error as any).inner.forEach((err: any) => {
                if (err.path === 'email') newErrors.email = err.message;
                else newErrors.password = err.message;
            });
            setErrors(newErrors);
            return;
        }
        
        try {
            const response: any = await getToken({ email: formData.email, password: formData.password });
            console.log(response);
            const { token, message } = response;
            console.log(token);

            if(token === null || token === undefined){
                setLoginError("Invalid Credentials");
                return;
            }
            localStorage.setItem('token', token);
            router.push('/home');
            return;
        } catch (error : any) {
            setLoginError("Invalid Credentials");
            console.log(error.message);
        }
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        PC Member Login
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link href={"/forgot-password"}>
                                        <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </span></Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={formData.showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className="block text-md p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => { setData(prev => ({ ...prev, password: e.target.value })) }}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-md">*{errors.password}</p>}

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
                        {loginError && <p className="text-red-500 text-md">*{loginError}</p>}
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </form>

                </div>
            </div>
        </>
    );

}

export default LoginForm
