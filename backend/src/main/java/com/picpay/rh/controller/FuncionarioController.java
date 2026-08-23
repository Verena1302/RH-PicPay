package com.picpay.rh.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.picpay.rh.model.Funcionario;
import com.picpay.rh.service.FuncionarioService;




@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    
    
    // construtor
    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }



    // GET
    @GetMapping
    public List<Funcionario> listarTodos(@RequestParam(required = false) String busca) {
        return funcionarioService.buscar(busca);
    }

    @GetMapping("/{id}")
    public Funcionario buscarPorId(@PathVariable Integer id) {
        return funcionarioService.buscarPorId(id);
    }


    
    // POST
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // 201
    public Funcionario cadastrar(@RequestBody Funcionario funcionario) {
        return funcionarioService.cadastrar(funcionario);
    }
    


    // PUT
    @PutMapping("/{id}")
    public Funcionario atualizarCompleto(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        return funcionarioService.atualizarCompleto(id, funcionario);
    }



    // PATCH
    @PatchMapping("/{id}")
    public Funcionario atualizarParcial(@PathVariable Integer id, @RequestBody Map<String, Object> campos) {
        return funcionarioService.atualizarParcial(id, campos);
    }



    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204
    public void excluir(@PathVariable Integer id) {
        funcionarioService.excluir(id);
    }
}
