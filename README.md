---

# PsyAssist: Multimodal RAG-Based Mental Health Chatbot

**PsyAssist** is an intelligent, context-aware mental health chatbot that leverages **Retrieval-Augmented Generation (RAG)** and **tonality-aware dialogue** to offer personalized, empathetic support. Built using Flask, it features a smooth and accessible web interface backed by a custom mental health knowledge base in PDF format.

---

## Features

### 1. Retrieval-Augmented Generation (RAG)

Uses a vector database of mental health documents to retrieve contextually relevant answers tailored to user questions.

### 2. Tonality-Aware Conversations

Dynamically adjusts responses based on the emotional tone detected in user input, enhancing empathy and relevance.

### 3. Multimodal Framework

Engineered to support diverse inputs (text and easily extendable to voice/image) for a richer conversational experience.

### 4. Clean Web Interface

Built using HTML/CSS/JS to provide a seamless and user-friendly environment focused on wellness and support.

---

## Interface Snapshots

| Chat Interface                                                                              | Help/FAQ Page                                                                                 |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![Chat UI](https://github.com/user-attachments/assets/157f68a4-62d1-41b6-87a7-822da9ca9fd9) | ![Help Page](https://github.com/user-attachments/assets/9daf659a-4629-4bfe-81d4-53984ccd9d3e) |

---

## Project Structure

```
├── index.html          # Main chatbot interface
├── help_fnq.html       # Help / FAQ page
├── style.css           # Frontend styling
├── script.js           # Client-side interactivity
├── app.py              # Flask backend logic
├── rag_embeddings.py   # PDF embedding and vector store
├── resources/          # Static assets
└── rag_database/       # (Create this) Add mental health PDFs here
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/PsyAssist.git
cd PsyAssist
mkdir rag_database
pip install -r requirements.txt
```

### 2. Configure API Keys

Add any necessary API keys (e.g., for embedding models) in your environment or directly in the embedding script.

### 3. Prepare Knowledge Base

Place relevant mental health PDF documents in the `rag_database/` directory. These documents will be processed into vector embeddings for retrieval.

### 4. Launch the Application

```bash
python app.py
```

Visit `http://localhost:5000` in your browser to start chatting.

---

## Contributing

You're welcome to contribute by improving features, UI, or expanding the knowledge base:

* Fork the repository
* Create a feature branch
* Submit a pull request with a clear explanation

---

## Author

**Soumya Sourav Das**
[Portfolio](https://soumya-sourav-portfolio.vercel.app/) | [GitHub](https://github.com/Celestial317) | [LinkedIn](https://www.linkedin.com/in/soumyasouravdas/)

---
