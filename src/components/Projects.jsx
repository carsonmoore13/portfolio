import './Projects.css';

const projects = [
    {
        title: 'E-Commerce Platform',
        description:
            'A full-stack online store with cart management, Stripe payments, and a real-time admin dashboard.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        link: '#',
    },
    {
        title: 'Task Management App',
        description:
            'A drag-and-drop kanban board with team collaboration features, real-time sync, and dark mode.',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'WebSockets'],
        link: '#',
    },
    {
        title: 'Weather Dashboard',
        description:
            'Beautifully visualized weather data with animated charts, 7-day forecasts, and location search.',
        tags: ['React', 'D3.js', 'OpenWeather API'],
        link: '#',
    },
    {
        title: 'AI Chat Assistant',
        description:
            'A conversational AI interface with streaming responses, markdown rendering, and conversation history.',
        tags: ['React', 'Python', 'FastAPI', 'OpenAI'],
        link: '#',
    },
];

export default function Projects() {
    return (
        <section id="projects" className="projects">
            <div className="container">
                <span className="section-label">Portfolio</span>
                <h2 className="section-title">Featured Projects</h2>

                <div className="projects__grid">
                    {projects.map((project, i) => (
                        <article key={project.title} className="card projects__card">
                            <div className="projects__card-number">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__card-desc">{project.description}</p>
                            <div className="projects__card-tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <a href={project.link} className="projects__card-link">
                                View Project
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                                </svg>
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
