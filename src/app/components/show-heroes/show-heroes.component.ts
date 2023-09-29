import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "../../entities/services/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LHero} from "../form-hero/entities/labels/hero.label";
import {LItem} from "../form-hero/entities/labels/item.label";
import {IHero} from "../form-hero/entities/interfaces/hero.interface";
import {IItem} from "../form-hero/entities/interfaces/item.interface";
import {HeroesFilterFormService} from "./entities/services/heroes-filter-form.service";

@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss']
})

export class ShowHeroesComponent implements OnInit {

  public heroesFilterForm: FormGroup = this._heroesFilterFormService.getFilterForm();

  public skills$: Observable<IItem[]> = this._appService.skills$;
  public heroes$: Observable<IHero[]> = this._appService.heroes$;

  public currentHero: IHero = <IHero>{};
  public isPopupVisible: boolean = false;
  public sortStatus: number = 0;

  public LHero: typeof LHero = LHero;
  public LItem: typeof LItem = LItem;

  constructor (
    private readonly _appService : AppService,
    private readonly _heroesFilterFormService: HeroesFilterFormService,
  ) {
  }

  public ngOnInit(): void {
    this._appService.getHeroes();
  }

  /**
   * Метод открытия popup.
   *
   * @param hero {IHero} - герой, данные которого нужно отредактировать
   */
  public openEditHeroPopup(hero: IHero): void {
    this.currentHero = hero;
    this.isPopupVisible = true;
  }

  public sortHeroes(): void {
    this.sortStatus += 1;
  }

  public get levelDownControl(): FormControl {
    return this.heroesFilterForm.get('levelDown') as FormControl
  }

  public get levelUpControl(): FormControl {
    return this.heroesFilterForm.get('levelUp') as FormControl
  }

  public get skillsControl(): FormControl {
    return this.heroesFilterForm.get('skills') as FormControl
  }

  public get nameControl(): FormControl {
    return this.heroesFilterForm.get('name') as FormControl
  }

}
