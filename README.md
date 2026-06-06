# Leonardo Serviços Elétricos - Portfólio

## Sobre o Projeto
Este projeto é um portfólio digital para divulgação dos serviços de um eletricista profissional. O objetivo é apresentar os serviços, mostrar fotos reais de trabalhos realizados, facilitar o contato e transmitir confiança ao cliente.

## Funcionalidades Principais
- Apresentação dos serviços com cards interativos
- Galeria de fotos com modal para visualização ampliada
- Formulário de contato com validação e envio por e-mail (Formspree)
- Botão flutuante para contato rápido via WhatsApp
- Modo escuro (Dark Mode) com salvamento de preferência
- Layout totalmente responsivo para desktop, tablet e celular
- Dicas de elétrica para clientes
- Vídeo institucional

## Estrutura de Pastas
- `index.html`: Página principal com HTML, CSS e JavaScript integrados
- `imagens/`: Fotos dos serviços, logo e imagens do site
- `video/`: Vídeos institucionais
- `style.css`: (opcional) CSS externo, caso queira separar do HTML

## Tecnologias Utilizadas
- HTML5 sem frameworks
- CSS3 com variáveis, media queries e dark mode
- JavaScript puro para interatividade
- FontAwesome para ícones
- Google Fonts (Inter)
- Formspree para envio de formulários

## Como Usar
1. Faça o download ou clone este repositório
2. Coloque suas imagens na pasta `imagens/` e vídeos em `video/`
3. Edite os textos, serviços e contatos diretamente no `index.html`
4. Abra o `index.html` no navegador para visualizar
5. Para publicar, envie todos os arquivos para seu servidor ou serviço de hospedagem

## Personalização
- Para adicionar novos serviços: duplique um card de serviço e adicione a descrição no JS
- Para trocar imagens: substitua os arquivos na pasta `imagens/` mantendo o nome ou altere o caminho no HTML
- Para mudar o WhatsApp: altere o número no botão flutuante e no formulário
- Para alterar cores: edite as variáveis CSS em `:root`

## Observações
- Certifique-se de que os nomes dos arquivos de imagem e vídeo estejam corretos (maiúsculas/minúsculas)
- O site é compatível com todos os navegadores modernos
- O formulário não expõe seu e-mail diretamente, usando o Formspree para segurança

## Créditos
Desenvolvido por Leonardo Serviços Elétricos

---

# Explicação Detalhada do Código

## Estrutura Geral
O projeto é um portfólio para um eletricista, com foco em apresentação de serviços, galeria de fotos, formulário de contato e dicas de elétrica. O código está todo no arquivo `index.html`, com CSS embutido e imagens na pasta `imagens/`.

---

## 1. `<head>`
- **Meta tags**: Definem charset (UTF-8 para suportar acentuação), viewport (para responsividade em dispositivos móveis), título da página e SEO (robots).
- **Fontes e ícones**: Importa a fonte Inter do Google Fonts para um visual moderno e o FontAwesome para ícones visuais em botões, cards e navegação.
- **CSS**: Todo o estilo está dentro de `<style>...</style>`, facilitando a manutenção e evitando dependências externas.

---

## 2. CSS (Estilos)
- **Variáveis CSS**: Definidas em `:root` para cores principais, facilitando troca de tema e manutenção visual.
- **Dark Mode**: Quando o body recebe a classe `dark-mode`, as variáveis mudam para tons escuros, tornando o site confortável à noite.
- **Body/Header**: O body tem padding-top para compensar o header fixo. O header é fixo no topo, com gradiente azul/amarelo, sombra e responsividade.
- **Logo/Slogan**: Imagem arredondada com sombra, nome da empresa em destaque e slogan em amarelo.
- **Navegação**: Links estilizados, com hover animado, menu dropdown para serviços, responsivo para telas pequenas.
- **Hero Section**: Seção principal com título grande, parágrafo explicativo, fundo em gradiente, bordas arredondadas e espaçamento generoso. Responsivo para mobile.
- **Cards de Serviços**: Grid responsivo, cada card com ícone, título, descrição e botão "Saiba Mais" que abre modal detalhado.
- **Galeria**: Miniaturas de fotos dos serviços, com hover, modal para ampliar, navegação por setas e miniaturas.
- **Formulário**: Caixa centralizada, campos com bordas arredondadas, feedback visual de erro/sucesso, botão WhatsApp integrado.
- **Footer**: Rodapé azul, texto branco, espaçamento e bordas arredondadas.
- **Media Queries**: Diversos breakpoints para garantir visual perfeito em celulares, tablets e desktop.
- **Acessibilidade**: Uso de cores contrastantes, tamanhos de fonte adequados e labels em formulários.

---

## 3. `<body>`

