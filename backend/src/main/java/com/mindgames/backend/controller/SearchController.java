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

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:4200")
public class SearchController {

    @Autowired
    private SearchRepository repository;

    @GetMapping("/{query}")
    public List<SearchContent> buscar(@PathVariable String query) {

        return repository.findByTituloContainingOrDescripcionContaining(
            query,
            query
        );
    }
}
