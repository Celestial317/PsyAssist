---

# PsyAssist: Multimodal RAG-Based Mental Health Chatbot

**PsyAssist** is a conversational AI application that offers empathetic mental health support through **Retrieval-Augmented Generation (RAG)** and **tonality-aware response modeling**. Developed using Flask, it provides a clean and responsive web interface to facilitate thoughtful, human-like interactions grounded in credible mental health resources.

---

## Key Features

### Retrieval-Augmented Generation (RAG)

Utilizes a custom RAG pipeline to retrieve contextually relevant content from mental health PDFs. These documents are embedded into a vector store, allowing the chatbot to deliver fact-based, contextual responses.

### Tonality-Aware Interaction

Adapts the tone of responses based on the detected emotional intent of the user input, enhancing sensitivity and conversational relevance.

### Multimodal Design

Engineered for multi-format input (extensible to future speech or visual modes), supporting diverse interaction needs beyond simple text.

### Intuitive User Interface

Built with HTML, CSS, and JavaScript to ensure a minimalistic, focused, and distraction-free user experience.

---

## Project Structure

```
├── index.html          # Main chatbot interface
├── help_fnq.html       # Help and FAQ page
├── style.css           # Frontend styling
├── script.js           # Client-side JavaScript
├── app.py              # Flask backend (routing and logic)
├── rag_embeddings.py   # Embeds PDFs into a vector database
├── resources/          # Supporting files and assets
└── rag_database/       # Folder to store uploaded mental health PDFs
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

Add your necessary API keys inside a `.env` file or configure them in the relevant Python scripts.

### 3. Add Knowledge Base

Place relevant mental health PDF documents into the `rag_database/` directory. These will be embedded for retrieval.

### 4. Run the Application

```bash
python app.py
```

Open your browser and visit `http://localhost:5000` to start interacting with the chatbot.

---

## Contributing

Pull requests are welcome. If you have suggestions, bug fixes, or new features in mind:

* Fork the repository
* Make your changes
* Submit a pull request for review

---

## Author

**Soumya Sourav Das**
[Portfolio](https://soumya-sourav-portfolio.vercel.app/) | [GitHub](https://github.com/Celestial317) | [LinkedIn](https://www.linkedin.com/in/soumyasouravdas/)

---
