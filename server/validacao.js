// Validações de entrada da API
export function validarLogin(dados) {
  if (!dados.email || !dados.senha) return "Informe e-mail e senha";
  return null;
}
