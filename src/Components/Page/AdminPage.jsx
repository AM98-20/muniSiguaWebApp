import './AdminPage.css';
import React from 'react';
import { useContext } from 'react';

import AuthContext from '../../Context/AuthProvider';
import ErrorPage from '../../Views/Error/ErrorPage';

const AdminPage = ({ header, children }) => {
    const { auth } = useContext(AuthContext);
    const hasHeader = header && true;
    const pageClassNames = ['page_container_admin'];

    if (!hasHeader) pageClassNames.push('no_header_admin');

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
                    </section>) : <ErrorPage></ErrorPage>
            }
        </>
    );
}

export default AdminPage;