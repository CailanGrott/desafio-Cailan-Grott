class CaixaDaLanchonete {

    calcularValorDaCompra(formaDePagamento, itens) {

        const menu = {
            cafe: 3.00, chantily: 1.50, suco: 6.20, sanduiche: 6.50,
            queijo: 2.00, salgado: 7.25, combo1: 9.50, combo2: 7.50,
        };
        const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];
        const itensPrincipais = itens.map(itemInfo => itemInfo.split(',')[0]);
        const itensExtras = itensPrincipais.filter(item => item === 'chantily' || item === 'queijo');
        const descontoPorcentagem = 0.95;
        const acrescimoPorcentagem = 1.03;

        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let mensagemErro = '';

        itens.forEach(itemInfo => {
            const [item, quantidade] = itemInfo.split(',');
            if (!menu.hasOwnProperty(item)) {
                mensagemErro = "Item inválido!";
            } else if (quantidade <= 0) {
                mensagemErro = "Quantidade inválida!";
            } else {
                const valorItem = menu[item] * quantidade;
                total += valorItem;
            }
        });

        if (mensagemErro) {
            return mensagemErro;
        }

        itensExtras.forEach(itemExtra => {
            const itemPrincipal = itemExtra === 'chantily' ? 'cafe' : 'sanduiche';
            if (!itensPrincipais.includes(itemPrincipal)) {
                mensagemErro = "Item extra não pode ser pedido sem o principal";
            }
        });

        if (mensagemErro) {
            return mensagemErro;
        }

        if (formaDePagamento === 'dinheiro') {
            total *= descontoPorcentagem;
        } else if (formaDePagamento === 'credito') {
            total *= acrescimoPorcentagem;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export {CaixaDaLanchonete};
