/*
Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
    - atualizar o contador
    - adicionar o produto no localStorage
    - atualizar a tabela HTML do carrinho

Objetivo 2 - remover produtos do carrinho:
    - ouvir o botão de deletar
    - remover do localStorage
    - atualizar o DOM e o total

Objetivo 3 - atualizar valores do carrinho:
    - ouvir mudanças de quantidade
    - recalcular total individual
    - recalcular total geral
*/

/*
Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
    - atualizar o contador
    - adicionar o produto no localStorage
    - atualizar a tabela HTML do carrinho*/
const botoesAdicionarAoCarrinho = document.querySelectorAll(
  ".adicionar-ao-carrinho"
);
console.log(botoesAdicionarAoCarrinho);

// Objetivo 2 - remover produtos do carrinho:
// - ouvir o botão de deletar
// - remover do localStorage
// - atualizar o DOM e o total
botoesAdicionarAoCarrinho.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    // Objetivo 3 - atualizar valores do carrinho:
    // - ouvir mudanças de quantidade
    // - recalcular total individual
    // - recalcular total geral
    const elementoProduto = evento.target.closest(".produto");
    const produtoId = elementoProduto.dataset.id;
    const produtoNome = elementoProduto.querySelector(".nome").textContent;
    const produtoImagem = elementoProduto
      .querySelector("img")
      .getAttribute("src");
    const produtoPreco = parseFloat(
      elementoProduto
        .querySelector(".preco")
        .textContent.replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );

    //buscar lista de produtos do localStorage
    const carrinho = obterProdutosDoCarrinho();
    //testar se o produto já existe no carrinho
    const existeProduto = carrinho.find((produto) => produto.id === produtoId);
    if (existeProduto) {
      existeProduto.quantidade += 1;
    } else {
      //adicionar o produto
      const produto = {
        id: produtoId,
        nome: produtoNome,
        imagem: produtoImagem,
        preco: produtoPreco,
        quantidade: 1,
      };

      carrinho.push(produto);
    }
    salvarProdutosNoCarrinho(carrinho);
    atualizarContadorCarrinho();
    renderizarTabelaDoCarrinho();
  });
});

function salvarProdutosNoCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
  const produtos = localStorage.getItem("carrinho");
  return produtos ? JSON.parse(produtos) : [];
}

//passo 4 atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
  const produtos = obterProdutosDoCarrinho();
  let total = 0;

  produtos.forEach((produto) => {
    total += produto.quantidade;
  });
  document.getElementById("contador-carrinho").textContent = total;
}
atualizarContadorCarrinho();

//passo 5 - renderizar os produtos do carrinho de compras
function renderizarTabelaDoCarrinho() {
  const produtos = obterProdutosDoCarrinho();
  const corpoTabela = document.querySelector("#modal-1-content table tbody");
  corpoTabela.innerHTML = ""; //limpar tabela antes de renderizar

  produtos.forEach((produto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="td-produto">
    <img 
    src="${produto.imagem}" 
    alt="${produto.nome}">
    </td>
    <td>${produto.nome}</td>
    <td class="td-preco-unitario">R$ ${produto.preco
      .toFixed(2)
      .replace(".", ",")}</td>
    <td class="td-quantidade"><input type="number" value="${
      produto.quantidade
    }" min="1"></td>
    <td class="td-total">R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
    <td><button class="btn-remover" data-id= "${
      produto.id
    }" id="deletar"></button></td>`;

    corpoTabela.appendChild(tr);
  });
}

renderizarTabelaDoCarrinho();

//oBJETIVO 2 - remover produtos do carrinho
// passo 1 - pegar o botão de deletar do HTML

const corpoTabela = document.querySelector("#modal-1-content table tbody");
corpoTabela.addEventListener("click", (evento) => {




  if (evento.target.classList.contains("btn-remover")) {
    const id = evento.target.dataset.id;
    removerProdutoDoCarrinho(id);
  }
});

function removerProdutoDoCarrinho(id){
  const produtos = obterProdutosDoCarrinho();
 

  //filtra os produtos que não tem o id passado por paremetro
  const carrinhoAtualizado = produtos.filter(produto => produto.id !==id);
 
  salvarProdutosNoCarrinho(carrinhoAtualizado)
  atualizarContadorCarrinho();
  renderizarTabelaDoCarrinho();
}


