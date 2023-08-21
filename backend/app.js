const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require('cors'); 



const app = express();
app.use(express.static('public')); 
app.use(cors());


// Configurações de conexão com banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projeto-integrado-2",
});


// Conectar ao banco de dados
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    console.log("Conectando ao banco de dados...");
    connection.connect((err) => {
      if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        reject(err);
      } else {
        console.log("Conexão ao banco de dados estabelecida com sucesso.");
        resolve();
      }
    });
  });
}

// Rota raiz
app.get("/", (req, res) => {
  res.send("Servidor está funcionando corretamente.");
});

// Rota para obter todos os filmes
app.get("/filmes", async (req, res) => {
  try {
    const[rows] = await connection.promise().query("SELECT * FROM filmes");
     if ( rows.length > 0){
      res.json(rows);
     } else {
      res.status(404).json({ error: "Nenhum filme encontrado "});
     }
  } catch (error){
    console.error("Error na consulta ao banco de dados:",error);
    res.status(500).json({error:"Errro na requisição"});
  }
  
});





// Rota para obter todos os filmes
app.get("/filmes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await connection.promise().query("SELECT * FROM filmes WHERE id = ?", [id]);

    if (rows.length > 0) {
      const filme = rows[0];
      res.json(filme);
    } else {
      res.status(404).json({ error: "Filme não encontrado" });
    }
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro na requisição" });
  }
});

// ROTA PARA OBTER A DESCRIÇÃO DO FILME PELO ID
app.get("/filme/:id/descricao", async (req, res) => {
  const id = req.params.id;
  console.log(id)

  try {
    const [rows] = await connection.promise().query("SELECT descricao FROM filmes WHERE id = ?", [id]);

    if (rows.length > 0) {
      const descricao= rows[0] .descricao;
      res.json({ descricao});
    } else {
      res.status(404).json({ error: "Descrição do Filme não encontrada" });
    }
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro na requisição" });
  }
});



// Rota para inserir um novo filme
app.post("/filmes", express.json(), async (req, res) => {

  try {
    const  filme = req.body;
    const { titulo, 
          classificacao, 
          anoDeLancamento,
          urlImagem, 
          descricao } = req.body;

    if    (!titulo || !classificacao || !anoDeLancamento || !urlImagem || !descricao ) {
      res.status(400).json({ error: "Todos os campos são obrigatórios." });
      return;
    }
   
    const query =
      "INSERT INTO filmes (titulo, classificacao, anoDeLancamento, urlImagem ,descricao) VALUES (?, ?, ?, ?, ?)";
    await connection
      .promise()
      .query(query, [titulo,classificacao, anoDeLancamento, urlImagem, descricao,]);

      // Envie uma resposta positiva para o cliente
    res.json({ message: "Novo filme criado com sucesso." });


  } catch (error) {
    console.error("Erro ao executar a consulta:", error);
    res.status(500).json({ error: "Erro ao inserir novo filme." });
  }
});

// Rota para salvar avaliação do filme
app.post("/avaliar-filme/:id", async (req, res) => {
  try {
    const filmeId = req.params.id;
    const avaliacao = req.body.avaliacao; // Avaliação do usuário (1 a 5 estrelas)

    const query = "INSERT INTO avaliacoes (filme_id, avaliacao) VALUES (?, ?)";
    await connection.promise().query(query, [filmeId, avaliacao]);
    res.sendStatus(200); // Envie uma resposta de sucesso
  } catch (error) {
    console.error("Erro ao salvar avaliação do filme:", error);
    res.status(500).json({ error: "Erro ao salvar avaliação do filme." });
  }
});




// Correção /filmes/:id
app.patch("/filmes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, classificacao, anoDeLancamento, urlImagem, descricao } = req.body;

    // Verifica se pelo menos um campo deve ser fornecido para atualizar.
    if (!titulo && !classificacao && !anoDeLancamento && !urlImagem && !descricao) {
      res.status(400).json({ error: "Pelo menos um campo deve ser fornecido para atualizar." });
      return;
    }

    // Busca os dados de filmes existentes no banco de dados
    const selectQuery = "SELECT * FROM filmes WHERE id = ?";
    const [rows] = await connection.promise().query(selectQuery, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Filme não encontrado." });
      return;
    }

    const updatedData = {
     
      titulo: titulo || rows[0].titulo,
      classificacao: classificacao || rows[0].classificacao,
      anoDeLancamento: anoDeLancamento || rows[0].anoDeLancamento,
      urlImagem: urlImagem || rows[0].urlImagem,
      descricao: descricao || rows[0].descricao,
    };
    
    const updateQuery = "UPDATE filmes SET ? WHERE id = ?";
    await connection.promise().query(updateQuery, [updatedData, id]);

    res.json({ message: "Filme atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao executar a consulta:", error);
    res.status(500).json({ error: "Erro ao atualizar o filme." });
  }
});


//colocar/filmes/:id
app.put("/filmes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, classificacao, anoDeLancamento, urlImagem, descricao } = req.body;

    // Verifica se todos os campos são fornecidos para uma atualização completa
    if (!titulo || !classificacao || !anoDeLancamento || !urlImagem || !descricao) {
      res.status(400).json({ error: "Todos os campos são obrigatórios para a atualização completa." });
      return;
    }

    // Busca os dados do filme existente no banco de dados
    const selectQuery = "SELECT * FROM filmes WHERE id = ?";
    const [rows] = await connection.promise().query(selectQuery, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Filme não encontrado." });
      return;
    }

     const updatedData = {
      titulo: titulo || rows[0].titulo,
      classificacao: classificacao || rows[0].classificacao,
      anoDeLancamento: anoDeLancamento || rows[0].anoDeLancamento,
      urlImagem: urlImagem || rows[0].urlImagem,
      descricao: descricao || rows[0].descricao,
    };

    const updateQuery = "UPDATE filmes SET ? WHERE id = ?";
    await connection.promise().query(updateQuery, [updatedData, id]);

    res.json({ message: "Filme atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao executar a consulta:", error);
    res.status(500).json({ error: "Erro ao atualizar o filme." });
  }
});






app.delete("/filmes/:id", async (req, res) => {
  try {
    const filmeId = req.params.id;
    console.log(`Recebida solicitação para excluir o filme com o ID ${filmeId}...`);
    const query = "DELETE FROM filmes WHERE id = ?";
    await connection.promise().query(query, [filmeId]);
    console.log("Filme excluído com sucesso. Enviando resposta...");
    res.json({ success: true, message: "Filme excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao executar a consulta:", error);
    res.status(500).json({ error: "Erro ao excluir o filme." });
  }
});

// Iniciar o servidor
async function startServer() {

  


  const port = 3000;
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta http://localhost:3000.`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
