import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HeroApi } from "../interfaces/hero.interface";
import { isNumeric } from "devextreme/core/utils/type";
import { AppService } from "../../../../entities/services/app.service";
import {LHero} from "../enums/hero.enum";
import {LItem} from "../enums/item.enum";

@Injectable({
  providedIn: 'root'
})
export class FormHeroService {
  public heroForm: FormGroup = this._formBuilder.group({
    [LItem.NAME]: ['', [Validators.required, Validators.minLength(2)]],
    [LHero.POWER]: ['', [Validators.required,Validators.minLength(2)]],
    [LHero.SKILLS]: ['', [Validators.required]],
    [LHero.LEVEL]: ['', [Validators.required, Validators.min(1)]],
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
      name: this.controls[LItem.NAME].value,
      power: this.controls[LHero.POWER].value,
      skills: this.controls[LHero.SKILLS].value,
      level: this.controls[LHero.LEVEL].value,
    }

    if (this.heroForm.valid && isNumeric(hero[LHero.LEVEL])){
      this._appService.addHero(hero);
      this.heroForm.reset();
    }
    else {
      alert('При заполнении формы допущена ошибка!')
    }
  }

  get controls(){
    return this.heroForm.controls
  }

}


