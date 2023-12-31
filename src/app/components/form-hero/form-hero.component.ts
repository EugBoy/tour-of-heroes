import {Component} from '@angular/core';
import {ItemApi} from "./entities/interfaces/item.interface";
import {FormGroup} from '@angular/forms'
import {AppService} from "../../entities/services/app.service";
import {Observable} from "rxjs";
import {FormHeroService} from "./entities/services/form-hero.service"
import {LItem} from "./entities/enums/item.enum";
import {LHero} from "./entities/enums/hero.enum";

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent {

  public skills$: Observable<ItemApi[]> = this._appService.skills$;
  public heroForm: FormGroup = this._formHeroService.getForm();

  constructor(
    private readonly _appService: AppService,
    private readonly _formHeroService: FormHeroService) {
  }

  /**
   * Метод обращения к FormHeroService для добавления нового героя
   */
  public addHero(){
    this._formHeroService.addHero(this.heroForm)
  }

  protected readonly LItem = LItem;
  protected readonly LHero = LHero;
}
