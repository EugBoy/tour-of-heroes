import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../entities/services/app.service";

@Injectable({
  providedIn: 'root'
})
export class SkillFormBuildService {
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService
  ) {
  }

  /**
   * Метод возвращает форму нового навыка.
   */
  public getSkillControl(): FormControl {
    return this._formBuilder.control('', [Validators.minLength(2)])
  }
}
