import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'rank-page',
    pathMatch: 'full'
  },
  {
    path: 'rank-page',
    loadChildren: () => import('./pages/binance-launch-pool-rank/binance-launch-pool-rank.module').then( m => m.BinanceLaunchPoolRankPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
