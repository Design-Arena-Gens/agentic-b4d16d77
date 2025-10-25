"use client";
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkHealth() {
    setLoading(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      setHealth({ error: 'Health check failed' });
    } finally {
      setLoading(false);
    }
  }

  async function sendEcho(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setResponse({ error: 'Echo failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>Agentic Next.js App</h1>
      <p>Minimal app router setup with two API routes.</p>

      <section className="card">
        <h2>Health Check</h2>
        <button onClick={checkHealth} disabled={loading}>
          {loading ? 'Checking...' : 'Check /api/health'}
        </button>
        {health && (
          <pre className="pre">{JSON.stringify(health, null, 2)}</pre>
        )}
      </section>

      <section className="card">
        <h2>Echo Service</h2>
        <form onSubmit={sendEcho}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" disabled={loading || !message.trim()}>
            {loading ? 'Sending...' : 'Send to /api/echo'}
          </button>
        </form>
        {response && (
          <pre className="pre">{JSON.stringify(response, null, 2)}</pre>
        )}
      </section>

      <footer>
        <a href="https://vercel.com" target="_blank" rel="noreferrer">Powered by Vercel</a>
      </footer>
    </main>
  );
}
