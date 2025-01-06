import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [vocabulary, setVocabulary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVocabulary = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    setVocabulary(null); // Clear previous vocabulary data
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-vocabulary",
        { word }
      );
      setVocabulary(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>🦄 Kid-Friendly Vocabulary Builder 🌟</h1>
      </header>
      <main>
        <div className="input-section">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word (e.g., 'dream')"
          />
          <button onClick={fetchVocabulary} disabled={loading}>
            {loading ? "Loading..." : "Generate"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {vocabulary && (
          <div className="vocabulary-card">
            {/* Section 1 */}
            <section className="section">
              <div className="word">
                <h2 className="word">Word: {vocabulary.word || "Unknown"}</h2>
              </div>

              <h2>Origins & Basics</h2>
              <p>
                <strong>Root/Origin:</strong> {vocabulary.root_origin || "N/A"}
              </p>
              <p>
                <strong>Phonetic:</strong>{" "}
                {vocabulary.phonetic_pronunciation || "N/A"}
              </p>
              <p>
                <strong>Part of Speech:</strong>{" "}
                {vocabulary.part_of_speech || "N/A"}
              </p>
              <p>
                <strong>Syllable Breakdown:</strong>{" "}
                {vocabulary.syllable_breakdown || "N/A"}
              </p>
            </section>

            {/* Section 2 */}
            <section className="section">
              <h2>Meaning & Connections</h2>
              <p>
                <strong>Meaning:</strong> {vocabulary.meaning || "N/A"}
              </p>
              <p>
                <strong>Synonyms:</strong>{" "}
                {vocabulary.synonyms?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Antonyms:</strong>{" "}
                {vocabulary.antonyms?.join(", ") || "N/A"}
              </p>
            </section>

            {/* Section 3 */}
            <section className="section">
              <h2>Creative Insights</h2>
              <p>
                <strong>Fun Sentence:</strong>{" "}
                {vocabulary.fun_sentence || "N/A"}
              </p>
              <p>
                <strong>Word Family:</strong>{" "}
                {vocabulary.word_family?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Rhyming Words:</strong>{" "}
                {vocabulary.rhyming_words?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Real-Life Connection:</strong>{" "}
                {vocabulary.real_life_connection || "N/A"}
              </p>
              <p>
                <strong>Emoji:</strong>{" "}
                {vocabulary.emoji_representation || "N/A"}
              </p>
            </section>

            {/* Section 4 */}
            <section className="section">
              <h2>Examples in Action</h2>
              {vocabulary.examples?.length > 0 ? (
                vocabulary.examples.map((example, index) => (
                  <div className="example-item" key={index}>
                    <p>
                      <strong>Sentence:</strong>{" "}
                      {example.sentence || "No sentence available"}
                    </p>
                    <p>
                      <strong>Reason:</strong>{" "}
                      {example.reason || "No reason provided"}
                    </p>
                  </div>
                ))
              ) : (
                <p>No examples available</p>
              )}
            </section>

            {/* Section 5 */}
            <section className="section">
              <h2>Fun & Application</h2>
              <p>
                <strong>Activity Suggestion:</strong>{" "}
                {vocabulary.activity_suggestion || "N/A"}
              </p>
              <p>
                <strong>Occasions/Events:</strong>{" "}
                {vocabulary.occasions_events?.join(", ") || "N/A"}
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
