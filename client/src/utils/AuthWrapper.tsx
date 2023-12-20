
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../views/Spinner/Spinner';

function AuthWrapper(WrappedComponent: any) {
    const Wrapper = (props: any) => {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);
        const [sessionExpired, setSessionExpired] = useState(false);
        const [accessDenied, setAccessDenied] = useState(false);

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch('http://localhost:5000/api/v1/auth/verify', {
                        method: 'POST',
                        credentials: 'include',
                    });
                    if (res.ok) {
                        setLoggedIn(true);
                        setLoading(false);
                    } else if (res.status === 403) {
                        navigate('/auth/login');
                    } else if (res.status === 401) {
                        setLoading(false);
                        setSessionExpired(true);
                    }else{
                        setLoading(false);
                        setAccessDenied(true);
                    }
                } catch (error) {
                    setAccessDenied(true);
                    setLoading(false);
                }
            };

            verifyToken();
        }, []);

        const extendAccessToken = async () => {
            try {
                const res = await fetch(
                    'http://localhost:5000/api/v1/auth/refresh_token',
                    {
                        method: 'POST',
                        credentials: 'include',
                    },
                );
                if (res.ok) {
                    setLoggedIn(true);
                    console.log("HATA");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    console.log('Error extending access token');
                }
            } catch (error) {
                console.log('Error extending access token', error);
            }
        };

        /*
            
             useEffect(() => {
                 const intervalId = setInterval(() => {
                     extendAccessToken();
                 }, 10 * 60 * 36000); // Call extendAccessToken function every 10 minutes
     
                 return () => clearInterval(intervalId);
             }, []);
            
            */

        const handleLogout = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                });
                if (res.ok) {
                    localStorage.clear();
                    console.log('Çıkış Başarılı');
                    navigate('/signin');
                }
            } catch (err) {
                navigate('/signin');
                console.log(err);
            }
        };

        if (loading) {
            return (
                <Spinner />
            );
        }

        if (accessDenied) {
            return (
                <section className="bg-white">
                    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                            <p className="p-3 text-sm font-medium text-red-500 rounded-full bg-blue-50 dark:bg-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            </p>
                            <h1 className="mt-3 text-2xl font-semibold text-red-600 md:text-3xl">Access Denied</h1>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">You don't have permision to view this page</p>

                            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                                <button onClick={() => navigate(-1)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>
                                    <span>Go back</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        if (sessionExpired) {
            return (
                <div className="mt-3">
                    <h1 className="text-center text-3xl">
                        Üzgünüz, Oturum Süreniz Doldu!
                    </h1>

                    <div className="flex mt-4 justify-center">
                        <button
                            className="mr-3"
                            onClick={handleLogout}
                        >
                            Çıkış Yap
                        </button>
                        <button onClick={extendAccessToken}>
                            Oturum Süresini Uzat
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <WrappedComponent loggedIn={loggedIn} {...props} />
            </div>
        );
    };

    return Wrapper;
}

export default AuthWrapper;