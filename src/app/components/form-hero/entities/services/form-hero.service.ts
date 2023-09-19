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

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService) {
    }

  /**
   * Метод возвращает форму героя
   */
  public getForm(): FormGroup{
    return this._formBuilder.group({
      [LItem.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [LHero.POWER]: ['', [Validators.required,Validators.minLength(2)]],
      [LHero.SKILLS]: ['', [Validators.required]],
      [LHero.LEVEL]: ['', [Validators.required, Validators.min(1)]],
    });
  }

  /**
   * Метод формирования данных нового героя
   */
  public addHero(heroForm: FormGroup){
    let hero: HeroApi = heroForm.getRawValue();

    if (heroForm.valid && isNumeric(hero[LHero.LEVEL])){
      this._appService.addHero(hero);
      heroForm.reset();
    }
    else {
      alert('При заполнении формы допущена ошибка!')
    }
  }
}


