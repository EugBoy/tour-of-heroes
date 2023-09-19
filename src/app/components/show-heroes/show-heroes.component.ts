import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable, take } from "rxjs";
import { AppService } from "../../entities/services/app.service";
import { FormGroup } from "@angular/forms";
import { LHero } from "../form-hero/entities/enums/hero.enum";
import { LItem } from "../form-hero/entities/enums/item.enum";
import { HeroApi } from "../form-hero/entities/interfaces/hero.interface";
import { ItemApi } from "../form-hero/entities/interfaces/item.interface";
import { FilterHeroesService } from "./entities/services/filter-heroes.service";


@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss']
})

export class ShowHeroesComponent implements OnInit {
  public skills$: Observable<ItemApi[]> = this._appService.skills$;
  public heroes$: Observable<HeroApi[]> = this._appService.heroes$;

  public filterHeroesForm: FormGroup = this._filterHeroesService.getForm();

  public currentHero: HeroApi = <HeroApi>{};
  public isPopupVisible: boolean = false;


  constructor(
    public readonly _appService : AppService,
    private readonly _filterHeroesService: FilterHeroesService,
  ) {
  }

  public ngOnInit() {
    this._appService.getHeroes();
  }

  public openEditHeroPopup(hero: HeroApi): void {
    this.currentHero = hero;
    this.isPopupVisible = true;
  }

  protected readonly LItem = LItem;
  protected readonly LHero = LHero;


  protected readonly console = console;
}
