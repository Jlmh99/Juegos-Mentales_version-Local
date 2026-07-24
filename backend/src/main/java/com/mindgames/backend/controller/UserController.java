package com.mindgames.backend.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindgames.backend.Repositories.UsuarioRepository;
import com.mindgames.backend.config.JwtUtil;
import com.mindgames.backend.entities.Usuario;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserController(UsuarioRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    // ==========================================================
    // 👤 PERFIL DEL USUARIO AUTENTICADO (cualquier rol, no solo ADMIN)
    // ==========================================================

    @GetMapping("/me")
    public ResponseEntity<?> obtenerPerfil(Principal principal) {
        Usuario user = repo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<?> actualizarPerfil(@RequestBody Usuario datos, Principal principal) {
        Usuario user = repo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (datos.getUsername() != null && !datos.getUsername().isBlank()) {
            user.setUsername(datos.getUsername());
        }

        if (datos.getEmail() != null && !datos.getEmail().isBlank()
                && !datos.getEmail().equalsIgnoreCase(user.getEmail())) {

            if (repo.findByEmail(datos.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Ese correo ya está en uso por otro usuario");
            }
            user.setEmail(datos.getEmail());
        }

        repo.save(user);

        // 🔥 El email pudo cambiar (es el "subject" del token), así que emitimos uno nuevo
        String nuevoToken = jwtUtil.generarToken(user.getEmail(), user.getRol());

        return ResponseEntity.ok(Map.of(
                "usuario", user,
                "token", nuevoToken
        ));
    }

    @PutMapping("/me/password")
    public ResponseEntity<?> cambiarPassword(@RequestBody Map<String, String> body, Principal principal) {
        Usuario user = repo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String actual = body.get("currentPassword");
        String nueva = body.get("newPassword");

        if (actual == null || actual.isBlank() || nueva == null || nueva.isBlank()) {
            return ResponseEntity.badRequest().body("Debes indicar la contraseña actual y la nueva");
        }

        if (!encoder.matches(actual, user.getPassword())) {
            return ResponseEntity.badRequest().body("La contraseña actual es incorrecta");
        }

        user.setPassword(encoder.encode(nueva));
        repo.save(user);

        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

    @GetMapping
    public List<Usuario> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario user) {
        user.setPassword(encoder.encode(user.getPassword())); // 🔥 CLAVE
        return repo.save(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id, Principal principal) {

        Usuario usuarioActual = repo.findByEmail(principal.getName())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuarioActual.getId().equals(id)) {
            return ResponseEntity
                .badRequest()
                .body("No puedes eliminar tu propio usuario");
        }

        repo.deleteById(id);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario userActualizado) {

        Usuario user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setUsername(userActualizado.getUsername());
        user.setEmail(userActualizado.getEmail());
        user.setRol(userActualizado.getRol());

        // 🔐 SOLO si viene contraseña NUEVA
        if (userActualizado.getPassword() != null 
            && !userActualizado.getPassword().isEmpty()
            && !userActualizado.getPassword().startsWith("$2a$")) {

            user.setPassword(encoder.encode(userActualizado.getPassword()));
        }

        // 👇 2FA (nuevo campo)
        user.setTwoFactorEnabled(userActualizado.isTwoFactorEnabled());

        return repo.save(user);
    }

    // ==========================================================
    // 🔐 HABILITAR / DESHABILITAR CUENTA (solo ADMIN, vía SecurityConfig)
    // ==========================================================
    @PatchMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Long id, Principal principal) {

        Usuario usuarioActual = repo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuarioActual.getId().equals(id)) {
            return ResponseEntity
                    .badRequest()
                    .body("No puedes deshabilitar tu propia cuenta");
        }

        Usuario user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setHabilitado(!user.isHabilitado());
        repo.save(user);

        return ResponseEntity.ok(user);
    }

}
