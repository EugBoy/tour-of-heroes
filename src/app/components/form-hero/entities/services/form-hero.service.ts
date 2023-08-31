import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HeroApi } from "../interfaces/hero.interface";
import { isNumeric } from "devextreme/core/utils/type";
import { AppService } from "../../../../entities/services/app.service";

@Injectable({
  providedIn: 'root'
})
export class FormHeroService {
  public heroForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
              private readonly appService: AppService) {
    this.heroForm = fb.group({
      name: '',
      power: '',
      skills: [],
      level: '',
    })
  }
  public getForm(): FormGroup{
    return this.heroForm
  }

  public addHero(){
    let skills: string[] = String(this.heroForm.controls['skills'].value).split(',')
    let hero: HeroApi = {
      id: 0,
      name: this.heroForm.controls['name'].value!,
      power: this.heroForm.controls['power'].value!,
      skills: skills,
      level: Number(this.heroForm.controls['level'].value),
    }
    if (( hero.name!.length >= 2) && (hero.power!.length >=2) && (isNumeric(hero.level))) {
      this.appService.addHero(hero);
      this.heroForm.reset();
    } else {
      alert('You have made mistake.')
    }
  }

}


