import './Page.css';
import React from 'react';


const Page = ({ header, footer, children }) => {
    const hasHeader = header && true;
    const hasFooter = footer && true;
    const pageClassNames = ['page_container'];
    if (!hasHeader) pageClassNames.push('no_header');
    if (!hasFooter) pageClassNames.push('no_footer');
    
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
            {
                hasFooter &&
                <footer className='page_footer'>
                    {footer}
                </footer>
            }
        </section>
    );
}

export default Page;