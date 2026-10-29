import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="container">
    <header>
      <span class="badge">Projeto Integrador Extensionista II</span>
      <h1>ONG Criança Feliz</h1>
      <p class="subtitle">Apoio, acolhimento e desenvolvimento para a infância</p>
    </header>

    <main>
      <div class="card status-card">
        <h2>Verificação de Conexão</h2>
        <div id="api-result" class="loading">
          <p>Conectando à API...</p>
        </div>
      </div>
    </main>

    <footer>
      <p>Desenvolvido com Vite+ e Express · Atividade 1</p>
    </footer>
  </div>
`;

async function checkApiHealth() {
  const resultDiv = document.querySelector("#api-result");
  try {
    const response = await fetch("/api/health");
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    const formattedDate = new Date(data.timestamp).toLocaleString("pt-BR", {
      dateStyle: "full",
      timeStyle: "medium",
    });

    resultDiv.className = "api-ok";
    resultDiv.innerHTML = `
      <div class="status-indicator">
        <span class="pulse-dot"></span>
        <h3 class="status-title">Status da API: <strong>${data.status}</strong></h3>
      </div>
      <p class="timestamp-label">Data e hora da resposta:</p>
      <p class="timestamp-value">${formattedDate}</p>
      <pre class="json-preview">${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (error) {
    resultDiv.className = "api-error";
    resultDiv.innerHTML = `
      <h3>Erro na comunicação com a API</h3>
      <p>${error.message}</p>
      <small>Certifique-se de que o servidor Express está rodando com <code>npm run api</code>.</small>
    `;
  }
}

checkApiHealth();
