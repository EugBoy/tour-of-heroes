import {Component, OnInit} from '@angular/core';
import { Observable, take } from "rxjs";
import { AppService } from "../../entities/services/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { isNumeric } from "devextreme/core/utils/type";
import { LHero } from "../form-hero/entities/enums/hero.enum";
import { LItem } from "../form-hero/entities/enums/item.enum";
import { HeroApi } from "../form-hero/entities/interfaces/hero.interface";
import { ItemApi } from "../form-hero/entities/interfaces/item.interface";
import { FilterHeroesService } from "./entities/services/filter-heroes.service";
import { ChangeHeroService } from "./entities/services/change-hero.service";


@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss']
})

export class ShowHeroesComponent implements OnInit {

  public _heroes$$: Observable<HeroApi[]> = this._appService._heroes$$;
  public _skills$$: Observable<ItemApi[]> = this._appService._skills$$;

  public isPopupVisible: boolean = false;

  public filterHeroesForm: FormGroup = this._filterHeroesService.getForm();
  public changeHeroForm: FormGroup = this._changeHeroService.getForm();
  constructor(public readonly _appService : AppService,
              private readonly _filterHeroesService: FilterHeroesService,
              private readonly _changeHeroService: ChangeHeroService) {
  }

  public ngOnInit() {
    this._appService.getHeroes();
  }

  public togglePopup(hero: HeroApi, id: number): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.changeHeroForm.controls[LItem.NAME].setValue(hero[LItem.NAME])
    this.changeHeroForm.controls[LHero.POWER].setValue(hero[LHero.POWER])
    this.changeHeroForm.controls[LHero.SKILLS].setValue(hero[LHero.SKILLS])
    this.changeHeroForm.controls[LHero.LEVEL].setValue(hero[LHero.LEVEL])
  }

  public changeHero(id: number){
    this._changeHeroService.changeHero(id);
    this.isPopupVisible = !this.isPopupVisible;
  }

  protected readonly LItem = LItem;
  protected readonly LHero = LHero;

}
