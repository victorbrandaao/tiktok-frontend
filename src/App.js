import React, { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState([]);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFollowers = async () => {
    if (!username) {
      setError("Por favor, insira um nome de usuário.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Mock temporário; substitua com a chamada à API do backend mais tarde.
      const response = await fetch(`http://localhost:5000/tiktok/${username}`);
      if (!response.ok) throw new Error("Usuário não encontrado.");

      const data = await response.json();
      setFollowers(data.followers);
      setTotalFollowers(data.total_followers);
    } catch (err) {
      setError(err.message || "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Analisador de Seguidores TikTok
      </h1>

      {/* Seção de Explicação Divertida com o texto original */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">O que é isso?</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Já se perguntou quem anda te seguindo nas redes sociais? Ou melhor, quem <strong>o crush</strong> anda seguindo no TikTok? 😏
          Nosso app é uma ferramenta divertida para dar aquela espiada saudável (ou nem tanto) nos seguidores do TikTok.
          <br />
          🕵️‍♂️ <strong>O que ele faz:</strong>
          <ul className="list-disc ml-6 my-4 space-y-2">
            <li>Você digita o nome de usuário do TikTok de qualquer pessoa.</li>
            <li>Ele puxa a lista de seguidores dessa conta.</li>
            <li>Classifica os seguidores com base no nome (masculino/feminino) – porque né, somos curiosos por natureza!</li>
          </ul>
          Tudo isso com um toque de humor e leveza 😎.
        </p>
      </div>

      {/* Formulário de Busca */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-800 font-medium text-lg">
            Nome de usuário do TikTok
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o nome de usuário..."
            className="mt-2 w-full border-2 border-gray-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500 py-2 px-4"
          />
        </div>

        <button
          onClick={fetchFollowers}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          {loading ? "Buscando..." : "Buscar Seguidores"}
        </button>

        {error && (
          <p className="mt-4 text-red-500 font-semibold text-center">{error}</p>
        )}

        {followers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Total de Seguidores: {totalFollowers}
            </h2>
            <ul className="mt-4 space-y-3">
              {followers.map((follower, index) => (
                <li
                  key={index}
                  className="bg-gray-100 rounded-xl p-4 shadow-md flex justify-between items-center"
                >
                  <span className="text-gray-800 font-medium">{follower.username}</span>
                  <span
                    className={`text-sm font-semibold ${
                      follower.gender === "feminine"
                        ? "text-pink-500"
                        : "text-blue-500"
                    }`}
                  >
                    {follower.gender === "feminine" ? "Feminino" : "Masculino"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
