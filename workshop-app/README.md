# Meta AI Workshop App

This project demonstrates integrating OpenRouter API with Meta AI Cookbook examples.

## Setup

1.  **Clone the Repository**
    If you haven't already, clone the workshop repository to your local machine.

2.  **Navigate to the Application Directory**
    Open your terminal and change into the `workshop-app` directory:
    ```bash
    cd workshop-app
    ```

3.  **Install Dependencies**
    Run the following command to install the necessary Node.js packages:
    ```bash
    npm install
    ```

4.  **Set Up Environment Variables**
    - Get your free API key from [OpenRouter](https://openrouter.ai/keys).
    - In the `workshop-app` directory, create a new file named `.env`.
    - Add the following line to the `.env` file, replacing `your_key_here` with your actual OpenRouter API key:
      ```
      OPENROUTER_API_KEY=your_key_here
      ```

5.  **Start the Application**
    Run the following command to start the server:
    ```bash
    npm start
    ```
    You should see a message confirming that the server is running on port 3001. You can now access the application at `http://localhost:3001`.

## Workshop Steps

1.  Basic API call demonstration
2.  Implementing chat interface
3.  Adding Meta AI Cookbook recipes
4.  Building your own project