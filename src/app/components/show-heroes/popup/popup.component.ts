import { Component } from '@angular/core';
import {LHero} from "../../form-hero/entities/enums/hero.enum";
import {LItem} from "../../form-hero/entities/enums/item.enum";
import {Observable} from "rxjs";
import {HeroApi} from "../../form-hero/entities/interfaces/hero.interface";
import {ItemApi} from "../../form-hero/entities/interfaces/item.interface";
import {FormGroup} from "@angular/forms";
import {AppService} from "../../../entities/services/app.service";
import {FilterHeroesService} from "../entities/services/filter-heroes.service";
import {ChangeHeroService} from "../entities/services/change-hero.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  public skills$: Observable<ItemApi[]> = this._appService.skills$;

  public isPopupVisible: boolean = false;

  public changeHeroForm: FormGroup = this._changeHeroService.getForm();
  constructor(public readonly _appService : AppService,
              private readonly _changeHeroService: ChangeHeroService) {
  }
  //
  // public ngOnInit() {
  //   this._appService.getHeroes();
  // }
  //
  // public togglePopup(hero: HeroApi, id: number): void {
  //   this.isPopupVisible = !this.isPopupVisible;
  //   this.changeHeroForm.controls[LItem.NAME].setValue(hero[LItem.NAME])
  //   this.changeHeroForm.controls[LHero.POWER].setValue(hero[LHero.POWER])
  //   this.changeHeroForm.controls[LHero.SKILLS].setValue(hero[LHero.SKILLS])
  //   this.changeHeroForm.controls[LHero.LEVEL].setValue(hero[LHero.LEVEL])
  // }
  //
  // public changeHero(id: number){
  //   this._changeHeroService.changeHero(id);
  //   this.isPopupVisible = !this.isPopupVisible;
  // }
  //
  // protected readonly LItem = LItem;
  // protected readonly LHero = LHero;

}
