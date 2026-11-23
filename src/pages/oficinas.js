import { listarOficinas } from "../api.js";
import { celula, mensagem } from "../ui.js";

export async function telaOficinas(raiz) {
  raiz.innerHTML = `
    <section>
      <h2>Oficinas e Atividades</h2>
      <div class="cartao">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Oficina</th>
              <th>Descrição</th>
              <th>Vagas</th>
              <th>Carga Horária</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="tabela-oficinas">
            <tr><td colspan="6">Carregando oficinas...</td></tr>
          </tbody>
        </table>
        <p id="msg-oficina" class="mensagem" hidden></p>
      </div>
    </section>
  `;

  const corpoTabela = raiz.querySelector("#tabela-oficinas");
  const msg = raiz.querySelector("#msg-oficina");

  try {
    const oficinas = await listarOficinas();
    corpoTabela.innerHTML = "";
    if (oficinas.length === 0) {
      corpoTabela.innerHTML = "<tr><td colspan='6'>Nenhuma oficina cadastrada.</td></tr>";
      return;
    }
    for (const o of oficinas) {
      const linha = document.createElement("tr");
      celula(linha, o.id_oficina);
      celula(linha, o.nome);
      celula(linha, o.descricao || "-");
      celula(linha, o.vagas_maximas);
      celula(linha, `${o.carga_horaria}h`);
      celula(linha, o.status);
      corpoTabela.append(linha);
    }
  } catch (err) {
    mensagem(msg, "Erro ao carregar oficinas: " + err.message);
  }
}
