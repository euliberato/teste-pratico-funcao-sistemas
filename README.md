# Implementação do CPF do Cliente

### Na tela de cadastramento/alteração de clientes, incluir um novo campo denominado **CPF**, que permitirá o cadastramento do CPF do cliente.

### Pontos Relevantes:
- O novo campo deverá seguir o padrão visual dos demais campos da tela.
- O cadastramento do **CPF** será **obrigatório**.
- O campo **CPF** deverá possuir a formatação padrão de CPF: `999.999.999-99`.
- Deverá consistir se o dado informado é um **CPF válido** (conforme o cálculo padrão de verificação do dígito verificador de CPF).
- **Não permitir** o cadastramento de um **CPF já existente** no banco de dados, ou seja, **não é permitida a existência de um CPF duplicado**.

### Banco de Dados:
- Tabela que deverá armazenar o novo campo de **CPF**: `CLIENTES`.
- O novo campo deverá ser nomeado como **CPF**.

---

# Implementação do Botão Beneficiários

### Na tela de cadastramento/alteração de clientes, incluir um novo botão denominado **Beneficiários**, que permitirá o cadastramento de beneficiários do cliente. Ao clicar no botão, deverá ser aberto um **pop-up** para a inclusão dos campos **CPF** e **Nome do Beneficiário**. Além disso, deverá haver um **grid** onde serão exibidos os beneficiários já cadastrados, permitindo a manutenção (edição e exclusão) dos mesmos.

### Pontos Relevantes:
- O novo botão e novos campos deverão seguir o **padrão visual** dos demais botões e campos da tela.
- O campo **CPF** deverá possuir a **formatação padrão** de CPF: `999.999.999-99`.
- Deverá consistir se o dado informado é um **CPF válido** (conforme o cálculo padrão de verificação do dígito verificador de CPF).
- **Não permitir** o cadastramento de **mais de um beneficiário com o mesmo CPF** para o mesmo cliente.
- O beneficiário deverá ser **gravado na base de dados** quando for acionado o botão **Salvar** na tela de **Cadastrar Cliente**.

### Banco de Dados:
- Tabela que deverá armazenar os dados de beneficiários: `BENEFICIARIOS`.
- Os novos campos deverão ser nomeados como:
  - **ID**
  - **CPF**
  - **NOME**
  - **IDCLIENTE**
