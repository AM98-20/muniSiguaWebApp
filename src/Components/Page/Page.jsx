import './Page.css';
import React, {useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Page = ({ header, footer, children }) => {
    const hasHeader = header && true;
    const hasFooter = footer && true;
    const pageClassNames = ['page_container'];
    if (!hasHeader) pageClassNames.push('no_header');
    if (!hasFooter) pageClassNames.push('no_footer');
    const [navbar, setNavbar] = useState(false);

    const changeHeader = () => {
        if(window.scrollY >+ 80){
            setNavbar(true);
        }else{
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeHeader);
    return (
        <section className={pageClassNames.join(' ')}>
            {
                hasHeader &&
                <header className= {navbar ? 'page_header' : 'page_header'}>
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