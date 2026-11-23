import { cadastrarCrianca, listarCriancas } from "../api.js";
import { celula, mensagem } from "../ui.js";

export async function telaCriancas(raiz) {
  raiz.innerHTML = `
    <section>
      <h2>Crianças Atendidas</h2>
      
      <form id="form-crianca" class="cartao grade">
        <label>Nome da Criança
          <input name="nome" type="text" required placeholder="Ex: Gabriel Souza" />
        </label>
        <label>Data de Nascimento
          <input name="data_nascimento" type="date" required />
        </label>
        <label>Gênero
          <select name="genero">
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
            <option value="Prefiro nao informar">Prefiro não informar</option>
          </select>
        </label>
        <div class="acoes">
          <button type="submit">Cadastrar Criança</button>
        </div>
        <p id="msg-crianca" class="mensagem largo" hidden></p>
      </form>

      <div class="cartao">
        <h3>Lista de Beneficiários</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>Gênero</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody id="tabela-criancas">
            <tr><td colspan="5">Carregando lista...</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  const form = raiz.querySelector("#form-crianca");
  const msg = raiz.querySelector("#msg-crianca");
  const corpoTabela = raiz.querySelector("#tabela-criancas");

  async function carregar() {
    try {
      const criancas = await listarCriancas();
      corpoTabela.innerHTML = "";
      if (criancas.length === 0) {
        corpoTabela.innerHTML = "<tr><td colspan='5'>Nenhuma criança cadastrada ainda.</td></tr>";
        return;
      }
      for (const c of criancas) {
        const linha = document.createElement("tr");
        celula(linha, c.id_crianca);
        celula(linha, c.nome);
        celula(linha, c.data_nascimento ? new Date(c.data_nascimento).toLocaleDateString("pt-BR") : "-");
        celula(linha, c.genero);
        celula(linha, c.responsavel || "Não informado");
        corpoTabela.append(linha);
      }
    } catch (err) {
      mensagem(msg, "Erro ao carregar crianças: " + err.message);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    mensagem(msg, "");
    try {
      await cadastrarCrianca({
        nome: form.nome.value,
        data_nascimento: form.data_nascimento.value,
        genero: form.genero.value,
      });
      mensagem(msg, "Criança cadastrada com sucesso!", "sucesso");
      form.reset();
      await carregar();
    } catch (err) {
      mensagem(msg, err.message);
    }
  });

  await carregar();
}
