import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FilterHeroesService {

  constructor(private readonly _formBuilder: FormBuilder) {
  }

  /**
   * Метод создания формы для фильтрации
   */
  public getForm(): FormGroup{
    return this._formBuilder.group({
      levelDown: [''],
      levelUp: [''],
      skills: [''],
      name: [''],
      sort: false,
    })
  }
}
