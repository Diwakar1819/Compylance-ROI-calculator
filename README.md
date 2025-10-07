<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoicing ROI Simulator</title>
    <!-- Load Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom font and dark background */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #111827; /* Gray 900 */
            color: #d1d5db; /* Gray 300 */
        }
        /* Custom style for the section title underline - necessary as pseudo-elements can't be done with Tailwind classes directly */
        .section-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50%;
            height: 4px;
            background-color: #60a5fa; /* Blue 400 - bright contrast */
            border-radius: 9999px;
        }
    </style>
    <script>
        // Setup configuration for Tailwind (optional but good practice)
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'code-bg': '#030712', /* Darker than body/sections */
                        'code-text': '#d1fae5', /* Light green for code text */
                    }
                }
            }
        }
    </script>
</head>
<body class="p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
        <!-- Header / Project Title -->
        <header class="text-center mb-12 py-6 bg-gray-800 shadow-2xl rounded-xl border-t-4 border-blue-400">
            <h1 class="text-4xl font-extrabold text-white mb-2">
                Invoicing ROI Simulator
            </h1>
            <p class="text-lg text-gray-400">
                A Lightweight Calculator for Accounts Payable Automation
            </p>
            <!-- Live URL -->
            <div class="mt-4">
                <a href="https://roi-india-pro.lovable.app/" target="_blank" class="text-blue-400 hover:text-blue-300 font-semibold transition duration-150 underline text-sm sm:text-base">
                    View Live Application
                </a>
            </div>
        </header>
        <!-- Project Overview & Goal -->
        <section class="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                Project Overview & Goal
            </h2>
            <p class="text-gray-300 leading-relaxed">
                This project is a high-fidelity **Return on Investment (ROI) simulator** designed to help businesses confidently evaluate the financial benefits of switching from manual to automated invoicing.
            </p>
            <p class="text-gray-300 leading-relaxed mt-3">
                The application provides an interactive single-page web interface where users input key business metrics (invoice volume, staff wages, error rates) and instantly receive calculated results showing **monthly savings, payback period, and projected ROI**. The core goal is to deliver a reliable, working prototype that uses simple, traceable math formulas to clearly demonstrate the financial advantage of automation.
            </p>
        </section>
        <!-- Key Features -->
        <section class="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                Key Features
            </h2>
            <ul class="list-disc pl-5 space-y-3 text-gray-300">
                <li>
                    **Quick Simulation:** Instant calculation of monthly savings, payback period, and total ROI based on user inputs.
                </li>
                <li>
                    **Scenario Management:** Full CRUD support to **save, load, and delete named scenarios** for future reference and comparison.
                </li>
                <li>
                    **Gated Reporting:** Ability to generate a downloadable PDF or HTML report detailing the projected savings, requiring an email address for lead capture.
                </li>
                <li>
                    **Favorable Output Logic:** Internal constants and a bias factor are applied server-side to ensure automation outcomes consistently show a positive cost benefit and ROI.
                </li>
            </ul>
        </section>
        <!-- Tech Stack -->
        <section class="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                Technology Stack
            </h2>
            <div class="flex flex-wrap gap-3 mt-4">
                <!-- Technology Badges - adjusted for dark theme -->
                <span class="px-3 py-1 bg-blue-700 text-blue-100 font-medium text-sm rounded-full shadow-md">Vite</span>
                <span class="px-3 py-1 bg-purple-700 text-purple-100 font-medium text-sm rounded-full shadow-md">TypeScript</span>
                <span class="px-3 py-1 bg-sky-700 text-sky-100 font-medium text-sm rounded-full shadow-md">React</span>
                <span class="px-3 py-1 bg-yellow-700 text-yellow-100 font-medium text-sm rounded-full shadow-md">shadcn-ui</span>
                <span class="px-3 py-1 bg-green-700 text-green-100 font-medium text-sm rounded-full shadow-md">Tailwind CSS</span>
            </div>
            <p class="text-gray-300 mt-4">
                The project utilizes a modern, component-based frontend stack to deliver a fast and responsive user experience.
            </p>
            <div class="mt-6 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-700 rounded-lg overflow-hidden shadow-lg">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Technology</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Purpose</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-900 divide-y divide-gray-700 text-sm text-gray-300">
                        <tr><td class="px-4 py-2 whitespace-nowrap font-semibold">Framework</td><td class="px-4 py-2 whitespace-nowrap">React</td><td class="px-4 py-2">Core component-based UI library.</td></tr>
                        <tr><td class="px-4 py-2 whitespace-nowrap font-semibold">Language</td><td class="px-4 py-2 whitespace-nowrap">TypeScript</td><td class="px-4 py-2">Strongly-typed JavaScript for better maintainability.</td></tr>
                        <tr><td class="px-4 py-2 whitespace-nowrap font-semibold">Build Tool</td><td class="px-4 py-2 whitespace-nowrap">Vite</td><td class="px-4 py-2">Fast development server and bundling.</td></tr>
                        <tr><td class="px-4 py-2 whitespace-nowrap font-semibold">Styling</td><td class="px-4 py-2 whitespace-nowrap">Tailwind CSS</td><td class="px-4 py-2">Utility-first CSS framework for rapid, responsive design.</td></tr>
                        <tr><td class="px-4 py-2 whitespace-nowrap font-semibold">UI Components</td><td class="px-4 py-2 whitespace-nowrap">shadcn-ui</td><td class="px-4 py-2">Accessible and customizable UI components built on Tailwind.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>
        <!-- API Endpoints -->
        <section class="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                API Endpoints (REST)
            </h2>
            <p class="text-gray-300 mb-4">
                The backend service is designed around simple JSON-based REST endpoints for all calculations and data persistence.
            </p>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-700 rounded-lg overflow-hidden shadow-lg">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Endpoint</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Purpose</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-900 divide-y divide-gray-700 text-sm text-gray-300">
                        <tr>
                            <td class="px-4 py-2 whitespace-nowrap"><span class="font-bold text-green-400">POST</span></td>
                            <td class="px-4 py-2 whitespace-nowrap"><code class="bg-gray-700 text-code-text p-1 rounded">/simulate</code></td>
                            <td class="px-4 py-2 whitespace-nowrap">Run simulation and return JSON results.</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 whitespace-nowrap"><span class="font-bold text-blue-400">POST</span></td>
                            <td class="px-4 py-2 whitespace-nowrap"><code class="bg-gray-700 text-code-text p-1 rounded">/scenarios</code></td>
                            <td class="px-4 py-2 whitespace-nowrap">Save a new scenario.</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 whitespace-nowrap"><span class="font-bold text-blue-400">GET</span></td>
                            <td class="px-4 py-2 whitespace-nowrap"><code class="bg-gray-700 text-code-text p-1 rounded">/scenarios</code></td>
                            <td class="px-4 py-2 whitespace-nowrap">List all saved scenarios.</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 whitespace-nowrap"><span class="font-bold text-blue-400">GET</span></td>
                            <td class="px-4 py-2 whitespace-nowrap"><code class="bg-gray-700 text-code-text p-1 rounded">/scenarios/:id</code></td>
                            <td class="px-4 py-2 whitespace-nowrap">Retrieve a specific scenario detail.</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 whitespace-nowrap"><span class="font-bold text-red-400">POST</span></td>
                            <td class="px-4 py-2 whitespace-nowrap"><code class="bg-gray-700 text-code-text p-1 rounded">/report/generate</code></td>
                            <td class="px-4 py-2 whitespace-nowrap">Generate a PDF/HTML report (requires email).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <!-- Setup Instructions -->
        <section class="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                Local Development Setup
            </h2>
            <p class="mb-4 text-gray-300">
                To run this project locally, you need <a href="https://nodejs.org/" class="text-blue-400 hover:underline" target="_blank">Node.js & npm</a> installed (installation via <a href="https://github.com/nvm-sh/nvm" class="text-blue-400 hover:underline" target="_blank">nvm</a> is recommended).
            </p>
            <div class="mb-6">
                <h3 class="font-semibold text-lg text-white mb-2">1. Clone the Repository:</h3>
                <pre class="bg-code-bg text-code-text p-4 rounded-lg overflow-x-auto whitespace-pre font-mono"><code>git clone &lt;YOUR_GIT_URL&gt;
