import './Hero.css';

export default function Hero() {
    return (
        <section id="about" className="hero">
            <div className="bg-glow hero__glow-1" />
            <div className="bg-glow hero__glow-2" />

            <div className="container hero__content">
                <p className="hero__greeting animate-in">Hi, my name is</p>
                <h1 className="hero__name animate-in animate-in-delay-1">
                    Carson<span className="hero__name-dot">.</span>
                </h1>
                <h2 className="hero__tagline animate-in animate-in-delay-2">
                    I build things for the web.
                </h2>
                <p className="hero__description animate-in animate-in-delay-3">
                    I'm a developer passionate about crafting clean, performant, and
                    delightful digital experiences. Currently focused on building
                    accessible, human-centered products.
                </p>
                <div className="hero__actions animate-in animate-in-delay-4">
                    <a href="#projects" className="btn btn-primary">
                        View My Work
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                    </a>
                    <a href="#cv" className="btn btn-outline">
                        My CV
                    </a>
                </div>
            </div>
        </section>
    );
}
