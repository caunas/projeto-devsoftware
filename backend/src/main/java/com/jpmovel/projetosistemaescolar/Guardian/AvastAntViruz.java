package com.jpmovel.projetosistemaescolar.Guardian;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class AvastAntViruz {

    public static void main(String[] args) {
        System.out.println("====================================================");
        System.out.println("🔍 INICIANDO AUDITORIA ESTATICA DE SEGURANCA E CODIGO");
        System.out.println("====================================================\n");

        // Lista contendo todas as Entidades e Controllers mapeados com base na árvore de arquivos
        Map<String, String> arquivosParaVerificar = Map.ofEntries(
                // --- PACOTE ALUNO ---
                Map.entry("Aluno", "src/main/java/com/jpmovel/projetosistemaescolar/aluno/Aluno.java"),
                Map.entry("AlunoController", "src/main/java/com/jpmovel/projetosistemaescolar/aluno/AlunoController.java"),

                // --- PACOTE ATIVIDADE ---
                Map.entry("Atividade", "src/main/java/com/jpmovel/projetosistemaescolar/atividade/Atividade.java"),
                Map.entry("AtividadeController", "src/main/java/com/jpmovel/projetosistemaescolar/atividade/AtividadeController.java"),

                // --- PACOTE ATIVIDADE ALUNO ---
                Map.entry("AtividadeAluno", "src/main/java/com/jpmovel/projetosistemaescolar/atividadeAluno/AtividadeAluno.java"),

                // --- PACOTE COORDENADOR ---
                Map.entry("Coordenador", "src/main/java/com/jpmovel/projetosistemaescolar/coordenador/Coordenador.java"),
                Map.entry("CoordenadorController", "src/main/java/com/jpmovel/projetosistemaescolar/coordenador/CoordenadorController.java"),

                // --- PACOTE EVENTO ---
                Map.entry("Evento", "src/main/java/com/jpmovel/projetosistemaescolar/evento/Evento.java"),
                Map.entry("EventoController", "src/main/java/com/jpmovel/projetosistemaescolar/evento/EventoController.java"),

                // --- PACOTE FATURA ---
                Map.entry("Fatura", "src/main/java/com/jpmovel/projetosistemaescolar/fatura/Fatura.java"),
                Map.entry("FaturaController", "src/main/java/com/jpmovel/projetosistemaescolar/fatura/FaturaController.java"),

                // --- PACOTE NOTA ---
                Map.entry("Nota", "src/main/java/com/jpmovel/projetosistemaescolar/nota/Nota.java"),
                Map.entry("NotaController", "src/main/java/com/jpmovel/projetosistemaescolar/nota/NotaController.java"),

                // --- PACOTE PROFESSOR ---
                Map.entry("Professor", "src/main/java/com/jpmovel/projetosistemaescolar/professor/Professor.java"),
                Map.entry("ProfessorController", "src/main/java/com/jpmovel/projetosistemaescolar/professor/ProfessorController.java"),

                // --- PACOTE TURMA ---
                Map.entry("Turma", "src/main/java/com/jpmovel/projetosistemaescolar/turma/Turma.java"),
                Map.entry("TurmaController", "src/main/java/com/jpmovel/projetosistemaescolar/turma/TurmaController.java"),

                // --- AUTENTICACAO E SEGURANCA ---
                Map.entry("Usuario", "src/main/java/com/jpmovel/projetosistemaescolar/auth/Usuario.java"),
                Map.entry("Role", "src/main/java/com/jpmovel/projetosistemaescolar/auth/Role.java"),
                Map.entry("AuthController", "src/main/java/com/jpmovel/projetosistemaescolar/auth/AuthController.java"),
                Map.entry("AccountController", "src/main/java/com/jpmovel/projetosistemaescolar/auth/AccountController.java"),
                Map.entry("TokenService", "src/main/java/com/jpmovel/projetosistemaescolar/auth/TokenService.java"),
                Map.entry("JwtAuthenticationFilter", "src/main/java/com/jpmovel/projetosistemaescolar/auth/JwtAuthenticationFilter.java"),
                Map.entry("SecurityConfig", "src/main/java/com/jpmovel/projetosistemaescolar/config/SecurityConfig.java")
        );

        boolean projetoInviolado = true;

        // 3. LOOP DE VARREDURA
        for (Map.Entry<String, String> entrada : arquivosParaVerificar.entrySet()) {
            String nomeClasse = entrada.getKey();
            String caminhoRealJava = entrada.getValue();

            try {
                boolean alterado = verificarIntegridade(nomeClasse, caminhoRealJava);
                if (alterado) {
                    projetoInviolado = false; // Se um único arquivo falhar, o projeto está violado
                }
            } catch (IOException e) {
                System.out.println("❌ Erro ao ler arquivos para a classe " + nomeClasse + ": " + e.getMessage());
                projetoInviolado = false;
            }
        }

        // 4. VEREDITO FINAL
        System.out.println("====================================================");
        if (projetoInviolado) {
            System.out.println("✅ SUCESSO: Nenhuma alteracao nao autorizada foi detectada.");
            System.out.println("🔒 A integridade do sistema esta 100% preservada.");
        } else {
            System.out.println("🚨 ALERTA: O codigo original foi modificado ou violado!");
            System.out.println("Por favor, revise as diferenças apontadas acima.");
        }
        System.out.println("====================================================");

        if (!projetoInviolado) {
            throw new IllegalStateException("A auditoria Guardian detectou divergencias de integridade.");
        }
    }

    // 5. MÉTODO QUE FAZ A COMPARAÇÃO LINHA POR LINHA
    private static boolean verificarIntegridade(String nomeClasse, String caminhoRealJava) throws IOException {
        // Aponta para os arquivos .txt que você vai colocar na mesma pasta da auditoria
        String caminhoGabarito = "src/main/java/com/jpmovel/projetosistemaescolar/Guardian/" + nomeClasse + ".txt";

        Path pathGabarito = Paths.get(caminhoGabarito);
        Path pathReal = Paths.get(caminhoRealJava);

        // Se o arquivo de texto ou o .java não existirem, avisa no console
        if (!Files.exists(pathGabarito)) {
            System.out.println("⚠️ Gabarito .txt não encontrado na pasta Guardian: " + caminhoGabarito);
            return true;
        }
        if (!Files.exists(pathReal)) {
            System.out.println("⚠️ Arquivo físico .java original não encontrado: " + caminhoRealJava);
            return true;
        }

        // Carrega todas as linhas na memória
        List<String> linhasGabarito = Files.readAllLines(pathGabarito);
        List<String> linhasReal = Files.readAllLines(pathReal);

        boolean houveAlteracao = false;
        int totalLinhas = Math.max(linhasGabarito.size(), linhasReal.size());

        // Compara linha por linha ignorando espaços vazios nas pontas (.trim())
        for (int i = 0; i < totalLinhas; i++) {
            String linhaOriginal = (i < linhasGabarito.size()) ? linhasGabarito.get(i).trim() : "[LINHA INEXISTENTE]";
            String linhaModificada = (i < linhasReal.size()) ? linhasReal.get(i).trim() : "[LINHA INEXISTENTE]";

            if (!linhaOriginal.equals(linhaModificada)) {
                if (!houveAlteracao) {
                    System.out.println("⚠️ VIOLAÇÃO DETECTADA NA CLASSE: " + nomeClasse + ".java");
                    houveAlteracao = true;
                }
                System.out.println("📍 Diferença na Linha " + (i + 1) + ":");
                System.out.println("   [ESPERADO]: " + (linhaOriginal.isEmpty() ? "(Linha em branco)" : linhaOriginal));
                System.out.println("   [RECEBIDO]: " + (linhaModificada.isEmpty() ? "(Linha em branco)" : linhaModificada));
                System.out.println("   -------------------------------------------------");
            }
        }

        if (houveAlteracao) {
            System.out.println("\n");
        }
        return houveAlteracao;
    }
}
