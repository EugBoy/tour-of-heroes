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
export class ChangeHeroService{

  public changeHeroForm: FormGroup = this._formBuilder.group({
    [LItem.ID]: '',
    [LItem.NAME]: '',
    [LHero.POWER]: '',
    [LHero.SKILLS]: [],
    [LHero.LEVEL]: '',

  });
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _appService: AppService) {
  }

  public getForm(): FormGroup {
    return this.changeHeroForm
  }

  public changeHero(id: number){
    let changedHero: HeroApi = {
      id,
      name: this.controls[LItem.NAME].value,
      power:this.controls[LHero.POWER].value,
      skills: this.controls[LHero.SKILLS].value,
      level: Number(this.controls[LHero.LEVEL].value),
    }
    if (( changedHero[LItem.NAME]!.length >= 2) && (changedHero[LHero.POWER]!.length >=2) && (isNumeric(changedHero[LHero.LEVEL]))) {
      this._appService.changeHero(changedHero);
      this.changeHeroForm.reset()
    } else {
      alert('You have made mistake.')
    }
  }

  get controls(){
    return this.changeHeroForm.controls
  }
}
