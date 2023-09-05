import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HeroApi } from "../interfaces/hero.interface";
import { isNumeric } from "devextreme/core/utils/type";
import { AppService } from "../../../../entities/services/app.service";
import {LHero} from "../enums/hero.enum";

@Injectable({
  providedIn: 'root'
})
export class FormHeroService {
  public heroForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    power: ['', [Validators.required]],
    skills: ['', [Validators.required]],
    level: ['', [Validators.required, Validators.min(1)]],
  });
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService) {
    }

  /**
   * Метод возвращает форму героя
   */
  public getForm(): FormGroup{
    return this.heroForm
  }

  /**
   * Метод формирования данных нового героя
   */
  public addHero(){
    let hero: HeroApi = {
      name: this.heroForm.controls['name'].value,
      power: this.heroForm.controls['power'].value,
      skills: this.heroForm.controls['skills'].value,
      level: this.heroForm.controls['level'].value,
    }

    if (this.heroForm.valid && isNumeric(hero[LHero.LEVEL])){
      this._appService.addHero(hero);
      this.heroForm.reset();
    }
    else {
      alert('При заполнении формы допущена ошибка!')
    }
  }
}


