# Instalação do React

Este é um guia passo a passo para instalar o `React`.

## Pré-requisitos
Para instalar o `React`, você precisará de:

Um computador com Windows, macOS ou Linux
Um editor de texto, como o Visual Studio Code ou o Sublime Text
O Node.js e o npm
Instalando o Node.js e o npm
O Node.js é uma plataforma JavaScript de código aberto que permite executar JavaScript fora do navegador. O npm é um gerenciador de pacotes para o Node.js.

Para instalar o Node.js e o npm, siga as instruções para o seu sistema operacional:

## Windows

Baixe o instalador do Node.js da página de download do Node.js.
Execute o instalador e siga as instruções na tela.
macOS

Abra o Terminal.
Execute o seguinte comando:
brew install node
Linux

Abra um terminal.
Execute o seguinte comando:
sudo apt install nodejs
Verificando a instalação
Depois de instalar o Node.js e o npm, você pode verificar se eles estão instalados corretamente executando os seguintes comandos:

## node -v
## npm -v
## Instalando o React
Para instalar o React, execute o seguinte comando no terminal:

npm install react
Este comando instalará o React e todos os pacotes necessários para usá-lo.

Exemplo de uso
Para criar um exemplo de uso do React, crie um novo arquivo chamado index.js e adicione o seguinte código:

````JavaScript
import React from 'react';

function App() {
  return (
    <div>
      <h1>Meu primeiro React</h1>
    </div>
  );
}

export default App;
Use o código com cuidado. Saiba mais
Para executar o exemplo, abra o terminal no diretório do arquivo index.js e execute o seguinte comando:

## npm start
Este comando iniciará um servidor de desenvolvimento local que você pode usar para visualizar o exemplo.

## Conclusão
Após a instalação, você estará pronto para começar a desenvolver aplicações React.
