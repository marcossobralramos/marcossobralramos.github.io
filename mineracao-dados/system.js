$(document).ready(function(){
    
    $("#btnAddProduct").click(function(){
        var name = $("#nameProduct").val();
        if(addProduct(name)){
            $("#nameProduct").val('');
            loadProductInAddTransaction(name);
            addCardProduct(name);
            $(".alert-produtos").hide();
            $("#btnAddTransaction").show();
        }else{
            // Exibir alerta obrigando a informar o nome do produto
        }
    });

    $("#btnAddTransaction").click(function(){
        if(addTransaction())
            minerarDados();
        $("#alertTransaction").hide();
    });

    $("#alertGeral").hide();
    $("#btnAddTransaction").hide();

});

// Adiciona um card com informações do suporte e confiança de um produto
function addCardProduct(name){
    var card = '<div class="card mb-4 box-shadow"><div class="card-header">';
    card += '<h4 class="text-muted">' + name +'</h4>';
    card += '</div><div class="card-body"><h5 class="card-title pricing-card-title">Suporte</h5>';
    card += '<ul class="list-unstyled mt-3 mb-4" id="suporte' + name + '"></ul>';
    card += '</div><div class="card-body"><h5 class="card-title pricing-card-title">Confiança</h5>';
    card += '<ul class="list-unstyled mt-3 mb-4" id="confianca' + name + '"></ul>';
    card += '</div></div>';
    $("#cardMineracao").append(card);
}

// Carrega um produto para lista de inclusão de transação
function loadProductInAddTransaction(name){
    if(name){
        var label = "<label>" + name + "</label>";
        var product = "<div class='input-group mb-3 col-sm-4 product-to-add'>" + label + "<select class='form-control form-control-sm'><option value='1'>SIM</option><option value='0'>NÃO</option></div>";
        $("#divAddTransaction").append(product);
    }
}

// Adiciona um produto na tabela de transações
function addProduct(name){
    if(name){
        $("#products").append('<td scope="col">'+ name + '</td>');
        return true;
    }
    return false;
}

// Adiciona uma transação na tabela de transações
function addTransaction(){
    var tid = $("#tBodyTransaction th").length + 1;
    var products = $("#divAddTransaction .product-to-add");
    var tr = "<tr><th scope='row'>" + tid + "</th>";
    products.each(function(){
        var text = $(this).find('select option:selected').text();
        var val = $(this).find('select option:selected').val();
        tr += "<td value='" + val + "'>" + text + "</td>";
    });
    tr += "</tr>";
    $("#tBodyTransaction").append(tr);
    return true;
}