### 3.1 Botão Dark Mode
- Botão fixo no topo direito, alterna entre modo claro e escuro.
- Ícone muda de lua para sol conforme o tema.
- Preferência salva no localStorage, mantendo o tema escolhido ao recarregar.

### 3.2 Header
- **Logo/Slogan**: Imagem (slogan.jpeg) e nome da empresa em destaque.
- **Navegação**: Links para Home, Quem Somos, Serviços (dropdown com várias opções) e Fale Conosco.
- **Dropdown**: Ao passar o mouse, exibe opções de serviços.
- **Responsivo**: Em telas pequenas, os itens se empilham e o espaçamento é reduzido.

### 3.3 Main
- **Hero Section**: Título principal (Seu Eletricista de Confiança), parágrafo explicativo, fundo gradiente, espaçamento extra para não ser cortado pelo header fixo.
- **Quem Somos**: Título com ícone, parágrafo detalhando experiência, qualidade e diferenciais do serviço.
- **Serviços**: Cards com ícones (casa, lâmpada, disjuntor, etc), título, descrição e botão "Saiba Mais". Ao clicar, abre modal com explicação detalhada do serviço.
- **Galeria**: Miniaturas de fotos reais dos serviços, clique abre modal com navegação por setas e miniaturas.
- **Vídeo**: Embed do YouTube mostrando o trabalho do eletricista, com descrição abaixo.
- **Dicas de Elétrica**: Listas de dicas práticas de segurança, economia e manutenção, com ícones e destaques.
- **Formulário de Orçamento**:
  - Campos: nome, e-mail, telefone (com máscara), tipo de serviço, endereço, descrição, emergência.
  - Validação: campos obrigatórios destacados em vermelho se não preenchidos.
  - Envio: via AJAX para Formspree (e-mail), mensagem de sucesso/erro exibida na tela.
  - Botão WhatsApp: monta mensagem automática com os dados do formulário e abre conversa no WhatsApp.

### 3.4 Footer
- Rodapé azul, texto branco, mensagem de direitos autorais e assinatura personalizada.

### 3.5 Botão Flutuante WhatsApp
- Ícone fixo no canto inferior direito, abre conversa direta no WhatsApp do eletricista.

---

## 4. JavaScript
- **Dark Mode**: Alterna tema, troca ícone, salva preferência no localStorage.
- **Modal de Serviços**: Ao clicar em "Saiba Mais", exibe modal com título e descrição detalhada do serviço, impede rolagem do fundo.
- **Galeria de Imagens**: Modal para ampliar fotos, navegação por setas e miniaturas, rolagem automática para miniatura ativa.
- **Scroll Suave**: Ao clicar nos links do menu, rola suavemente até a seção, compensando a altura do header fixo.
- **Máscara de Telefone**: Formata o campo telefone automaticamente enquanto o usuário digita.
- **Formulário AJAX**: Valida campos obrigatórios, envia para Formspree, exibe mensagem de sucesso/erro, reseta formulário após envio.
- **Botão WhatsApp**: Monta mensagem automática com nome, telefone, tipo de serviço, descrição e emergência, abre conversa no WhatsApp.
- **Acessibilidade**: Uso de aria-labels, foco em botões e navegação por teclado nos modais.

---

## 5. Estrutura de Pastas
- `index.html`: Página principal com todo o código HTML, CSS e JS.
- `imagens/`: Todas as imagens usadas no site (galeria, logo, etc). Atenção ao nome e extensão dos arquivos para funcionar online.
- `video/`: Vídeos usados (se houver).
- `style.css` (opcional): Caso queira separar o CSS futuramente, basta mover o conteúdo do `<style>` para esse arquivo e referenciar no `<head>`.

---

## 6. Observações Finais e Dicas
- **Responsividade**: O site se adapta a qualquer tela, com ajustes de padding, fonte e layout para mobile.
- **Acessibilidade**: Imagens com alt, botões com aria-label, contraste de cores e navegação facilitada.
- **Hospedagem**: Sempre confira nomes de arquivos (maiúsculas/minúsculas/extensão) ao subir para servidores gratuitos, pois são case-sensitive.
- **Personalização**: Para alterar textos, imagens ou serviços, basta editar o HTML. Para adicionar novos serviços, adicione um card e inclua a descrição no objeto de serviços do JS.
- **SEO**: Use títulos e descrições claras, alt em imagens e mantenha o site atualizado para melhor ranqueamento.
- **Segurança**: Não exponha dados sensíveis no HTML. O formulário usa Formspree para proteger seu e-mail.
- **Manutenção**: O código está organizado em blocos lógicos, facilitando futuras alterações.

---

Se precisar de explicação sobre algum trecho específico do código, exemplos de personalização ou integração, basta pedir!
