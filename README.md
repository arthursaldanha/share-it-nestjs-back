# Share It

O Share It é uma aplicação para compartilhamento de arquivos de forma segura e eficiente. Com o Share It, os usuários podem fazer upload de arquivos para um armazenamento em nuvem, como o Cloudflare Bucket, utilizando URLs pré-assinadas. Isso permite que os usuários compartilhem arquivos diretamente do seu dispositivo para o armazenamento em nuvem, sem precisar passar pelos servidores da aplicação e sem realizar autenticações. Ou seja, sem burocracia.

## Visão Geral

Esta seção fornece uma visão geral do projeto, incluindo seu propósito, contexto e principais recursos.

## Arquitetura

O projeto utliza DDD Domain-Driven Design (DDD) que é uma abordagem para desenvolvimento de software que se concentra na modelagem do domínio do problema em questão. É uma metodologia que visa tornar o código mais alinhado com o mundo real, tornando-o mais compreensível e mantível.

Dentro da pasta contexts você vai encontrar os contextos que esse serviço aborda em nosso negócio. Sempre se pergunte se oque você esta desenvolvendo pertence ao contexto que você decidiu usar.

## Camadas do DDD

1. **Camada de Aplicação**: Responsável por coordenar a interação entre os diferentes componentes da aplicação e interfaces para o mudo externo.

2. **Camada de Domínio**: Contém as regras de negócio e a lógica do domínio, incluindo entidades, objetos de valor e agregados.

3. **Camada de Infraestrutura**: Lida com detalhes de implementação, como banco de dados e outros serviços.

## Vantagens do DDD

- Melhora a compreensão do domínio do problema.
- Torna o código mais coeso e menos acoplado.
- Facilita a manutenção e evolução do software.
- Ajuda a evitar problemas de design e arquitetura.

Para saber mais sobre cada camada consulte o artigo em: [DDD com a Microsoft](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)

## Princípios-Chave do DDD

1. **Modelagem de Domínio Rico**: DDD coloca ênfase na criação de modelos de domínio ricos, representando conceitos e entidades do mundo real. Isso envolve a criação de objetos de valor, agregados e entidades para refletir o domínio do problema.

2. **Limites de Contexto Delimitados**: DDD propõe que contextos de domínio sejam delimitados e separados para evitar confusão e conflitos no código.

3. **Linguagem Ubíqua**: Uma linguagem comum deve ser estabelecida entre desenvolvedores e especialistas em domínio, garantindo que todos usem a mesma terminologia.

4. **Agregados**: Os agregados são grupos de entidades e objetos de valor que são tratados como uma única unidade. Eles garantem a consistência das operações no domínio.

5. **Objetos de Valor**: Objetos de valor são imutáveis e representam conceitos que não possuem identidade própria. Eles são importantes para expressar significado no código.

6. **Entidades**: Entidades são objetos que possuem identidade e podem ser distinguidos por suas características únicas.

## Tecnologias

[Nest](https://github.com/nestjs/nest) Nest.js com TypeScript

## Setup

```bash
# install dependencies
$ yarn i
```

## Running the app

```bash
# development
$ yarn dev

# build app
$ yarn build

# production mode
$ yarn start:prod
```

## Testes

```bash
# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Uso

Para usar o projeto basta ter o docker instalado e as variaveis de ambiente configuradas no arquivo .env seguindo o env.example.

Em ambiente de desenvolvimento configure corretamente os valores no .env e configure seu ambiente de acordo

Para consumir a API o Swagger pode ser consultado em /docs
