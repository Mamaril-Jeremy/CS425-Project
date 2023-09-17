To create a new Svelte project, you can use the official Svelte template. Here are the steps to create a new Svelte project:

1. **Install Node.js and npm**:

   Ensure you have Node.js and npm (Node Package Manager) installed on your computer. You can download and install them from the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).

   To check if Node.js and npm are installed, you can open your terminal or command prompt and run the following commands to check their versions:

   ```bash
   node -v
   npm -v
   ```

   If these commands return version numbers, Node.js and npm are installed.

2. **Create a New Svelte Project**:

   Once you have Node.js and npm installed, you can create a new Svelte project using the official template. Open your terminal or command prompt and run the following command to create a new Svelte project:

   ```bash
   npx degit sveltejs/template svelte-app
   ```

   This command will use the `degit` tool to clone the Svelte template repository and create a new project directory named "svelte-app." You can replace "svelte-app" with your desired project name.

3. **Navigate to the Project Directory**:

   Change your current directory to the newly created project directory:

   ```bash
   cd svelte-app
   ```

4. **Install Dependencies**:

   Inside your project directory, you need to install the project's dependencies using npm:

   ```bash
   npm install
   ```

   This command will download and install the required packages, including Svelte itself.

5. **Start the Development Server**:

   To start the development server and see your Svelte app in action, run the following command:

   ```bash
   npm run dev
   ```

   This will start a development server, and you'll see the URL (usually `http://localhost:5000`) where your Svelte app is running. Open a web browser and navigate to this URL to see your new Svelte project.

6. **Begin Development**:

   You can start editing the Svelte components in the "src" directory. As you make changes, the development server will automatically update the application in the browser.

7. **Build for Production**:

   When you're ready to build your Svelte app for production, you can run the following command:

   ```bash
   npm run build
   ```

   This command will generate optimized production-ready files in the "public" directory.

That's it! You've successfully created a new Svelte project and can start building your web application with Svelte.