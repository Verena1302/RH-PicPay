package com.picpay.rh.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.picpay.rh.model.Funcionario;
import com.picpay.rh.model.Status;

@Service
public class FuncionarioService {

    private final List<Funcionario> funcionarios = new ArrayList<>();



    // TESTE
    public FuncionarioService() {
        funcionarios.add(new Funcionario(
                1,
                "Marena Marostica Liberal",
                "ana.silva@email.com",
                "(11) 99999-9999",
                "Desenvolvedora Java",
                "Tecnologia",
                8500.0,
                "São Paulo",
                Status.EM_ANALISE
        ));
    }


    // GET
    public List<Funcionario> listarTodos() {
        return funcionarios;
    }


    public List<Funcionario> buscar(String termo) {
        if (termo == null || termo.isBlank()) { return funcionarios; }

        String busca = termo.toLowerCase();
        return funcionarios.stream()
                .filter(f ->
                        f.getNome().toLowerCase().contains(busca)
                                || f.getCargo().toLowerCase().contains(busca)
                                || f.getStatus()
                                .toString()
                                .toLowerCase()
                                .contains(busca)
                )
                .toList();
    }

    
    public Funcionario buscarPorId(Integer id) {
        return funcionarios.stream()
                .filter(funcionario -> funcionario.getId().equals(id))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Funcionário não encontrado")
                );
    }



    // POST
    public Funcionario cadastrar(Funcionario funcionario) {
        boolean idExiste = funcionarios.stream()
                .anyMatch(f -> f.getId().equals(funcionario.getId()));

        if (idExiste) {
            throw new RuntimeException("Já existe um funcionário com esse ID");
        }
        funcionarios.add(funcionario);
        return funcionario;
    }



    // PUT
    public Funcionario atualizarCompleto(Integer id, Funcionario funcionarioAtualizado) {
        Funcionario funcionario = buscarPorId(id);

        funcionario.setNome(funcionarioAtualizado.getNome());
        funcionario.setEmail(funcionarioAtualizado.getEmail());
        funcionario.setTelefone(funcionarioAtualizado.getTelefone());
        funcionario.setCargo(funcionarioAtualizado.getCargo());
        funcionario.setDepartamento(funcionarioAtualizado.getDepartamento());
        funcionario.setSalario(funcionarioAtualizado.getSalario());
        funcionario.setCidade(funcionarioAtualizado.getCidade());
        funcionario.setStatus(funcionarioAtualizado.getStatus());

        return funcionario;
    }



    // PATCH
    public Funcionario atualizarParcial(Integer id, Map<String, Object> campos) {
        Funcionario funcionario = buscarPorId(id);

        if (campos.containsKey("nome")) {
            funcionario.setNome((String) campos.get("nome"));
        }

        if (campos.containsKey("email")) {
            funcionario.setEmail((String) campos.get("email"));
        }

        if (campos.containsKey("telefone")) {
            funcionario.setTelefone((String) campos.get("telefone"));
        }

        if (campos.containsKey("cargo")) {
            funcionario.setCargo((String) campos.get("cargo"));
        }

        if (campos.containsKey("departamento")) {
            funcionario.setDepartamento(
                    (String) campos.get("departamento")
            );
        }

        if (campos.containsKey("salario")) {
            funcionario.setSalario(
                    Double.valueOf(campos.get("salario").toString())
            );
        }

        if (campos.containsKey("cidade")) {
            funcionario.setCidade(
                    (String) campos.get("cidade")
            );
        }

        if (campos.containsKey("status")) {
            funcionario.setStatus(
                    Status.valueOf(campos.get("status").toString())
            );
        }

        return funcionario;
    }



    // DELETE
    public void excluir(Integer id) {
        Funcionario funcionario = buscarPorId(id);

        funcionarios.remove(funcionario);
    }
}