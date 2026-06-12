package com.mindgames.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.mindgames.backend.Repositories.SearchRepository;
import com.mindgames.backend.entities.SearchContent;

@SpringBootApplication
public class PaginaWebDeJuegosApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaginaWebDeJuegosApplication.class, args);
	}

	@Bean
	CommandLineRunner cargarDatos(SearchRepository repository) {

		return args -> {

			repository.save(new SearchContent(
				"1",
				"Sudoku",
				"Juego mental de numeros y logica"
			));

			repository.save(new SearchContent(
				"2",
				"Crucigrama",
				"Juego de palabras y conocimiento"
			));

			repository.save(new SearchContent(
				"3",
				"Administrador",
				"Panel de administracion de usuarios"
			));

		};
	}
}
