import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="card">
    <h1>ONG Criança Feliz</h1>
    <p class="subtitle">Projeto Integrador Extensionista II</p>
    <hr />
    <p><strong>Status da API:</strong> <span id="api-status">Carregando...</span></p>
    <p><strong>Data e hora:</strong> <span id="api-time">-</span></p>
  </div>
`;

fetch("/api/health")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#api-status").textContent = data.status;
    document.querySelector("#api-time").textContent = new Date(
      data.timestamp
    ).toLocaleString("pt-BR");
  })
  .catch((error) => {
    document.querySelector("#api-status").textContent = "Erro ao conectar";
    console.error("Erro na requisição:", error);
  });
