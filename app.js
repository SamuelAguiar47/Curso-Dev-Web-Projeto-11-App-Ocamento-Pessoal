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
        //bd.gravar(despesa)
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