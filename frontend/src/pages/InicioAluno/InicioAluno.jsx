import { useEffect, useState } from "react";
import "./InicioAluno.css";
import "./InicioAluno.js";

const slidesData = [
    {
        titulo: "Bem-vindo à Nova Luz ✨",
        texto:
            "Acesse suas atividades, acompanhe o calendário acadêmico e fique por dentro de todos os avisos da universidade."
    },
    {
        titulo: "Semana Acadêmica 📘",
        texto:
            "Participe de palestras, workshops e eventos exclusivos organizados pela Universidade Nova Luz."
    },
    {
        titulo: "Centro de Carreiras 🚀",
        texto:
            "Descubra vagas de estágio, oportunidades profissionais e programas de desenvolvimento."
    }
];

export const InicioAluno = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === slidesData.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? slidesData.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header>
                <div className="logo">
                    <div className="logo-box">
                        NL
                    </div>

                    <div className="logo-text">
                        <h1>
                            Universidade Nova Luz
                        </h1>

                        <p>
                            Portal do Aluno
                        </p>
                    </div>
                </div>

                <div className="top-buttons">
                    <button>Perfil</button>
                    <button>Configurações</button>
                    <button>Ajuda</button>
                </div>
            </header>

            <div className="container">
                <aside className="sidebar">
                    <button className="menu-btn">
                        📚 Atividades dos Professores
                    </button>

                    <button className="menu-btn">
                        📅 Calendário
                    </button>

                    <button className="menu-btn">
                        📝 Boletim
                    </button>

                    <button className="menu-btn">
                        🎓 Carteira de Estudante
                    </button>

                    <button className="menu-btn">
                        🏛️ Serviços da Faculdade
                    </button>

                    <button className="menu-btn">
                        💼 Centro de Carreiras
                    </button>

                    <button className="menu-btn">
                        💳 Financeiro
                    </button>
                </aside>

                <main className="content">
                    <div className="carousel">
                        <div className="slide active">
                            <h2>
                                {slidesData[currentSlide].titulo}
                            </h2>

                            <p>
                                {slidesData[currentSlide].texto}
                            </p>
                        </div>

                        <div className="carousel-buttons">
                            <button onClick={prevSlide}>
                                ❮
                            </button>

                            <button onClick={nextSlide}>
                                ❯
                            </button>
                        </div>
                    </div>

                    <section className="cards">
                        <div className="card">
                            <h3>Atividades</h3>
                            <p>
                                Consulte tarefas, provas e
                                materiais enviados pelos
                                professores.
                            </p>
                        </div>

                        <div className="card">
                            <h3>Calendário</h3>
                            <p>
                                Veja datas importantes,
                                avaliações e eventos
                                acadêmicos.
                            </p>
                        </div>

                        <div className="card">
                            <h3>Financeiro</h3>
                            <p>
                                Acompanhe mensalidades,
                                boletos e negociações
                                financeiras.
                            </p>
                        </div>

                        <div className="card">
                            <h3>Carteira Digital</h3>
                            <p>
                                Utilize sua identificação
                                estudantil diretamente pelo
                                portal.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default InicioAluno;