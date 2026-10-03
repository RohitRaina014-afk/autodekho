import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Database,
  Server,
  Layout,
  Code2,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Sparkles,
} from 'lucide-react';

const About = () => {
  const stackItems = [
    {
      name: 'MongoDB & Mongoose',
      type: 'Database Layer',
      icon: <Database className="w-6 h-6 text-emerald-400" />,
      desc: 'NoSQL document database storing vehicle schemas, dynamic attributes, timestamps, and indexes for performant search.',
    },
    {
      name: 'Express.js',
      type: 'Backend Framework',
      icon: <Server className="w-6 h-6 text-blue-400" />,
      desc: 'Lightweight Node.js web application framework organizing clean RESTful routing, middleware, and request validation.',
    },
    {
      name: 'React 19 + Vite',
      type: 'Frontend UI',
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      desc: 'Single-page application powered by modern React functional components, hooks, React Router, and blazing fast Vite tooling.',
    },
    {
      name: 'Node.js',
      type: 'Runtime Environment',
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      desc: 'Event-driven, non-blocking asynchronous JavaScript runtime powering the high-throughput Express REST API.',
    },
    {
      name: 'Tailwind CSS',
      type: 'Design System',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      desc: 'Tailored automotive dark theme with glassmorphic cards, responsive flex/grid layouts, and rich micro-interactions.',
    },
    {
      name: 'Axios & Context API',
      type: 'Data & State Management',
      icon: <Code2 className="w-6 h-6 text-orange-400" />,
      desc: 'Centralized HTTP client service coupled with React Context and localStorage for seamless client-side state persistence.',
    },
  ];

  const apiEndpoints = [
    { method: 'GET', path: '/api/vehicles', desc: 'Fetch all vehicles with search, filters & sort query parameters' },
    { method: 'GET', path: '/api/vehicles/:id', desc: 'Fetch individual vehicle record by MongoDB ObjectId' },
    { method: 'POST', path: '/api/vehicles', desc: 'Create and persist a new vehicle listing' },
    { method: 'PUT', path: '/api/vehicles/:id', desc: 'Update details of an existing vehicle record' },
    { method: 'DELETE', path: '/api/vehicles/:id', desc: 'Permanently remove a vehicle from database' },
    { method: 'GET', path: '/api/vehicles/stats/summary', desc: 'Aggregate platform statistics (counts, brands, avg price)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero / Mission */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Stack MERN Project</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-orange-500">AutoDekho</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          AutoDekho is a high-performance, full-stack automotive marketplace web application engineered to bridge car buyers with trusted private sellers and certified dealerships across India.
        </p>
      </section>

      {/* Purpose & Value Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4">
          <h2 className="text-2xl font-bold text-white">Project Purpose & Problem Statement</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The traditional pre-owned vehicle marketplace suffers from fragmented information, hidden dealership markups, and unverified vehicle condition records.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong>AutoDekho</strong> solves this by presenting a unified, transparent digital showroom where vehicles are indexed with verified 200-point inspection data, accurate pricing, and direct seller contact mechanisms.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors shadow-md"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4">
          <h2 className="text-2xl font-bold text-white">Core Highlights</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Full CRUD Operations:</strong> Complete REST API integration for creating, listing, inspecting, updating, and deleting vehicles.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Real-time Filtering:</strong> Multi-dimensional search across Brand, Model, City, Fuel Type, Transmission, and Price Slider.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Persistent Wishlist:</strong> LocalStorage-backed saved vehicle collection without requiring login barriers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Interview Ready:</strong> Clean architectural separation between presentation, state, controllers, and database models.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Technology Stack</h2>
          <p className="text-sm text-slate-400">
            Built using modern, industry-standard technologies focused on speed, maintainability, and clean code principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
                  {item.type}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{item.name}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow Diagram */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white">Full-Stack Data Flow Architecture</h2>
        <p className="text-sm text-slate-300">
          Here is how data flows end-to-end through the application when a user interacts with AutoDekho:
        </p>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto space-y-2">
          <div className="text-orange-400 font-bold">// 1. Read Flow (Browsing Vehicles)</div>
          <div>User Action &rarr; React Component &rarr; Axios GET /api/vehicles &rarr; Express Router &rarr; Controller &rarr; Mongoose Model &rarr; MongoDB Query &rarr; JSON Response &rarr; React State &rarr; UI Re-render</div>
          <div className="pt-4 text-emerald-400 font-bold">// 2. Create Flow (Listing a Vehicle)</div>
          <div>React Form Submit &rarr; Client Validation &rarr; Axios POST /api/vehicles &rarr; Express JSON Parser &rarr; Controller Validation &rarr; Mongoose.create() &rarr; MongoDB Insert &rarr; HTTP 201 Created &rarr; UI Redirect</div>
        </div>
      </section>

      {/* REST API Reference Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">REST API Specifications</h2>
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-4">HTTP Method</th>
                  <th className="p-4">API Endpoint</th>
                  <th className="p-4">Purpose & Description</th>
                  <th className="p-4">Status Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {apiEndpoints.map((ep, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded font-bold font-mono text-[11px] ${
                          ep.method === 'GET'
                            ? 'bg-blue-500/20 text-blue-400'
                            : ep.method === 'POST'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : ep.method === 'PUT'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {ep.method}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-orange-400 text-xs">{ep.path}</td>
                    <td className="p-4 text-xs">{ep.desc}</td>
                    <td className="p-4 font-mono text-xs text-slate-400">
                      {ep.method === 'POST' ? '201 Created' : '200 OK'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
