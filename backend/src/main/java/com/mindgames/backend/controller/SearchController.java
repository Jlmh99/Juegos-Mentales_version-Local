package com.mindgames.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindgames.backend.Repositories.SearchRepository;
import com.mindgames.backend.entities.SearchContent;
import com.mindgames.backend.services.WikipediaSearchService;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:4200")
public class SearchController {

    @Autowired
    private SearchRepository repository;

    @Autowired
    private WikipediaSearchService wikipediaSearchService;

    @GetMapping("/{query}")
    public List<SearchContent> buscar(@PathVariable String query) {

        // Búsqueda real fuera de la página: Wikipedia en vivo
        List<SearchContent> resultados = wikipediaSearchService.buscar(query, 10);

        // Indexamos lo encontrado en Elasticsearch (si no está disponible, no rompe la búsqueda)
        try {
            if (!resultados.isEmpty()) {
                repository.saveAll(resultados);
            }
        } catch (Exception e) {
            System.err.println("⚠️ No se pudo indexar en Elasticsearch: " + e.getMessage());
        }

        return resultados;
    }
}
