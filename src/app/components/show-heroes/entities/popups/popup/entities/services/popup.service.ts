import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../../../entities/services/app.service";
import {HeroApi} from "../../../../../../form-hero/entities/interfaces/hero.interface";
import {LHero} from "../../../../../../form-hero/entities/enums/hero.enum";
import {LItem} from "../../../../../../form-hero/entities/enums/item.enum";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _appService: AppService) {
  }

  /**
   * Метод создания формы для изменения данных о герое
   */
  public getForm(): FormGroup {
    return this._formBuilder.group({
      [LItem.ID]: [''],
      [LItem.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [LHero.POWER]: ['',[Validators.required, Validators.minLength(2)]],
      [LHero.SKILLS]: ['', [Validators.required]],
      [LHero.LEVEL]: ['', [Validators.required, Validators.min(0)]],
    });
  }

  /**
   * Метод изменения персонажа
   *
   * @param changeHeroForm {HeroApi} - изменённые данные героя
   * @param id {number} - id изменяемого героя
   */
  public changeHero(changeHeroForm: FormGroup, id: number){
    let changedHero: HeroApi = {... changeHeroForm.getRawValue(), id}
    if (changedHero[LItem.NAME].length >=2 && Number(changedHero[LHero.LEVEL]) > 0 && changedHero[LHero.SKILLS] && Number(changedHero[LHero.POWER])>= 0){
      this._appService.changeHero(changedHero)
    } else {
      alert('При заполнении формы допущена ошибка')
    }
  }

}
