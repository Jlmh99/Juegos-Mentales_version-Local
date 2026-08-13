package com.mindgames.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "contenido")
public class SearchContent {

    @Id
    private String id;

    private String titulo;
    private String descripcion;
    private String url;

    public SearchContent() {}

    public SearchContent(String id, String titulo, String descripcion, String url) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getUrl() {
        return url;
    }
}
