# FG Law · Direito Imobiliário

Landing page estática, em português brasileiro, criada para incorporadoras, construtoras e proprietários. HTML, CSS e JavaScript, sem dependências de produção. As oito seções solicitadas estão em `index.html`, com textos finais, rótulos e CTAs.

## Prévia local

Execute `npm start` e abra http://127.0.0.1:4173. Também é possível abrir `index.html` diretamente; o servidor é preferível para a função de copiar o resumo. Requer Node.js instalado.

`npm run build` prepara os arquivos publicáveis em `dist/`. A hospedagem pode servir essa pasta como site estático. Nenhuma publicação foi realizada. Para inserir em um site Wix existente, será necessária a implementação no editor/ambiente da plataforma; os arquivos locais não substituem automaticamente a página publicada.

## Contato implementado

- Telefone fixo: (12) 3302-9140, com link `tel:`.
- E-mail: contato@fglaw.com.br.
- O formulário qualifica por nome, e-mail, perfil e assunto. Resumo opcional.
- A seleção do serviço em cada card preenche o assunto no formulário.
- A página prepara um resumo e um link `mailto:`. O visitante revisa e envia em seu aplicativo de e-mail. A interface nunca indica envio concluído.
- A opção de copiar o texto oferece alternativa para quem usa webmail. Sem acesso à área de transferência, o texto fica selecionado para cópia manual.
- Não há backend, armazenamento de leads, analytics ou cookies. Nenhum dado do formulário é enviado pela página. Uma integração futura de envio direto depende do provedor/CRM e da política de tratamento de dados aprovados pelo escritório.

## Informações que precisam de confirmação antes de publicar

1. **WhatsApp principal:** o briefing identifica +55 12 99601-6082 no rodapé e +55 12 98886-2949 nos botões atuais. Nenhum número foi escolhido e nenhum link de WhatsApp foi ativado. Usar somente o número expressamente validado pela FG Law.
2. **Identificação profissional:** solicitar e validar o registro da sociedade e/ou identificação profissional aplicável perante a OAB para inclusão na versão de publicação. O briefing não informa esses dados.
3. **Diferenciais adicionais:** não foram incluídas credenciais, tempo de atuação, avaliações, prêmios, números de clientes ou resultados. A seção “O escritório” usa apenas o público, os serviços e a localização confirmados. Qualquer diferencial além desses dados exige fonte e validação.
4. **Percurso de atendimento:** as quatro etapas são uma proposta editorial indicada como tal na página. Validar o percurso com a equipe; nenhum prazo, modalidade de atendimento ou condição comercial foi prometido.
5. **Privacidade:** o aviso descreve o funcionamento técnico desta versão. A política institucional e as condições de tratamento após o recebimento do e-mail precisam ser fornecidas/validadas pelo escritório; o aviso não se apresenta como política completa da FG Law.
6. **Versão de publicação:** depois das validações, remover `noindex, nofollow`, definir URL canônica e metadados de compartilhamento da URL efetiva. A versão atual é uma prévia local para revisão.

## Direção visual

- Verde profundo (#10231d / #142922), verde claro (#b7d6a0) e papel (#f5f4ee), preservando o caráter sóbrio da identidade existente.
- Títulos em Instrument Serif; conteúdo e controles em DM Sans. Fontes hospedadas localmente, com alternativas de sistema.
- Fotografia de arquitetura no hero, recorte vertical e arco discreto. Segunda imagem de ambiente empresarial, identificada no texto alternativo como ilustrativa; não é apresentada como foto do escritório.
- Seções claras para leitura e comparação, fundos escuros para apresentação institucional e atendimento.
- Cartões dos três serviços, etapas numeradas, FAQ nativo e CTA fixo no celular que desaparece quando o contato está visível.
- Navegação por teclado, foco visível, link para pular ao conteúdo, formulários rotulados e respeito à preferência de movimento reduzido.
- Imagens, logo e fontes em arquivos locais: a página não depende de requests a terceiros para renderizar.

## Fontes e ativos

- Conteúdo confirmado: briefing fornecido e [página institucional da FG Law](https://www.fglaw.com.br/juridico-imobiliario), consultada em 28/09/2026.
- Logotipo branco: ativo original servido pela [FG Law / Wix](https://static.wixstatic.com/media/cd5d1c_f37d16e3844b46b1a721e732be97b910~mv2.png), preservado sem alteração.
- [Referência solicitada: Borges & Teo](https://borgeseteoadvogados.adv.br/lp/distrato-imobiliario/): acesso bloqueado (HTTP 406). Foi seguida a estrutura detalhada no briefing; nenhum texto, foto ou identidade da referência foi copiado.
- Publicidade profissional: [Provimento 205/2021 da OAB](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021), usado como orientação para redação informativa e sóbria. A versão final depende da revisão institucional/profissional do escritório.
- Fotos ilustrativas: [arquitetura](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab) e [ambiente empresarial](https://images.unsplash.com/photo-1497366754035-f200968a6e72), via Unsplash. URLs de origem: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab` e `https://images.unsplash.com/photo-1497366754035-f200968a6e72`.
- Fontes: DM Sans e Instrument Serif, Google Fonts, licenciadas sob SIL Open Font License. Licenças em `assets/licenses/`.

## Validação

Instale as dependências com `npm install`. Execute `npm test` (usa Google Chrome instalado) para testar responsividade, imagens, links internos, menu móvel, FAQ, fluxo de preparação de e-mail e acessibilidade automatizada com axe. Capturas em `test-results/desktop.png` e `test-results/mobile.png`.
