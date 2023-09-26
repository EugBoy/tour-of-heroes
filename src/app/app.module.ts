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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormHeroComponent } from './components/form-hero/form-hero.component';
import { ShowHeroesComponent } from './components/show-heroes/show-heroes.component';
import { FilterHeroesPipe } from './components/show-heroes/entities/pipes/filter-heroes.pipe';
import { PopupComponent} from "./components/show-heroes/entities/popups/popup/popup.component";
import { FormSkillComponent } from './components/form-skill/form-skill.component';

@NgModule({
  declarations: [
    AppComponent,
    FormHeroComponent,
    ShowHeroesComponent,
    FilterHeroesPipe,
    PopupComponent,
    FormSkillComponent,
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
        DxPopupModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
