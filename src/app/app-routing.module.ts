import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data:{
      preload: true
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];
/* PreloadAllModules sirve para hacer cargas de modulos despues de iniciar la aplicacion
  es bueno para app que tengan pocos modulos. pero si existen app con mas de 50 modulos, 100, se aconseja el uso
  de PreloadingStrategy interface en un service
*/

/*
Con PreloadingStrategy inplementada en un service configuramos que modulos se cargaran, en este caso seria
los que contengan el dato (preloaod: true) en las rutas sino no se cargaran cuando el usuario inicie
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //preloadingStrategy: PreloadAllModules
    preloadingStrategy: CustomPreloadService
  }), FormsModule],
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }
