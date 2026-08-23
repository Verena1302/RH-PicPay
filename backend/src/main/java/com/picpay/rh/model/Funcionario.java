package com.picpay.rh.model;

public class Funcionario {
    private Integer id;
    private String nome;
    private String email;
    private String telefone;
    private String cargo;
    private String departamento;
    private Double salario;
    private String cidade;
    private Status status;

    

    // construtores
    public Funcionario() {
    }

    public Funcionario(
            Integer id,
            String nome,
            String email,
            String telefone,
            String cargo,
            String departamento,
            Double salario,
            String cidade,
            Status status
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cargo = cargo;
        this.departamento = departamento;
        this.salario = salario;
        this.cidade = cidade;
        this.status = status;
    }



    // getters
    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCargo() {
        return cargo;
    }

    public String getDepartamento() {
        return departamento;
    }

    public Double getSalario() {
        return salario;
    }
    
    public String getCidade() {
        return cidade;
    }

    public Status getStatus() {
        return status;
    }



    // setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}