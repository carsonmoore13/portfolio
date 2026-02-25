import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span className="footer__logo">
                    <span className="footer__logo-accent">{'<'}</span>
                    Portfolio
                    <span className="footer__logo-accent">{' />'}</span>
                </span>
                <p className="footer__copy">
                    &copy; {new Date().getFullYear()} Carson. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
