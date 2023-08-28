import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  DxValidatorModule,
  DxButtonModule,
  DxTextBoxModule,
  DxTagBoxModule,
  DxAccordionModule,
  DxCheckBoxModule, DxPopupModule
} from "devextreme-angular";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormHeroComponent } from './components/form-hero/form-hero.component';
import { ShowHeroesComponent } from './components/show-heroes/show-heroes.component';
import { FilterHeroesPipe } from './components/show-heroes/entities/pipes/filter-heroes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormHeroComponent,
    ShowHeroesComponent,
    FilterHeroesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxTagBoxModule,
    ReactiveFormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxAccordionModule,
    HttpClientModule,
    DxCheckBoxModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
