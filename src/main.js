import "./style.css";
import { lerNomeUsuario, lerToken, sair } from "./api.js";
import { telaCriancas } from "./pages/criancas.js";
import { telaOficinas } from "./pages/oficinas.js";
import { telaLogin } from "./pages/login.js";

const app = document.querySelector("#app");

function mostrarApp() {
  app.innerHTML = `
    <header class="topo">
      <strong>ONG Criança Feliz</strong>
      <nav>
        <button data-tela="criancas">Crianças</button>
        <button data-tela="oficinas">Oficinas</button>
      </nav>
      <span class="usuario"></span>
      <button id="sair" class="secundario">Sair</button>
    </header>
    <div id="conteudo"></div>
  `;

  app.querySelector(".usuario").textContent = `Olá, ${lerNomeUsuario() || "Voluntário"}`;
  const conteudo = app.querySelector("#conteudo");
  const telas = { criancas: telaCriancas, oficinas: telaOficinas };

  for (const botao of app.querySelectorAll("nav button")) {
    botao.onclick = () => {
      for (const b of app.querySelectorAll("nav button")) b.classList.remove("ativo");
      botao.classList.add("ativo");
      telas[botao.dataset.tela](conteudo);
    };
  }

  app.querySelector("#sair").onclick = () => {
    sair();
    iniciar();
  };

  // Abre a tela de crianças por padrão
  app.querySelector('nav button[data-tela="criancas"]').classList.add("ativo");
  telaCriancas(conteudo);
}

function iniciar() {
  if (lerToken()) mostrarApp();
  else telaLogin(app, mostrarApp);
}

iniciar();
