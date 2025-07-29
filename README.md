🚚 Sistema de Controle de Entregas
Um sistema intuitivo e eficiente para gerenciar e monitorar rotas de entrega, desenvolvido com React. Este projeto foi concebido para ser executado localmente, oferecendo controle total sobre suas operações de entrega com dados salvos diretamente no seu navegador.

📖 Sobre o Projeto
Este aplicativo web é uma solução completa para organizar e acompanhar o fluxo de suas entregas. Ele permite o cadastro detalhado de levas, o monitoramento em tempo real do status de cada pedido e a manutenção de um histórico acessível para consulta e exportação. Toda a persistência de dados é feita via localStorage, garantindo que suas informações estejam seguras e disponíveis mesmo após fechar o navegador.

✨ Funcionalidades Principais
Cadastro Simplificado de Levas de Entrega:

Selecione entregadores e veículos de listas pré-definidas.

Associação automática de veículo padrão ao selecionar um entregador.

Defina a quantidade de paradas (rotas) por leva.

Gestão Dinâmica de Pedidos:

Adicione múltiplos clientes e itens a cada leva de entrega.

Acompanhe o status de cada pedido: Pendente, Em Rota, Finalizada ou Cancelada.

Monitoramento e Histórico Completo:

Tela Principal: Visão clara das entregas Ativas (Pendentes e Em Rota).

Arquivo Secreto: Um repositório completo e protegido por senha de todos os pedidos já criados, incluindo finalizados, cancelados e aqueles removidos da lista ativa.

Registro de Tempo: Cálculo automático do tempo total de rota (do início ao fim).

Filtros Avançados e Busca:

Filtre entregas por Data, Status (com múltiplas seleções) e Nome do Cliente em ambas as telas (principal e arquivo).

Exportação de Dados:

Exporte facilmente os dados filtrados da tela de "Arquivo" para um arquivo .CSV, compatível com Excel e outras planilhas.

Persistência de Dados Local:

Todas as informações são salvas de forma segura no localStorage do navegador, assegurando que nenhum dado seja perdido.

🚀 Tecnologias Utilizadas
React.js: A biblioteca principal para a construção da interface de usuário dinâmica.

CSS3: Estilização customizada e responsiva dos componentes.

HTML5: A estrutura fundamental da aplicação.

JavaScript (ES6+): A lógica robusta por trás de todas as funcionalidades.

localStorage API: Gerenciamento da persistência de dados no lado do cliente.

⚙️ Como Rodar o Projeto
Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO]
Navegue até a pasta do projeto:

Bash

cd sistema-entregas
Instale as dependências:

Bash

npm install
Inicie o servidor de desenvolvimento:

Bash

npm start
A aplicação será aberta automaticamente no seu navegador padrão em http://localhost:3000.

🗂️ Estrutura do Projeto
O código-fonte principal da aplicação está organizado na pasta src/:

App.js: O componente raiz que encapsula a lógica central da aplicação, gerenciamento de estado e componentes de tela.

App.css: Contém as regras de estilização globais e específicas para os componentes.

index.js: O ponto de entrada principal da aplicação React.

A pasta public/ armazena os arquivos estáticos essenciais:

index.html: O template HTML base da aplicação.

manifest.json: Define metadados para a Progressive Web App (PWA).

favicon.ico: O ícone da aplicação exibido na aba do navegador.

🔮 Possíveis Melhorias Futuras
Backend e Banco de Dados: Migrar a persistência de dados do localStorage para um banco de dados (e.g., Firebase, PostgreSQL, MongoDB) com uma API RESTful, permitindo o uso multiusuário e acesso em diferentes dispositivos.

Autenticação de Usuários: Implementar um sistema de login para autenticação de entregadores e administradores.

Relatórios Gráficos: Desenvolver dashboards interativos com gráficos para análise visual da performance das entregas.