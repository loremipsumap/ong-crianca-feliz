import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="card">
    <h1>ONG Criança Feliz</h1>
    <p class="subtitle">Projeto Integrador Extensionista II</p>
    <hr />
    <p><strong>Status da API:</strong> <span id="api-status">Carregando...</span></p>
    <p><strong>Data e hora:</strong> <span id="api-time">-</span></p>

    <div class="json-box">
      <p class="json-title">Resposta da API (JSON):</p>
      <pre id="api-json">Carregando...</pre>
    </div>
  </div>
`;

fetch("/api/health")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#api-status").textContent = data.status;
    document.querySelector("#api-time").textContent = new Date(
      data.timestamp
    ).toLocaleString("pt-BR");
    document.querySelector("#api-json").textContent = JSON.stringify(
      data,
      null,
      2
    );
  })
  .catch((error) => {
    document.querySelector("#api-status").textContent = "Erro ao conectar";
    document.querySelector("#api-json").textContent =
      "Erro na requisição: " + error.message;
    console.error("Erro na requisição:", error);
  });
