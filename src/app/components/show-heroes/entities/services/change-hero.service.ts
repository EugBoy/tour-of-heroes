import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppService } from "../../../../entities/services/app.service";
import { HeroApi } from "../../../form-hero/entities/interfaces/hero.interface";
import { HeroLabels } from "../../../form-hero/entities/enums/hero.enum";
import { isNumeric } from "devextreme/core/utils/type";

@Injectable({
  providedIn: 'root'
})
export class ChangeHeroService {

  public changeHeroForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
              private readonly appService: AppService,) {
    this.changeHeroForm = fb.group({
      id: '',
      name: '',
      power: '',
      skills: [],
      level: '',

    })
  }

  public getForm(): FormGroup {
    return this.changeHeroForm
  }

  public changeHero(id: number){
    let changedHero: HeroApi = {
      id,
      name: this.changeHeroForm.controls['name'].value,
      power:this.changeHeroForm.controls['power'].value,
      skills: this.changeHeroForm.controls['skills'].value,
      level: Number(this.changeHeroForm.controls['level'].value),
    }
    if (( changedHero[HeroLabels.NAME]!.length >= 2) && (changedHero[HeroLabels.POWER]!.length >=2) && (isNumeric(changedHero[HeroLabels.LEVEL]))) {
      this.appService.changeHero(changedHero);
      this.changeHeroForm.reset()
    } else {
      alert('You have made mistake.')
    }
  }
}
