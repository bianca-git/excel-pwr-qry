# Interactive Power Query Guides

This repository contains the source code for a web-based collection of interactive guides for Microsoft Power Query in Excel. The goal is to provide users with a hands-on learning experience by simulating the Power Query interface and guiding them through common data transformation tasks.

## Project Overview

The project is a static website built with HTML, Tailwind CSS for styling, and vanilla JavaScript for interactivity. It dynamically loads guide content, allowing for easy expansion and maintenance.

### Core Components

-   `index.html`: The main entry point of the application. It provides the overall page structure, including the sidebar navigation and the main content area where guides are displayed.
-   `guides.js`: The heart of the application. This script fetches the list of guides from `guides.json`, populates the navigation menu, and handles the dynamic loading of guide content into the DOM. It also contains the crucial logic for re-executing JavaScript within the loaded HTML content to initialize interactive elements.
-   `guides.json`: A manifest file that lists all available guides. Each entry includes a unique ID, title, description, and the path to its corresponding HTML file. This makes the application data-driven and easy to update with new guides.
-   `content/`: This directory stores the HTML files for each individual guide. Each file is a self-contained set of instructions, explanations, and interactive diagrams.
-   `README.md`: This file, providing project documentation.

## Local Development

To run this project locally, you need a local web server to handle the `fetch()` requests for the guide content. The browser's `file://` protocol does not support these requests due to security restrictions (CORS policy).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/user/interactive-power-query-guides.git
    cd interactive-power-query-guides
    ```

2.  **Start a local web server.** If you have Python installed, you can easily start one from the project root:
    ```bash
    # For Python 3
    python -m http.server
    ```
    If you have Node.js, you can use a package like `live-server`:
    ```bash
    # Install live-server globally if you haven't already
    npm install -g live-server
    # Run it
    live-server
    ```

3.  **Open the project in your browser.** Navigate to the URL provided by your local server (e.g., `http://localhost:8000`).

## How to Add a New Guide

Adding a new guide is a straightforward process designed to be as simple as possible.

1.  **Create the HTML Content File:**
    -   Create a new `.html` file inside the `content/` directory (e.g., `content/new-guide.html`).
    -   Structure the content using HTML and style it with Tailwind CSS classes. You can use the existing guide files as a template.
    -   If your guide requires interactivity, add a `<script>` tag at the end of the file. Inside this script, define a unique initialization function on the `window` object. The function name must follow the pattern `window.init_your_guide_id`, where `your_guide_id` is the kebab-case ID you will define in the next step (with hyphens replaced by underscores). For example, if your ID is `new-data-source`, the function must be named `window.init_new_data_source`.

2.  **Update the Manifest (`guides.json`):**
    -   Open `guides.json`.
    -   Add a new JSON object to the array for your new guide. Follow the existing structure:
        ```json
        {
            "id": "new-guide-id",
            "title": "Your New Guide Title",
            "description": "A brief, compelling description of what this guide teaches.",
            "file": "content/new-guide.html"
        }
        ```
    -   Ensure the `id` is unique and uses kebab-case (e.g., `my-awesome-guide`).
    -   The `file` path must correctly point to the HTML file you created in step 1.

3.  **Verify:**
    -   Save your changes and open the project in your browser (or refresh the page if it's already open).
    -   Your new guide should automatically appear in the navigation sidebar. Click it to ensure it loads correctly and that all interactive elements are working as expected.