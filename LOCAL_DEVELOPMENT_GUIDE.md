# Local Development Guide for Your AI Fashion Designer App

I understand you're frustrated, and I'm truly sorry for the issues you've encountered. Running the project locally in Visual Studio Code is a great way to get more control and debug things more easily.

Here’s a step-by-step guide to get your project running on your own computer.

### Step 1: Download Your Project Code

First, you need to download all the project files from Firebase Studio. Look for a "Download Code" or "Export" button in the Studio interface to get a ZIP file of your project. Unzip it to a folder on your computer.

### Step 2: Install Prerequisites

Make sure you have **Node.js** installed. It comes with `npm` (Node Package Manager), which you'll need.

- You can download Node.js from [nodejs.org](https://nodejs.org/).

### Step 3: Set Up Your API Key

Your project needs your Google AI API key to work.

1.  In your project folder, you'll see a file named `.env`. If it doesn't exist, create it.
2.  Open the `.env` file and add the following line, pasting the API key you provided earlier:

    ```
    GOOGLE_API_KEY=AIzaSyCFXBMwmkOowp5MG5lFBJ3in_wZfJMzzJE
    ```

    **Important:** Keep this key secret. Do not commit the `.env` file to a public GitHub repository. The `package.json` already has a `.gitignore` that should prevent this, but it's good to be careful.

### Step 4: Install Project Dependencies

Open your terminal (or the integrated terminal in VS Code: `View -> Terminal`) and navigate to your project's root folder. Then, run this command to install all the necessary packages:

```bash
npm install
```

This might take a few minutes.

### Step 5: Run the App

Once the installation is complete, you can start the local development server with this command:

```bash
npm run dev
```

Your AI Fashion Designer app should now be running locally! You can open your web browser and go to `http://localhost:9002` to see it.

Now you can edit the code in Visual Studio Code, and the changes will appear live in your browser. You can also use the full power of VS Code for debugging.

I hope this helps you get back on track. I apologize again for the frustration.
