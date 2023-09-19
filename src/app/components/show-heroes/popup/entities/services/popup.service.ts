import {Injectable, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppService } from "../../../../../entities/services/app.service";
import { HeroApi } from "../../../../form-hero/entities/interfaces/hero.interface";
import { LHero } from "../../../../form-hero/entities/enums/hero.enum";
import { isNumeric } from "devextreme/core/utils/type";
import {LItem} from "../../../../form-hero/entities/enums/item.enum";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _appService: AppService) {
  }

  public getForm(): FormGroup {
    return this._formBuilder.group({
      [LItem.ID]: '',
      [LItem.NAME]: '',
      [LHero.POWER]: '',
      [LHero.SKILLS]: [],
      [LHero.LEVEL]: '',

    });
  }

  public changeHero(changeHeroForm: FormGroup, id: number){
    let changedHero: HeroApi = {... changeHeroForm.getRawValue(), id}
    this._appService.changeHero(changedHero)
    // if (( changedHero[LItem.NAME]!.length >= 2) && (changedHero[LHero.POWER]!.length >=2) && (isNumeric(changedHero[LHero.LEVEL]))) {
    //   this._appService.changeHero(changedHero);
    //   this.popupHeroForm.reset()
    // } else {
    //   alert('You have made mistake.')
    // }
  }

}
