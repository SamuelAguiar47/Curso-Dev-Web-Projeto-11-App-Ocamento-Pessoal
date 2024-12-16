class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id');

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id'); //null
        return (parseInt(proximoId) + 1);
    }

    gravar(d) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros() {
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id');

        //recuperar todas as despesas cadastradas em localStorage
        for(let i=1; i <= id; i++) {
            let despesa = localStorage.getItem(i);
            
            //verificação da existencia de índices pulados/excluídos

            if(despesa === null) {
                continue;
            }

            despesas.push(JSON.parse(despesa));
        }

        return despesas;
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();

        console.log(despesasFiltradas);
        console.log(despesa);

        //ano
        if (despesa.ano != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
        //mes
        if (despesa.mes != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        //dia
        if (despesa.dia != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }
        //tipo
        if (despesa.tipo != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
        //descrição
        if (despesa.descricao != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }
        //valor
        if (despesa.valor != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }

        console.log(despesasFiltradas);
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');

    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    //console.log(ano, mes, dia, tipo, descricao, valor);

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('tituloModal').innerHTML = 'Registro gravado com sucesso!';
        document.getElementById('divTituloModal').className = 'modal-header text-success';
        document.getElementById('descricaoModal').innerHTML = 'A despesa foi cadastrada com sucesso.';
        document.getElementById('buttonModal').innerHTML = 'Voltar';
        document.getElementById('buttonModal').className = 'btn btn-success';
        $('#modalRegistraDespesa').modal('show');
    } else {
        document.getElementById('tituloModal').innerHTML = 'Erro na gravação!';
        document.getElementById('divTituloModal').className = 'modal-header text-danger';
        document.getElementById('descricaoModal').innerHTML = 'Existem campos obrigatórios não preenchidos.';
        document.getElementById('buttonModal').innerHTML = 'Voltar e corrigir';
        document.getElementById('buttonModal').className = 'btn btn-danger';
        $('#modalRegistraDespesa').modal('show');
    }
}

function carregaListaDespesas() {

    let despesas = Array();

    despesas = bd.recuperarTodosRegistros();

    //Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');

    //Percorrendo o array despesas listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {
        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //Criando as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        //ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;
    });
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa =new Despesa(ano, mes, dia, tipo, descricao, valor);

    bd.pesquisar(despesa);
}