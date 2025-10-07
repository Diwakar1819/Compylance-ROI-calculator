<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoicing Compylance-ROI Simulator</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for better readability and aesthetics */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f7f9fb;
            color: #1f2937;
        }
        .container {
            max-width: 800px;
        }
        .section-title {
            position: relative;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
            display: inline-block;
        }
        .section-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50%;
            height: 4px;
            background-color: #3b82f6; /* Blue 500 */
            border-radius: 9999px;
        }
        .code-block {
            background-color: #1f2937; /* Dark Gray for code */
            color: #f9fafb; /* Light text */
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            white-space: pre; /* Ensure proper line breaks in the code */
            font-family: 'Fira Code', 'Monospace', monospace;
        }
        /* Custom scrollbar for webkit browsers for the code block */
        .code-block::-webkit-scrollbar {
            height: 8px;
        }
        .code-block::-webkit-scrollbar-thumb {
            background: #4b5563;
            border-radius: 10px;
        }
        .btn-primary {
            display: inline-flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.2s;
            text-decoration: none;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
    </style>
</head>
<body class="p-4 sm:p-8">
    <div class="container mx-auto">

        <!-- Header -->
        <header class="text-center mb-12 py-6 bg-white shadow-lg rounded-xl">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
                Invoicing ROI Simulator
            </h1>
            <p class="text-lg text-gray-600">
                A Lightweight Calculator for Accounts Payable Automation
            </p>
        </header>

        <!-- Project Overview (New/Expanded Summary) -->
        <section class="mb-12 p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                ✨ Project Overview & Goal
            </h2>
            <p class="text-gray-700 leading-relaxed">
                This project is a high-fidelity **Return on Investment (ROI) simulator** designed to help businesses confidently evaluate the financial benefits of switching from manual to automated invoicing.
            </p>
            <p class="text-gray-700 leading-relaxed mt-3">
                The application provides an interactive single-page web interface where users input key metrics (invoice volume, staff wages, error rates) and instantly receive calculated results showing **monthly savings, payback period, and projected ROI**. The core goal is to deliver a reliable, working prototype that uses simple, traceable math formulas to clearly demonstrate the financial advantage of automation.
            </p>
        </section>

        <!-- Key Features -->
        <section class="mb-12 p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                🔑 Key Features
            </h2>
            <ul class="list-disc pl-5 space-y-3 text-gray-700">
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
                    **Favorable Output:** Internal constants and a bias factor are applied server-side to ensure automation outcomes consistently show a positive cost benefit and ROI.
                </li>
            </ul>
        </section>

        <!-- Tech Stack -->
        <section class="mb-12 p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                💻 Technology Stack
            </h2>
            <div class="flex flex-wrap gap-3 mt-4">
                <!-- Using Tailwind classes for tech badges -->
                <span class="px-3 py-1 bg-blue-100 text-blue-800 font-medium text-sm rounded-full">Vite</span>
                <span class="px-3 py-1 bg-purple-100 text-purple-800 font-medium text-sm rounded-full">TypeScript</span>
                <span class="px-3 py-1 bg-sky-100 text-sky-800 font-medium text-sm rounded-full">React</span>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 font-medium text-sm rounded-full">shadcn-ui</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 font-medium text-sm rounded-full">Tailwind CSS</span>
            </div>
            <p class="text-gray-700 mt-4">
                The project utilizes a modern, component-based frontend stack to deliver a fast and responsive user experience.
            </p>
        </section>

        <!-- API Endpoints -->
        <section class="mb-12 p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                📡 API Endpoints (REST)
            </h2>
            <p class="text-gray-700 mb-4">
                The backend service provides simple JSON-based REST endpoints for all calculations and data persistence.
            </p>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><span class="font-bold text-green-600">POST</span></td>
                            <td class="px-6 py-4 whitespace-nowrap"><code>/simulate</code></td>
                            <td class="px-6 py-4 whitespace-nowrap">Run simulation and return JSON results.</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><span class="font-bold text-blue-600">POST</span></td>
                            <td class="px-6 py-4 whitespace-nowrap"><code>/scenarios</code></td>
                            <td class="px-6 py-4 whitespace-nowrap">Save a new scenario.</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><span class="font-bold text-blue-600">GET</span></td>
                            <td class="px-6 py-4 whitespace-nowrap"><code>/scenarios</code></td>
                            <td class="px-6 py-4 whitespace-nowrap">List all saved scenarios.</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><span class="font-bold text-blue-600">GET</span></td>
                            <td class="px-6 py-4 whitespace-nowrap"><code>/scenarios/:id</code></td>
                            <td class="px-6 py-4 whitespace-nowrap">Retrieve a specific scenario detail.</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><span class="font-bold text-red-600">POST</span></td>
                            <td class="px-6 py-4 whitespace-nowrap"><code>/report/generate</code></td>
                            <td class="px-6 py-4 whitespace-nowrap">Generate a PDF/HTML report (requires email).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Setup Instructions -->
        <section class="mb-12 p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                ⚙️ Local Development Setup
            </h2>
            <p class="mb-4 text-gray-700">
                To run this project locally, you need <a href="https://github.com/nvm-sh/nvm" class="text-blue-600 hover:underline" target="_blank">Node.js & npm</a> installed (recommended via nvm).
            </p>

            <div class="mb-6">
                <h3 class="font-semibold text-lg text-gray-800 mb-2">Step 1: Clone the Repository</h3>
                <pre class="code-block"><code id="clone-code">git clone &lt;YOUR_GIT_URL&gt;
cd &lt;YOUR_PROJECT_NAME&gt;</code></pre>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-lg text-gray-800 mb-2">Step 2: Install Dependencies</h3>
                <pre class="code-block">npm i</pre>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-lg text-gray-800 mb-2">Step 3: Start the Development Server</h3>
                <p class="text-sm text-gray-600 mb-2">
                    This command starts the development server with auto-reloading and an instant preview.
                </p>
                <pre class="code-block">npm run dev</pre>
            </div>
        </section>

        <!-- Deployment and Hosting (Updated) -->
        <section class="mb-12 p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                ☁️ Deployment
            </h2>
            <p class="text-gray-700">
                The compiled artifact can be deployed to any modern static hosting service (Vercel, Netlify, Render, etc.). For testing the API in a local environment, tools like <code class="bg-gray-200 p-1 rounded">ngrok</code> can be used to expose the backend service.
            </p>
            <ul class="list-disc pl-5 space-y-2 mt-4 text-gray-700">
                <li>Persistence for scenarios requires a database (SQL or NoSQL) accessible by the deployed backend.</li>
                <li>The frontend is a standard build compatible with static hosting.</li>
            </ul>
        </section>

        <!-- Contributing (Updated) -->
        <section class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="section-title text-2xl font-bold text-gray-800">
                🤝 Contributing
            </h2>
            <p class="text-gray-700 mb-4">
                We welcome contributions and improvements to the Invoicing ROI Simulator.
            </p>
            <ul class="list-disc pl-5 space-y-3 text-gray-700">
                <li>
                    **Use your Preferred IDE:** Clone the repository and push changes directly.
                </li>
                <li>
                    **GitHub Edits:** Navigate to the desired file, click the "Edit" (pencil) button, make your changes, and commit.
                </li>
                <li>
                    **GitHub Codespaces:** Launch a new Codespace environment directly from the repo's "Code" button for a full in-browser IDE experience.
                </li>
            </ul>
        </section>

        <!-- Footer (Updated) -->
        <footer class="text-center mt-12 pt-6 border-t border-gray-300">
            <p class="text-sm text-gray-500">
                Built with React, TypeScript, and a focus on financial simulation accuracy.
            </p>
        </footer>
    </div>
</body>
</html>
