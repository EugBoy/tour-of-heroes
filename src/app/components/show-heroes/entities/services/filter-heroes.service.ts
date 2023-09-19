import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FilterHeroesService {
  filterHeroes: FormGroup = this._formBuilder.group({
    levelDown: '',
    levelUp: '',
    skills: [],
    name: '',
    sort: false,
  })

  constructor(private readonly _formBuilder: FormBuilder) {
  }

  public getForm(): FormGroup{
    return this.filterHeroes
  }
}
