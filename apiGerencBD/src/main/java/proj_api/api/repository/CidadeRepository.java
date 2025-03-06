package proj_api.api.repository;

import org.springframework.data.repository.CrudRepository;
import proj_api.api.entity.Cidade;

public interface CidadeRepository extends CrudRepository<Cidade, Long> {
    
}
