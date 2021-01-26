const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto:[], 
        carrinho: [],
        carrinhoAtivo: false,
        mensagemAlerta: "Produto Adicionado",
        alertaAtivo: false,
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        }
    },

    computed: {
        carrinhoTotal() {
            let total = 0;
            if(this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco;
                })
            }
            return total;
        }
    },
    methods: {
        fetchProdutos() {
            fetch('https://run.mocky.io/v3/d81863fb-8486-4250-aa4d-19da1d678efe')
            .then(r => r.json())
            .then(r => {
                this.produtos = r
            })
        },
        fetchProduto(id){
            fetch('https://run.mocky.io/v3/d81863fb-8486-4250-aa4d-19da1d678efe')
            .then(r => r.json())
            .then(r => {
                this.produto = r;
            })
        },

        clickForaCarrinho({target, currentTarget}) {
            if(target === currentTarget) this.carrinhoAtivo = false;
        },
        adicionarItem(){
            this.produto.estoque--;
            const { id, nome, preco } = this.produto;
            this.carrinho.push({ id, nome, preco });
            this.alerta(`${nome} foi adicionado ao carrinho.`);
        },
        removerItem(index) {
            this.carrinho.splice(index, 1);
        },
        checarLocalStorage (){
            if(window.localStorage.carrinho) {
                this.carrinho = JSON.parse(window.localStorage.carrinho);
            }
        },

        compararEstoque(){
            const items = this.carrinho.filter(({ id }) => id === this.produto.id);
            this.produto.estoque -= items.length;
        },

        alerta(mensagem) {
            this.mensagemAlerta = mensagem;
            this.alertaAtivo = true;
            setTimeout(() => {
                this.alertaAtivo = false;
            }, 2000);
        }

    },
    watch: {
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho);
        }
        
    },

    created() {
        this.fetchProdutos();
        this.checarLocalStorage();
    }
})