import './CV.css';

const experience = [
    {
        role: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        period: '2023 – Present',
        description:
            'Lead the frontend team in building a SaaS analytics platform. Architected component libraries and improved performance by 40%.',
    },
    {
        role: 'Full Stack Developer',
        company: 'StartupXYZ',
        period: '2021 – 2023',
        description:
            'Built and maintained multiple client-facing applications. Introduced CI/CD pipelines and automated testing.',
    },
    {
        role: 'Junior Developer',
        company: 'Digital Agency Co.',
        period: '2019 – 2021',
        description:
            'Developed responsive websites and web applications for a diverse range of clients across retail and healthcare.',
    },
];

const education = [
    {
        degree: 'B.S. Computer Science',
        school: 'State University',
        period: '2015 – 2019',
    },
];

const skills = [
    { name: 'JavaScript / TypeScript', level: 95 },
    { name: 'React & Next.js', level: 92 },
    { name: 'Node.js & Express', level: 85 },
    { name: 'Python', level: 78 },
    { name: 'SQL & Databases', level: 80 },
    { name: 'Git & DevOps', level: 82 },
];

export default function CV() {
    return (
        <section id="cv" className="cv">
            <div className="bg-glow cv__glow" />
            <div className="container">
                <span className="section-label">Resume</span>
                <h2 className="section-title">Curriculum Vitae</h2>

                <div className="cv__grid">
                    {/* Experience Timeline */}
                    <div className="cv__col">
                        <h3 className="cv__col-title">Experience</h3>
                        <div className="cv__timeline">
                            {experience.map((item) => (
                                <div key={item.role} className="cv__timeline-item">
                                    <div className="cv__timeline-dot" />
                                    <div className="cv__timeline-content card">
                                        <span className="cv__period">{item.period}</span>
                                        <h4 className="cv__role">{item.role}</h4>
                                        <span className="cv__company">{item.company}</span>
                                        <p className="cv__desc">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="cv__col-title" style={{ marginTop: '48px' }}>Education</h3>
                        <div className="cv__timeline">
                            {education.map((item) => (
                                <div key={item.degree} className="cv__timeline-item">
                                    <div className="cv__timeline-dot" />
                                    <div className="cv__timeline-content card">
                                        <span className="cv__period">{item.period}</span>
                                        <h4 className="cv__role">{item.degree}</h4>
                                        <span className="cv__company">{item.school}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="cv__col">
                        <h3 className="cv__col-title">Skills</h3>
                        <div className="cv__skills">
                            {skills.map((skill) => (
                                <div key={skill.name} className="cv__skill">
                                    <div className="cv__skill-header">
                                        <span className="cv__skill-name">{skill.name}</span>
                                        <span className="cv__skill-pct">{skill.level}%</span>
                                    </div>
                                    <div className="cv__skill-bar">
                                        <div
                                            className="cv__skill-fill"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
