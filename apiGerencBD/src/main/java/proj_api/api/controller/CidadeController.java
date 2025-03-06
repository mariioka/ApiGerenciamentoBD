package proj_api.api.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import proj_api.api.entity.Cidade;
import proj_api.api.repository.CidadeRepository;

@RestController
public class CidadeController {
    
    @Autowired
    private CidadeRepository rep;
    
    @PostMapping("/api/cidades")
    Cidade createCidade(@RequestBody Cidade novaCidade){
        if( novaCidade.getNome()==null ||
            novaCidade.getEstado()==null ||
            novaCidade.getPais()==null ||
            novaCidade.getPopulacao()== null
        ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome, estado, país e população da cidade são obrigatórios");
        }

        try{
            return rep.save(novaCidade);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da cidade é único");
        }
    }
    //GET Cidade
    @GetMapping("/api/cidades")
    public Iterable<Cidade> readAll() {
        return rep.findAll();
    }
    //GET 1 cidade
    @GetMapping("/api/cidades/{id}")
    public Cidade readById(@PathVariable Long id) {
        try {
            Optional<Cidade> op = rep.findById(id);
            if (op.isPresent()) {
                return op.get();
            }
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problema ao tentar buscar cidade", ex);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A cidade não foi encontrada");
    }

    @PutMapping("/api/cidades/{id}")
	public Cidade update(@RequestBody Cidade cidUpdt, @PathVariable long id) {
		try {
			Optional<Cidade> op = rep.findById(id);
			
			if(op.isPresent()) {
				Cidade cid = op.get();
				
				String nome = cidUpdt.getNome();
				String estado = cidUpdt.getEstado();
				String pais = cidUpdt.getPais();
                Long populacao = cidUpdt.getPopulacao();
				
				if(nome      !=null) cid.setNome(nome);
                if(estado      !=null) cid.setEstado(estado);
                if(pais      !=null) cid.setPais(pais);
                if(populacao      !=null) cid.setPopulacao(populacao);
				
				rep.save(cid);
				return cid;
			}		
		}catch(Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problema ao buscar cidade", ex);
		}
		
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A cidade não foi encontrada");
	}

    @DeleteMapping(value="/api/cidades/{id}", produces = "application/json")
	public Cidade delete(@PathVariable long id) {
		try {
			Optional<Cidade> op = rep.findById(id);
			
			if(op.isPresent()) {
				rep.deleteById(id);
				return op.get();
			}		
		}catch(Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problema ao buscar cidade", ex);
		}
		
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A cidade não foi encontrada");
	}
}
