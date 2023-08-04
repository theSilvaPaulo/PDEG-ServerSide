const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "projeto",
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.post("/api/register",(req,res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    const sqlInsert = "INSERT INTO `alunos` (`email`,`senha`) VALUES (?,?);"
    db.query(sqlInsert,[email,senha],(err,result)=>{
        res.send(result);
    });

});

app.post("/api/login",(req,res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    const sqlSelect = "SELECT * FROM alunos WHERE email = ? AND senha = ?;"
    db.query(sqlSelect,[email,senha],
        (err,result) => {
        
        if(err){
            res.send({ err: err})
        }
        if(result.length>0){
            res.send(result);
        }else{
            res.send({ message: "COMBINACAO ERRADA!"});
        }

    });

});

app.post("/api/checkAccount",(req,res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    const sqlSelect = "SELECT * FROM alunos WHERE email = ? AND senha = ?;"
    db.query(sqlSelect,[email,senha],(err,result) => {
        res.send(result);
    });
});

app.post("/api/check",(req,res) => {

    const idAluno = req.body.idAluno;
    const idDisciplina = req.body.idDisciplina;

    const sqlSelect = "SELECT * FROM `disciplinas_feitas` WHERE id_aluno = ? AND id_disciplina = ?;"
    db.query(sqlSelect,[idAluno,idDisciplina],(err,result) => {
        res.send(result);
    });

});

app.post("/api/checkAll",(req,res) => {

    const idAluno = req.body.idAluno;

    const sqlSelect = "SELECT * FROM disciplinas_feitas WHERE id_aluno = ?;"
    db.query(sqlSelect,[idAluno],(err,result) => {
        console.log(err);
        res.send(result);
    });

});

app.post("/api/delete",(req,res) => {

    const idAluno = req.body.idAluno;
    const idDisciplina = req.body.idDisciplina;

    const sqlDelete = "DELETE FROM `disciplinas_feitas` WHERE id_aluno = ? AND id_disciplina = ?;"
    db.query(sqlDelete,[idAluno,idDisciplina],(err,result) => {
        res.send(result);
    });

});

app.post("/api/insert",(req,res) => {

    const idAluno = req.body.idAluno;
    const idDisciplina = req.body.idDisciplina;

    const sqlInsert = "INSERT INTO `disciplinas_feitas` (`id_aluno`,`id_disciplina`) VALUES (?,?);"
    db.query(sqlInsert,[idAluno,idDisciplina],(err,result)=>{
        res.send(result);
    });
});

app.listen(3001, ()=>{
    console.log("servidor rodano na porta 3001");
});

//mysql -u localhost -u root -padmin
//fazer ele abrir de acordo com o BD