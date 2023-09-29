import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../entities/services/app.service";
import {LHero} from "../labels/hero.label";
import {LItem} from "../labels/item.label";

@Injectable({
  providedIn: 'root'
})
export class HeroFormBuildService {

  constructor (
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService
  ) {
  }

  /**
   * Метод возвращает форму героя.
   */
  public getHeroForm(): FormGroup{
    return this._formBuilder.group({
      [LItem.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [LHero.POWER]: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      [LHero.SKILLS]: ['', [Validators.required]],
      [LHero.LEVEL]: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }
}


