import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';
import { authGuard } from './guards/auth-guard';
import { Admin } from './pages/admin/admin'; // El componente que quieres proteger
import { Crucigrama } from './pages/crucigrama/crucigrama';
import { DomDemo } from './pages/dom-demo/dom-demo';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { AyudaSoporte } from './pages/pageLegalSoporte/ayuda-soporte/ayuda-soporte';
import { Contacto } from './pages/pageLegalSoporte/contacto/contacto';
import { Cookies } from './pages/pageLegalSoporte/cookies/cookies';
import { Faq } from './pages/pageLegalSoporte/faq/faq';
import { Privacidad } from './pages/pageLegalSoporte/privacidad/privacidad';
import { Terminos } from './pages/pageLegalSoporte/terminos/terminos';
import { Profile } from './pages/profile/profile';
import { Register } from './pages/register/register';
import { Sudoku } from './pages/sudoku/sudoku';
import { TaskManager } from './pages/task-manager/task-manager';

export const routes: Routes = [
    // 1. Rutas Públicas
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'sudoku', component: Sudoku },
    { path: 'crucigrama', component: Crucigrama },

    // 1.1 Rutas Legales / Soporte del footer (públicas: el footer se ve sin sesión también)
    { path: 'legal/terminos', component: Terminos },
    { path: 'legal/privacidad', component: Privacidad },
    { path: 'legal/cookies', component: Cookies },
    { path: 'soporte/contacto', component: Contacto },
    { path: 'soporte/faq', component: Faq },
    { path: 'soporte/ayuda', component: AyudaSoporte },

    // 2. Rutas Protegidas (Requieren Login)
    { 
        path: 'home', 
        component: Home, 
        canActivate: [authGuard] 
    },
    { 
        path: 'dom-demo', 
        component: DomDemo, 
        canActivate: [authGuard] 
    },
    { 
        path: 'task-manager', 
        component: TaskManager, 
        canActivate: [authGuard] 
    },
    { 
        path: 'profile', 
        component: Profile, 
        canActivate: [authGuard] 
    },

    // 3. Rutas de Administración (Requieren Rol ADMIN)
    {
        path: 'admin', 
        component: Admin,
        canActivate: [authGuard, adminGuard] // 🔥 IMPORTANTE: Pon ambos. 
    },
    
    // 4. Redirección inicial
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // 5. EL COMODÍN SIEMPRE AL FINAL
    { path: '**', redirectTo: 'home' }
];
