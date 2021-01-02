import { NgModule } from '@angular/core';
import { DisplayLoadedNumberPipe } from './display-price/display-price.pipe';
import { SortPipe } from './sort/sort.pipe';

@NgModule({
declarations: [DisplayLoadedNumberPipe, SortPipe],
imports: [],
exports: [DisplayLoadedNumberPipe, SortPipe],
})

export class PipesModule {}