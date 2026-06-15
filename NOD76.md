# Guardian

O Guardian verifica se arquivos importantes do backend continuam iguais às versões de referência aprovadas.

## Quando usar

Execute o Guardian antes de publicar uma versão, após alterações relevantes no backend ou quando houver suspeita de modificação indevida.

Ele não é executado automaticamente durante os testes ou o build do projeto.

## Executar a verificação

A partir da pasta `backend`, execute:

```bash
bash gradlew guardianAudit
```

## Entender o resultado

Quando não houver diferenças, o Guardian exibirá uma mensagem informando que a integridade foi preservada.

Quando houver diferenças, ele indicará os arquivos alterados e encerrará a execução com erro. Revise essas alterações antes de prosseguir.

## Atualizar as referências

Atualize os arquivos `.txt` do diretório abaixo somente depois de revisar e aprovar as alterações correspondentes:

```text
backend/src/main/java/com/jpmovel/projetosistemaescolar/Guardian
```

Cada arquivo `.txt` deve ser atualizado para refletir integralmente o arquivo Java de mesmo nome.

Depois da atualização, execute novamente:

```bash
bash gradlew guardianAudit
```

Não aprove diferenças automaticamente. Os arquivos de referência representam a versão considerada válida para auditoria.
