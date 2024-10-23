class Calculadora{
    constructor(){
        this.operacao=document.querySelector('#operacao');
        this.resultado=document.querySelector('#resultado');
        this.resetar=0;
    }

    limparValores(){
        this.operacao.textContent=0;
        this.resultado.textContent=0;
    }

    checarUltimoDigito(input,operacao,reg){
        if((
            !reg.test(input) &&
            !reg.test(operacao.substr(operacao.length - 1))
          )) {
            return true;
          } else {
            return false;
          }
    }      
    
    somar(n1,n2){
        return parseFloat(n1) + parseFloat(n2)
    }

    divisao(n1,n2){
        return parseFloat(n1) / parseFloat(n2)
    }

    subtrair(n1,n2){
        return parseFloat(n1) - parseFloat(n2)
    }

    multiplicacao(n1,n2){
        return parseFloat(n1) * parseFloat(n2)
    }
    
    recarregarValores(resultado){
        this.operacao.textContent= resultado
        this.resultado.textContent= resultado
    }

    resolver(){
        //explode uma string em um um array
        let operacaoArray = (this.operacao.textContent).split(' ')
        let resultado =0 

        for(let i = 0; i<=operacaoArray.length;i++){

            let operacao = 0;
            let numeroAtual=operacaoArray[i]

            // faz a multiplicacao
            if(numeroAtual ==='x'){
                resultado = calc.multiplicacao(operacaoArray[i -1] ,operacaoArray[i +1])
                operacao=1;
                
            }else if(numeroAtual ==='/'){
                resultado = calc.divisao(operacaoArray[i -1] ,operacaoArray[i +1])
                operacao=1;
            }
            //checa se nao tem mais multiplicação e divisao no array
            else if(!operacaoArray.includes('x') && !operacaoArray.includes('/') ){
                if(numeroAtual ==='+'){
                    resultado = calc.somar(operacaoArray[i -1] ,operacaoArray[i +1]);
                    operacao=1;
                    
                }else if(numeroAtual ==='-'){
                    resultado = calc.subtrair(operacaoArray[i -1] ,operacaoArray[i +1]);
                    operacao=1;
                }
            }

            //atualiza valores do array para proxima interação
            if(operacao){
                //indice anterior no resultado da operação
                operacaoArray[i -1] = resultado;
                //remove os itens ja utilizados da operação
                operacaoArray.splice(i , 2)
                //atualizar o valor do indice
                i=0;
            }
        }
        if(resultado){
            calc.resetar=1
        }


        calc.recarregarValores(resultado)
                
    }

    clickBtn(){

        let input = this.textContent;//texto dentro do botao
        let  operacao = calc.operacao.textContent;
        

        //verificar se tem numeros
        var reg= new RegExp('^\\d+$')


        // se precisar resetar limpa o display
        if(calc.resetar && reg.test(input)){
            operacao= '0'
        }

        calc.resetar = 0


        // add limpar valores
        if(input=='AC'){
            calc.limparValores()
        }else if(input==='='){
            calc.resolver()
        } else {
        
        
            //checa se precisa add ou nao
            if(calc.checarUltimoDigito(input,operacao,reg)){
                return false;
            }

            //add espaços aos operadores
            if(!reg.test(input)){
                input =` ${input} `
            }

            if(operacao=== '0'){
                if(reg.test(input)){
                calc.operacao.textContent = input;
                }
            }else{
                calc.operacao.textContent += input;
            }

        }
        
        
    }

    
    
    
    
}
// inicicar obj
let calc=new Calculadora()

// iniciar botoes
let botoes = document.querySelectorAll('.btn')


//map todos os botoes

for(let i=0; botoes.length>i;i++){
    botoes[i].addEventListener('click', calc.clickBtn)
}