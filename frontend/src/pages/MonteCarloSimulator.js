import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './MonteCarloSimulator.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonteCarloSimulator = () => {
    const [stocks, setStocks] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numSimulations, setNumSimulations] = useState(100);
    const [initialValue, setInitialValue] = useState(10000);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const stockList = stocks.split(',').map(stock => stock.trim().toUpperCase());
    
        try {
            const response = await fetch('https://lakshyag42.serv00.net/api/montecarlo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stocks: stockList,
                    start_date: startDate,
                    end_date: endDate,
                    num_simulations: numSimulations,
                    initial_value: initialValue
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error('Fetch Error:', error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generateChartData = () => {
        if (!results) return {};
        return {
            labels: Array.from({ length: results[0].length }, (_, i) => i + 1),
            datasets: results.map((simulation, index) => ({
                label: `Simulation ${index + 1}`,
                data: simulation,
                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
                fill: false,
            })),
        };
    };

    const canSubmit = () => {
        if (!stocks || !startDate || !endDate || !numSimulations || !initialValue) {
            return false;
        }
    
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        return start < end;
    };

    const calculateAnalytics = () => {
        if (!results) return {};

        const finalValues = results.map(simulation => simulation[simulation.length - 1]);

        const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        const median = (arr) => {
            const sorted = [...arr].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
        };
        const standardDeviation = (arr) => {
            const avg = mean(arr);
            const squareDiffs = arr.map(value => (value - avg) ** 2);
            return Math.sqrt(mean(squareDiffs));
        };

        const finalMean = mean(finalValues);
        const finalMedian = median(finalValues);
        const finalStdDev = standardDeviation(finalValues);

        finalValues.sort((a, b) => a - b);
        const p5 = finalValues[Math.floor(finalValues.length * 0.05)];
        const p50 = finalValues[Math.floor(finalValues.length * 0.50)];
        const p95 = finalValues[Math.floor(finalValues.length * 0.95)];

        return { finalMean, finalMedian, finalStdDev, p5, p50, p95 };
    };

    const analytics = calculateAnalytics();

    return (
        <div className="card">
            <h2>Monte Carlo Simulator</h2>
            <form onSubmit={handleSubmit} className="monte-carlo-form">
                <div className="form-group">
                    <label>
                    Enter stock symbols (comma separated):
                    <input type="text" value={stocks} onChange={(e) => setStocks(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                    End Date:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                    Number of Simulations:
                    <input type="number" value={numSimulations} onChange={(e) => setNumSimulations(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                    Initial Portfolio Value:
                    <input type="number" value={initialValue} onChange={(e) => setInitialValue(e.target.value)} />
                    </label>
                </div>
                <button className="monte-carlo-button" type="submit" disabled={loading || !canSubmit()}>
                    {loading ? 'Running...' : 'Run Simulation'}
                </button>
            </form>
            {results && (
                <div className='results'>
                    <div className="chart-container">
                        <Line data={generateChartData()} />
                    </div>
                    <div className='stats'>
                        <h3>Analytics</h3>
                        <p><strong>Mean Final Portfolio Value:</strong> ${analytics.finalMean?.toFixed(2)}</p>
                        <p><strong>Median Final Portfolio Value:</strong> ${analytics.finalMedian?.toFixed(2)}</p>
                        <p><strong>Standard Deviation of Final Portfolio Values:</strong> ${analytics.finalStdDev?.toFixed(2)}</p>
                        <p><strong>5th Percentile:</strong> ${analytics.p5?.toFixed(2)}</p>
                        <p><strong>50th Percentile (Median):</strong> ${analytics.p50?.toFixed(2)}</p>
                        <p><strong>95th Percentile:</strong> ${analytics.p95?.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonteCarloSimulator;
