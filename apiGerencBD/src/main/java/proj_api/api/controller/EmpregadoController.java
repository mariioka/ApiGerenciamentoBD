package proj_api.api.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import proj_api.api.entity.Empregado;
import proj_api.api.repository.EmpregadoRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class EmpregadoController {
    

    @Autowired
    private EmpregadoRepository repositore;

    @PostMapping("/api/empregados")
    public Empregado create(@RequestBody Empregado novoEmpregado){
        if(novoEmpregado.getNome() == null ||
        novoEmpregado.getCargo() == null ||
        novoEmpregado.getSalario() == null ||
        novoEmpregado.getNome().trim().equals("") ||
        novoEmpregado.getCargo().trim().equals("")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome, cargos e salários são obrigatórios!");
        }

        try {
			return repositore.save(novoEmpregado);
		} catch(Exception ex) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome é único e deve ter no máximo 50 caracteres", ex);
		}
    }

    @GetMapping("/api/empregados")
    public Iterable<Empregado> readAll() {
        return repositore.findAll();
    }

    @GetMapping("/api/empregados/{id}")
public Empregado readById(@PathVariable Long id) {
    try {
        Optional<Empregado> op = repositore.findById(id);

        if (op.isPresent()) {
            return op.get();
        }
    } catch (Exception ex) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problema ao tentar buscar empregado", ex);
    }

    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empregado não encontrado");
}

@PutMapping("/api/empregados/{id}")
public Empregado update(@RequestBody Empregado empregadoAtualizado, @PathVariable Long id) {
    try {
        Optional<Empregado> op = repositore.findById(id);

        if (op.isPresent()) {
            Empregado empregado = op.get();

            String nome = empregadoAtualizado.getNome();
            String cargo = empregadoAtualizado.getCargo();
            Double salario = empregadoAtualizado.getSalario();

            if (nome != null) empregado.setNome(nome);
            if (cargo != null) empregado.setCargo(cargo);
            if (salario != null) empregado.setSalario(salario);

            repositore.save(empregado);
            return empregado;
        }
    } catch (Exception ex) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problema ao tentar atualizar empregado", ex);
    }

    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empregado não encontrado");
}

@DeleteMapping(value="/api/empregados/{id}", produces = "application/json")
public Empregado delete(@PathVariable Long id) {
    try {
        Optional<Empregado> op = repositore.findById(id);

        if (op.isPresent()) {
            Empregado empregado = op.get();
            repositore.deleteById(id);
            return empregado;
        }
    } catch (Exception ex) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problema ao tentar excluir empregado", ex);
    }

    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empregado não encontrado");
}




    
    


    

}