cd &lt;YOUR_PROJECT_NAME&gt;</code></pre>
            </div>
            <div class="mb-6">
                <h3 class="font-semibold text-lg text-white mb-2">2. Install Dependencies:</h3>
                <pre class="bg-code-bg text-code-text p-4 rounded-lg overflow-x-auto whitespace-pre font-mono"><code>npm i</code></pre>
            </div>
            <div class="mb-6">
                <h3 class="font-semibold text-lg text-white mb-2">3. Start the Development Server:</h3>
                <p class="text-sm text-gray-400 mb-2">
                    This command starts the development server with auto-reloading and an instant preview.
                </p>
                <pre class="bg-code-bg text-code-text p-4 rounded-lg overflow-x-auto whitespace-pre font-mono"><code>npm run dev</code></pre>
            </div>
        </section>
        <!-- Deployment and Hosting -->
        <section class="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                Deployment
            </h2>
            <p class="text-gray-300">
                The compiled frontend artifact is compatible with any modern static hosting service (Vercel, Netlify, Render, etc.).
            </p>
            <ul class="list-disc pl-5 space-y-2 mt-4 text-gray-300">
                <li>
                    **Note on Persistence:** Persistence for saved scenarios requires a database (SQL or NoSQL) accessible by the deployed backend service.
                </li>
                <li>
                    **Local API Testing:** For testing the API in a local environment, tools like <code class="bg-gray-700 p-1 rounded text-white">ngrok</code> can be used to expose the backend service publicly.
                </li>
            </ul>
        </section>
        <!-- Contributing -->
        <section class="p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="section-title text-2xl font-bold text-white relative pb-2 mb-6 inline-block">
                Contributing
            </h2>
            <p class="text-gray-300 mb-4">
                We welcome contributions and improvements to the Invoicing ROI Simulator.
            </p>
            <ul class="list-disc pl-5 space-y-3 text-gray-300">
                <li>
                    **Preferred IDE:** Clone the repository and push changes directly from your preferred integrated development environment.
                </li>
                <li>
                    **GitHub Codespaces:** Launch a new Codespace environment directly from the repo's "Code" button for a full in-browser IDE experience.
                </li>
                <li>
                    **Direct Edits:** Navigate to the desired file on GitHub, click the "Edit" (pencil) button, make your changes, and commit.
                </li>
            </ul>
        </section>
        <!-- Footer -->
        <footer class="text-center mt-12 pt-6 border-t border-gray-700">
            <p class="text-sm text-gray-500">
                Built with React, TypeScript, and a focus on financial simulation accuracy.
            </p>
        </footer>
    </div>
</body>
</html>
