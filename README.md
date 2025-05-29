📝 Descrição

Acessível na nuvem: https://gestao-produtores.vercel.app/

Este projeto é um sistema de cadastro de produtores rurais que permite:

Registrar informações de produtores e suas propriedades

Gerenciar dados de áreas cultiváveis e culturas plantadas

Visualizar dados consolidados através de gráficos

✨ Funcionalidades
Cadastro de Produtores:

Dados pessoais (nome, documento CPF/CNPJ)

Informações das propriedades rurais

Controle de áreas (total, agricultável e vegetação)

Registro de culturas plantadas

Gestão de Dados:

Adição, edição e remoção de produtores

Validação de documentos (CPF/CNPJ)

Verificação de consistência de áreas

Visualização:

Gráficos de distribuição por estado

Relatório de culturas mais plantadas

🛠️ Tecnologias Utilizadas
Frontend:

React.js com TypeScript

Context API para gerenciamento de estado

Styled Components e SCSS para estilização

Chart.js/Recharts para visualização de dados

Padrões:

Princípios SOLID

Arquitetura limpa e componentes reutilizáveis

🚀 Como Executar o Projeto
Pré-requisitos:

Node.js (v16 ou superior)

npm ou yarn

Instalação:

bash
git clone [URL_DO_REPOSITORIO]
cd [NOME_DO_PROJETO]
npm install
# ou
yarn install
Execução:

bash
npm start
# ou
yarn start
Acesso:
Abra http://localhost:5173 no seu navegador

🏗️ Estrutura do Projeto
src/
├── components/
│   ├── ProducerForm/       # Formulário de cadastro
│   ├── ProducerList/       # Listagem e gestão
│   └── Charts/             # Componentes de gráficos
├── contexts/
│   └── ProducersContext.ts # Gerenciamento de estado
├── types/
│   └── producerTypes.ts    # Tipos TypeScript
├── styles/                 # Estilos globais
└── App.tsx                 # Componente principal