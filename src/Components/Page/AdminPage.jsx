import './AdminPage.css';
import React from 'react';
import { useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from '../../Context/AuthProvider';
import ErrorPage from '../../Views/Error/ErrorPage';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({ header, children }) => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const hasHeader = header && true;
    const pageClassNames = ['page_container_admin'];

    if (!hasHeader) pageClassNames.push('no_header_admin');

    useEffect(() => {
        const tokenDecode = async () => {
            if (auth.accessToken) {
                let token = auth.accessToken;
                const { exp } = jwtDecode(token)
                // Refresh the token a minute early to avoid latency issues
                const expirationTime = (exp * 1000) - 60000
                if (Date.now() >= expirationTime) {
                    setAuth({});
                    localStorage.clear();
                    alert('La sesion ya caduco. Se cerrara la sesión actual.')
                    navigate('/');
                    // set LocalStorage here based on response;
                }
            }
        }
        tokenDecode();
        return () => {
        }
    }, [setAuth, navigate, auth])

    return (
        <>
            {
                auth.user ? (
                    <section className={pageClassNames.join(' ')}>
                        {
                            hasHeader &&
                            <header className='page_header_admin'>
                                {header}
                            </header>
                        }
                        <main>
                            {children}
                        </main>
                    </section>
                ) : <ErrorPage></ErrorPage>
            }
        </>
    );
}

export default AdminPage;