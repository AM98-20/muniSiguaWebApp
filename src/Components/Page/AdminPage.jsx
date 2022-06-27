import './AdminPage.css';
import React from 'react';

const AdminPage = ({ header, children }) => {
    const hasHeader = header && true;
    const pageClassNames = ['page_container'];

    if (!hasHeader) pageClassNames.push('no_header');

    return (
        <section className={pageClassNames.join(' ')}>
            {
                hasHeader &&
                <header className='page_header'>
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