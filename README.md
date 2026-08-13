
```
Version Local
├─ backend
│  ├─ .mvn
│  │  └─ wrapper
│  │     └─ maven-wrapper.properties
│  ├─ Dockerfile
│  ├─ HELP.md
│  ├─ mvnw
│  ├─ mvnw.cmd
│  ├─ pom.xml
│  ├─ src
│  │  ├─ main
│  │  │  ├─ java
│  │  │  │  └─ com
│  │  │  │     └─ mindgames
│  │  │  │        └─ backend
│  │  │  │           ├─ config
│  │  │  │           │  ├─ ElasticsearchConfig.java
│  │  │  │           │  ├─ JwtFilter.java
│  │  │  │           │  ├─ JwtUtil.java
│  │  │  │           │  └─ SecurityConfig.java
│  │  │  │           ├─ controller
│  │  │  │           │  ├─ AuthController.java
│  │  │  │           │  ├─ SearchController.java
│  │  │  │           │  ├─ TestController.java
│  │  │  │           │  └─ UserController.java
│  │  │  │           ├─ entities
│  │  │  │           │  ├─ CodigoVerificacion.java
│  │  │  │           │  ├─ SearchContent.java
│  │  │  │           │  └─ Usuario.java
│  │  │  │           ├─ PaginaWebDeJuegosApplication.java
│  │  │  │           ├─ Repositories
│  │  │  │           │  ├─ CodigoRepository.java
│  │  │  │           │  ├─ SearchRepository.java
│  │  │  │           │  └─ UsuarioRepository.java
│  │  │  │           └─ services
│  │  │  │              └─ EmailService.java
│  │  │  └─ resources
│  │  │     ├─ application.properties
│  │  │     ├─ static
│  │  │     └─ templates
│  │  └─ test
│  │     └─ java
│  │        └─ com
│  │           └─ mindgames
│  │              └─ backend
│  │                 └─ PaginaWebDeJuegosApplicationTests.java
│  └─ target
│     ├─ classes
│     │  ├─ application.properties
│     │  └─ com
│     │     └─ mindgames
│     │        └─ backend
│     │           ├─ config
│     │           │  ├─ ElasticsearchConfig$1.class
│     │           │  ├─ ElasticsearchConfig.class
│     │           │  ├─ JwtFilter.class
│     │           │  ├─ JwtUtil.class
│     │           │  └─ SecurityConfig.class
│     │           ├─ controller
│     │           │  ├─ AuthController.class
│     │           │  ├─ SearchController.class
│     │           │  ├─ TestController.class
│     │           │  └─ UserController.class
│     │           ├─ entities
│     │           │  ├─ CodigoVerificacion.class
│     │           │  ├─ SearchContent.class
│     │           │  └─ Usuario.class
│     │           ├─ PaginaWebDeJuegosApplication.class
│     │           ├─ Repositories
│     │           │  ├─ CodigoRepository.class
│     │           │  ├─ SearchRepository.class
│     │           │  └─ UsuarioRepository.class
│     │           └─ services
│     │              └─ EmailService.class
│     ├─ generated-sources
│     │  └─ annotations
│     ├─ generated-test-sources
│     │  └─ test-annotations
│     ├─ maven-status
│     │  └─ maven-compiler-plugin
│     │     ├─ compile
│     │     │  └─ default-compile
│     │     │     ├─ createdFiles.lst
│     │     │     └─ inputFiles.lst
│     │     └─ testCompile
│     │        └─ default-testCompile
│     │           ├─ createdFiles.lst
│     │           └─ inputFiles.lst
│     └─ test-classes
│        └─ com
│           └─ mindgames
│              └─ backend
│                 └─ PaginaWebDeJuegosApplicationTests.class
├─ frontend
│  ├─ .angular
│  │  └─ cache
│  │     └─ 21.1.2
│  │        └─ frontend
│  │           ├─ .tsbuildinfo
│  │           ├─ angular-compiler.db
│  │           ├─ angular-compiler.db-lock
│  │           └─ vite
│  │              ├─ com.chrome.devtools.json
│  │              ├─ deps
│  │              │  ├─ @angular_common.js
│  │              │  ├─ @angular_common.js.map
│  │              │  ├─ @angular_common_http.js
│  │              │  ├─ @angular_common_http.js.map
│  │              │  ├─ @angular_core.js
│  │              │  ├─ @angular_core.js.map
│  │              │  ├─ @angular_forms.js
│  │              │  ├─ @angular_forms.js.map
│  │              │  ├─ @angular_platform-browser.js
│  │              │  ├─ @angular_platform-browser.js.map
│  │              │  ├─ @angular_router.js
│  │              │  ├─ @angular_router.js.map
│  │              │  ├─ chunk-3SYTFI7M.js
│  │              │  ├─ chunk-3SYTFI7M.js.map
│  │              │  ├─ chunk-6R6GMINV.js
│  │              │  ├─ chunk-6R6GMINV.js.map
│  │              │  ├─ chunk-PAGLIXZA.js
│  │              │  ├─ chunk-PAGLIXZA.js.map
│  │              │  ├─ chunk-PJVWDKLX.js
│  │              │  ├─ chunk-PJVWDKLX.js.map
│  │              │  ├─ chunk-RMG632KN.js
│  │              │  ├─ chunk-RMG632KN.js.map
│  │              │  ├─ chunk-ZR2GWZBP.js
│  │              │  ├─ chunk-ZR2GWZBP.js.map
│  │              │  ├─ package.json
│  │              │  ├─ rxjs.js
│  │              │  ├─ rxjs.js.map
│  │              │  └─ _metadata.json
│  │              └─ deps_ssr
│  │                 ├─ @angular_common.js
│  │                 ├─ @angular_common.js.map
│  │                 ├─ @angular_common_http.js
│  │                 ├─ @angular_common_http.js.map
│  │                 ├─ @angular_core.js
│  │                 ├─ @angular_core.js.map
│  │                 ├─ @angular_forms.js
│  │                 ├─ @angular_forms.js.map
│  │                 ├─ @angular_platform-browser.js
│  │                 ├─ @angular_platform-browser.js.map
│  │                 ├─ @angular_platform-server_init.js
│  │                 ├─ @angular_platform-server_init.js.map
│  │                 ├─ @angular_router.js
│  │                 ├─ @angular_router.js.map
│  │                 ├─ @angular_ssr.js
│  │                 ├─ @angular_ssr.js.map
│  │                 ├─ @angular_ssr_node.js
│  │                 ├─ @angular_ssr_node.js.map
│  │                 ├─ chunk-6DU2HRTW.js
│  │                 ├─ chunk-6DU2HRTW.js.map
│  │                 ├─ chunk-BB6KWQRO.js
│  │                 ├─ chunk-BB6KWQRO.js.map
│  │                 ├─ chunk-CE4TWH46.js
│  │                 ├─ chunk-CE4TWH46.js.map
│  │                 ├─ chunk-CGEVNCB7.js
│  │                 ├─ chunk-CGEVNCB7.js.map
│  │                 ├─ chunk-K4GY4LLX.js
│  │                 ├─ chunk-K4GY4LLX.js.map
│  │                 ├─ chunk-KF2QZN3H.js
│  │                 ├─ chunk-KF2QZN3H.js.map
│  │                 ├─ chunk-LVHYPLWZ.js
│  │                 ├─ chunk-LVHYPLWZ.js.map
│  │                 ├─ chunk-O5J3CNTX.js
│  │                 ├─ chunk-O5J3CNTX.js.map
│  │                 ├─ chunk-UV4RWLIY.js
│  │                 ├─ chunk-UV4RWLIY.js.map
│  │                 ├─ express.js
│  │                 ├─ express.js.map
│  │                 ├─ package.json
│  │                 ├─ rxjs.js
│  │                 ├─ rxjs.js.map
│  │                 ├─ xhr2-E5RTESSH.js
│  │                 ├─ xhr2-E5RTESSH.js.map
│  │                 └─ _metadata.json
│  ├─ .editorconfig
│  ├─ angular.json
│  ├─ dist
│  │  └─ frontend
│  │     ├─ 3rdpartylicenses.txt
│  │     ├─ browser
│  │     │  ├─ favicon.ico
│  │     │  ├─ index.html
│  │     │  ├─ main-RNQXODHW.js
│  │     │  ├─ styles-5INURTSO.css
│  │     │  └─ _redirects
│  │     ├─ prerendered-routes.json
│  │     └─ server
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  └─ _redirects
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  ├─ app.config.server.ts
│  │  │  ├─ app.config.ts
│  │  │  ├─ app.css
│  │  │  ├─ app.html
│  │  │  ├─ app.routes.server.ts
│  │  │  ├─ app.routes.ts
│  │  │  ├─ app.spec.ts
│  │  │  ├─ app.ts
│  │  │  ├─ components
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ auth-interceptor.spec.ts
│  │  │  │  └─ auth-interceptor.ts
│  │  │  ├─ pages
│  │  │  │  ├─ admin
│  │  │  │  │  ├─ admin.css
│  │  │  │  │  ├─ admin.html
│  │  │  │  │  ├─ admin.spec.ts
│  │  │  │  │  └─ admin.ts
│  │  │  │  ├─ crucigrama
│  │  │  │  │  ├─ crucigrama.css
│  │  │  │  │  ├─ crucigrama.html
│  │  │  │  │  ├─ crucigrama.spec.ts
│  │  │  │  │  └─ crucigrama.ts
│  │  │  │  ├─ dom-demo
│  │  │  │  │  ├─ dom-demo.css
│  │  │  │  │  ├─ dom-demo.html
│  │  │  │  │  ├─ dom-demo.spec.ts
│  │  │  │  │  └─ dom-demo.ts
│  │  │  │  ├─ home
│  │  │  │  │  ├─ home.css
│  │  │  │  │  ├─ home.html
│  │  │  │  │  ├─ home.spec.ts
│  │  │  │  │  └─ home.ts
│  │  │  │  ├─ login
│  │  │  │  │  ├─ login.css
│  │  │  │  │  ├─ login.html
│  │  │  │  │  ├─ login.spec.ts
│  │  │  │  │  └─ login.ts
│  │  │  │  ├─ profile
│  │  │  │  │  ├─ profile.css
│  │  │  │  │  ├─ profile.html
│  │  │  │  │  ├─ profile.spec.ts
│  │  │  │  │  └─ profile.ts
│  │  │  │  ├─ register
│  │  │  │  │  ├─ register.css
│  │  │  │  │  ├─ register.html
│  │  │  │  │  ├─ register.spec.ts
│  │  │  │  │  └─ register.ts
│  │  │  │  ├─ sudoku
│  │  │  │  │  ├─ sudoku.css
│  │  │  │  │  ├─ sudoku.html
│  │  │  │  │  ├─ sudoku.spec.ts
│  │  │  │  │  └─ sudoku.ts
│  │  │  │  └─ task-manager
│  │  │  │     ├─ task-manager.css
│  │  │  │     ├─ task-manager.html
│  │  │  │     ├─ task-manager.spec.ts
│  │  │  │     └─ task-manager.ts
│  │  │  └─ services
│  │  │     ├─ api.spec.ts
│  │  │     ├─ api.ts
│  │  │     ├─ auth.spec.ts
│  │  │     └─ auth.ts
│  │  ├─ index.html
│  │  ├─ main.server.ts
│  │  ├─ main.ts
│  │  ├─ server.ts
│  │  └─ styles.css
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  └─ tsconfig.spec.json
└─ Researchelastic.txt

```