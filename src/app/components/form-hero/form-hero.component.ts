import {Component, OnInit} from '@angular/core';
import { ItemApi } from "./entities/interfaces/item.interface";
import { FormGroup } from '@angular/forms'
import { AppService } from "../../entities/services/app.service";
import { Observable } from "rxjs";
import { FormHeroService } from "./entities/services/form-hero.service"
import { FormSkillService} from "./entities/services/form-skill.service";
import {LItem} from "./entities/enums/item.enum";

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent {

  public skills$: Observable<ItemApi[]> = this._appService.skills$;
  public heroForm: FormGroup = this._formHeroService.getForm();
  public skillForm: FormGroup = this._formSkillService.getForm();

  constructor(
    private readonly _appService: AppService,
    private readonly _formHeroService: FormHeroService,
    private readonly _formSkillService: FormSkillService) {
  }

  /**
   * Метод обращения к FormSkillService для добавления нового навыка
   */
  public addSkill(){
    this._formSkillService.addSkill()
  }

  /**
   * Метод обращения к FormHeroService для добавления нового героя
   */
  public addHero(){
    this._formHeroService.addHero()
  }

  protected readonly alert = alert;
  protected readonly LItem = LItem;
}
