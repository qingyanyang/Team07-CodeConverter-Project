import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

function App() {
  const [sourceCode, setSourceCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [targetLanguage, setTargetLanguage] = useState("python");

  const handleTranslate = () => {
    // Call your translation API here, then update the translatedCode state
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Online Code Translator
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <InputLabel>Source Language</InputLabel>
          <Select
            fullWidth
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {/* Add your supported languages here */}
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
          <TextField
            fullWidth
            multiline
            rows={12}
            variant="outlined"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            style={{ marginTop: "1rem" }}
          />
        </Grid>

        <Grid item xs={2} container alignItems="center" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleTranslate}>
            Translate
          </Button>
        </Grid>

        <Grid item xs={5}>
          <InputLabel>Target Language</InputLabel>
          <Select
            fullWidth
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {/* Add your supported languages here */}
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
          <TextField
            fullWidth
            multiline
            rows={12}
            variant="outlined"
            value={translatedCode}
            readOnly
            style={{ marginTop: "1rem" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
