import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FilterHeroesService {
  filterHeroes: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.filterHeroes = fb.group({
      levelDown: '',
      levelUp: '',
      skills: [],
      name: '',
      sort: false,
    })
  }

  public getForm(): FormGroup{
    return this.filterHeroes
  }


}
