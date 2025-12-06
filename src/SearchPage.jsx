import { useState } from "react";
import axios from "axios";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [department, setDepartment] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            // Include department in query parameters
            const response = await axios.get(`http://localhost:8080/search?q=${encodeURIComponent(query)}&m=${encodeURIComponent(department)}`);
            const resArray = Object.keys(response.data).map(key => response.data[key]);
            setResults(resArray);
        } catch (err) {
            setError("Failed to fetch results.");
        } finally {
            setLoading(false);
        }
    };

return (
    <div style={styles.container}>
        <h1 style={styles.logo}>Rajpatra</h1>

        <form onSubmit={handleSearch} style={styles.form}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />

            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={styles.select}
            >
                <option value="" selected>All</option>
                <option value="mofa">Ministry of Foreign Affairs</option>
                <option value="moha">Ministry of Home Affairs</option>
                <option value="doe">Department of Education</option>
                <option value="moe">Ministry of Education</option>
            </select>

            <button type="submit" style={styles.button}>Search</button>
        </form>

        <div style={styles.resultContainer}>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {results.map((res, idx) => (
                <div key={idx} style={styles.resultCard}>
                    <a href={res.url} target="_blank" rel="noopener noreferrer" style={styles.resultLink}>
                        {res.title}
                    </a>
                    <p style={styles.resultUrl}>{res.url}</p>
                </div>
            ))}
        </div>
    </div>
);

}

const styles = {
container: {
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "flex-start",
minHeight: "100vh",
backgroundColor: "#f2f2f2",
padding: "40px 20px",
},
logo: {
fontSize: "4rem",
fontWeight: "bold",
marginBottom: "2rem",
color: "#333",
},
form: {
display: "flex",
maxWidth: "600px",
width: "100%",
borderRadius: "999px",
overflow: "hidden",
boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
marginBottom: "20px",
},
input: {
flexGrow: 1,
padding: "12px 20px",
border: "none",
outline: "none",
fontSize: "1rem",
},
select: {
padding: "12px 16px",
border: "none",
outline: "none",
fontSize: "1rem",
cursor: "pointer",
backgroundColor: "#fff",
color: "#333",
},
button: {
padding: "12px 20px",
border: "none",
backgroundColor: "#1a73e8",
color: "white",
fontWeight: "bold",
cursor: "pointer",
transition: "background-color 0.2s",
},
resultContainer: {
maxWidth: "600px",
width: "100%",
},
resultCard: {
backgroundColor: "white",
padding: "16px",
borderRadius: "8px",
boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
marginBottom: "12px",
},
resultLink: {
fontSize: "1.1rem",
fontWeight: "bold",
color: "#1a0dab",
textDecoration: "none",
},
resultUrl: {
fontSize: "0.9rem",
color: "#006621",
marginTop: "4px",
},
};
