import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../../../entities/services/app.service";
import {LHero} from "../../../../../../form-hero/entities/labels/hero.label";
import {LItem} from "../../../../../../form-hero/entities/labels/item.label";

@Injectable({
  providedIn: 'root'
})
export class PopupHeroFormService {

  constructor (
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService
  ) {
  }

  /**
   * Метод создания формы для изменения данных о герое
   */
  public getChangeHeroForm(): FormGroup {
    return this._formBuilder.group({
      [LItem.ID]: [''],
      [LItem.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [LHero.POWER]: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      [LHero.SKILLS]: ['', [Validators.required]],
      [LHero.LEVEL]: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }
}
