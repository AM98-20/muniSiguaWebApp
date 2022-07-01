import './AdminPage.css';
import React from 'react';

const AdminPage = ({ header, children }) => {
    const hasHeader = header && true;
    const pageClassNames = ['page_container_admin'];

    if (!hasHeader) pageClassNames.push('no_header_admin');

    return (
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
    );
}

export default AdminPage;