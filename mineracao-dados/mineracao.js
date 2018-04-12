// Função para calcular suporte e confiança das relações de um produto
function minerarDados(){
    var products = $("#products").find('td');
    var productsNames = new Array();
    products.each(function(){
        productsNames.push($(this).text());
    });
    var transactions = $("#tBodyTransaction tr");
    for(var xCont = 0; xCont < productsNames.length; xCont++){
        for(var yCont = 0; yCont < productsNames.length; yCont++){
            if(xCont != yCont){
                var suporte = getSuporte(xCont, yCont, transactions);
                addInfoOnCard(productsNames[xCont], productsNames[yCont], suporte, 'suporte');
                var confianca = getConfianca(xCont, yCont, transactions);
                addInfoOnCard(productsNames[xCont], productsNames[yCont], confianca, 'confianca');
            }
        }
    }
}

// Adiciona na card view o suporte ou confiança da relação do produto x e y
function addInfoOnCard(productX, productY, value, type){
    var card = $("#" + type + productX);
    if($(card).find('li#li' + productY).length === 0){
        var li = '<li id="li' + productY + '">' + productY + ': ' + value + '</li>';
        $(card).append(li);
    }else
        $(card).find("li#li" + productY).html(productY + ': ' + value);
}

// Calcula o suporte de dois produtos em todas transações (x => y)
function getSuporte(x, y, transactions){
    var suporte = 0;
    for(var cont = 0; cont < transactions.length; cont++){
        var produtos = $(transactions[cont]).find('td');
        if($(produtos[x]).attr('value') === '1' && $(produtos[y]).attr('value') === '1')
            suporte++;
    }
    return (transactions.length == 0) ? 0.00 : (suporte / transactions.length).toFixed(2);
}

// Calcula o suporte de dois produtos em todas transações (x => y)
function getConfianca(x, y, transactions){
    var confianca = 0;
    var registerWithX = 0;
    for(var cont = 0; cont < transactions.length; cont++){
        var produtos = $(transactions[cont]).find('td'); // Produtos de uma transação
        if($(produtos[x]).attr('value') === '1'){
            registerWithX++;
            if($(produtos[y]).attr('value') === '1')
                confianca++;
        }
    }
    return (registerWithX == 0) ? 0.00 : (confianca / registerWithX).toFixed(2)
}