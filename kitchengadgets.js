//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
 
//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;
 
//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/kitchengadgets',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});
 
//criando a model/collection do seu projeto- começo da model usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
 
//configurando os roteamentos da model usuario
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha
 
    //testando se todos os campos foram preenchidos
    if(email == null || senha == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    }
 
    //teste mais importante da ac
    const emailExiste = await Usuario.findOne({email:email});
 
    if(emailExiste){
        return res.status(400).json({error : "Esse email já está registrado no sistema."});
    }
 
    //como fica no postman pra add
    const usuario = new Usuario({
        email : email,
        senha : senha
    })
 
 
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});

//criando a segunda model id_produtocozinha	Descrição	Marca	Data fabricação	Quantidade estoque
const ProdutocozinhaSchema = new mongoose.Schema({
    id_produtocozinha: {type : String, required : true},
    Descricao: {type : String, required : true},
    Marca: {type : String, required : true},
    Datafabricacao	: {type : Date, required : true},
    Quantidadeestoque: {type : Number, required : true},
});

const Produtocozinha = mongoose.model("Produto De Cozinha", UsuarioSchema);
 
//configurando os roteamentos da model usuario
app.post("/cadastroprodutocozinha", async(req, res)=>{
    id_produtocozinha = req.body.id_produtocozinha ,
    Descricao = req.body.Descricao,
    Marca = req.body.Marca ,
    Datafabricacao = req.body.Datafabricacao,
    Quantidadeestoque = req.body.Quantidadeestoque
 
    //testando se todos os campos foram preenchidos
    if(id_produtocozinha == null ||	Descricao == null || Marca == null ||	Datafabricacao == null ||	Quantidadeestoque == null ){
        return res.status(400).json({error : "Preencher todos os campos"});
    }
 
    //teste mais importante da ac
    const id_produtocozinhaExiste = await Produtocozinha.findOne({id_produtocozinha:id_produtocozinha});
 
    if(id_produtocozinhaExiste){
        return res.status(400).json({error : "Esse produto já foi cadastrado no sistema."});
    }
 
    //como fica no postman pra add
    const produtocozinha = new Produtocozinha({
        id_produtocozinha: id_produtocozinha ,
        Descricao: Descricao,
        Marca:  Marca ,
        Datafabricacao: Datafabricacao,
        Quantidadeestoque:  Quantidadeestoque
    })
 
 
    try{
        const newProdutocozinha = await produtocozinha.save();
        res.json({error : null, msg : "Produto cadastrado", produtocozinhaId : newProdutocozinha._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});

//rota raiz - inicio do inw por causa da pág html
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});
 
//configurando a porta - pra ler que vc ta usando a porta 3000 no mongo e no postman
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});