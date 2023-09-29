import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SkillFormBuildService} from "./entities/services/skill-form-build.service";
import {LHero} from "../form-hero/entities/labels/hero.label";
import {LItem} from "../form-hero/entities/labels/item.label";
import {AppService} from "../../entities/services/app.service";

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.scss']
})
export class FormSkillComponent {

  public skillNameControl: FormControl = this._formSkillService.getSkillControl();

  public LHero: typeof LHero = LHero;
  public LItem: typeof LItem = LItem;

  constructor (
    private readonly _appService: AppService,
    private readonly _formSkillService: SkillFormBuildService
  ) {
  }

  /**
   * Метод добавления нового навыка
   *
   * @param {FormControl} skillNameControl - поле, в которое вводят имя нового навыка.
   */
  public addSkill(skillNameControl: FormControl): void {
    if (skillNameControl.valid){
      this._appService.addSkill(skillNameControl.value);
      skillNameControl.reset();
    } else {
      alert('Вы допустили ошибку.');
    }
  }
}
