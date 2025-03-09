package proj_api.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cidades")
public class Cidade {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    long id;

    @Column(nullable = false)
    String nome;
    @Column(nullable = false)
    String estado;
    @Column(nullable = false)
    String pais;
    @Column(nullable = false)
    Long populacao;

    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id=id;
    }

    public String getNome(){
        return nome;
    }
    public void setNome(String nome){
        this.nome=nome;
    }
    
    public String getEstado(){
        return estado;
    }
    public void setEstado(String estado){
        this.estado=estado;
    }

    public String getPais(){
        return pais;
    }
    public void setPais(String pais){
        this.pais=pais;
    }

    public Long getPopulacao(){
        return populacao;
    }
    public void setPopulacao(Long populacao){
        this.populacao=populacao;
    }
    
}
