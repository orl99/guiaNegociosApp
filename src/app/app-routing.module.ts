import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categories/posts/:catId',
    loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'categories/post/:postId',
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'about-app',
    loadChildren: () => import('./pages/about-app/about-app.module').then( m => m.AboutAppPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'favorito/:postId',
    loadChildren: () => import('./pages/favoritos/favorito/favorito.module').then( m => m.FavoritoPageModule)
  },
  {
    path: 'recursos/categorias',
    loadChildren: () => import('./pages/recursos/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'recursos/recursos/:catId',
    loadChildren: () => import('./pages/recursos/recursos/recursos.module').then( m => m.RecursosPageModule)
  },
  {
    path: 'recursos/recurso/:postId',
    loadChildren: () => import('./pages/recursos/recurso/recurso.module').then( m => m.RecursoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
