import React from 'react';
import './HomePage.css'; // Make sure to create a corresponding CSS file for styling

const HomePage = () => {
    return (
        <div className="homepage">
            
            <section className="hero">
                <div className="hero-content">
                    <h2>Welcome to Financial Analytics Hub</h2>
                    <p>Your one-stop solution for financial data analysis and insights.</p>
                    <a href="#projects" className="cta-button">Learn More</a>
                </div>
                <div class="home-hero__mouse-scroll-cont">
                    <div class="mouse"></div>
                </div>
            </section>

            <section id="about" className="about">
                <h2>About</h2>
                <p>This is a hub for all the financial analytics focused projects and programs that I have completed. Feel free to learn more about each project below.</p>
            </section>

            <section id="projects" className="features">
                <h2>Projects</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <h3>Monte Carlo Stock Simulator</h3>
                        <p>A project that employs Monte Carlo simulations to estimate the potential returns of a financial portfolio over a specified period using real market data.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Work in Progress</h3>
                        <p>Thanks for checking out this page! I'm working on adding some more projects based on financial analytics here soon, check back again in a week or two!</p>
                    </div> 

                    {/* <div className="feature-item">
                        <h3>Project Name</h3>
                        <p>Description</p>
                    </div> */}

                </div>
            </section>

            <section id="contact" className="contact">
                <h2>Contact Us</h2>
                <p>If you have any questions or need support, feel free to reach out!</p>
                <form className="contact-form" action="https://formspree.io/f/xblrgwqn"
                    method="POST">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Financial Analytics Hub - Lakshya Gour</p>
            </footer>
        </div>
    );
};

export default HomePage;
