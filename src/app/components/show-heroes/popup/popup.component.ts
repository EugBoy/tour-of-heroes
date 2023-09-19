import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ItemApi} from "../../form-hero/entities/interfaces/item.interface";
import {FormGroup} from "@angular/forms";
import {AppService} from "../../../entities/services/app.service";
import {PopupService} from "./entities/services/popup.service";
import {HeroApi} from "../../form-hero/entities/interfaces/hero.interface";
import {LItem} from "../../form-hero/entities/enums/item.enum";
import {LHero} from "../../form-hero/entities/enums/hero.enum";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{

  @Input() public currentHero: any;
  @Input() public isPopupVisible: boolean = false;
  @Input() public currentId: number = 0;

  public skills$: Observable<ItemApi[]> = this._appService.skills$;
  public changeHeroForm: FormGroup = this._popupService.getForm();
  constructor(public readonly _appService : AppService,
              private readonly _popupService: PopupService) {
  }

  public ngOnInit(): void {
    this.changeHeroForm.get([LItem.NAME])?.setValue(this.currentHero[LItem.NAME]);
    this.changeHeroForm.get([LHero.POWER])?.setValue(this.currentHero[LHero.POWER]);
    this.changeHeroForm.get([LHero.SKILLS])?.setValue(this.currentHero[LHero.SKILLS]);
    this.changeHeroForm.get([LHero.LEVEL])?.setValue(this.currentHero[LHero.LEVEL]);
  }

  public changeHero(id: number){
    this._popupService.changeHero(this.changeHeroForm, id);
    this.isPopupVisible = !this.isPopupVisible;

  }

  protected readonly LItem = LItem;
  protected readonly LHero = LHero;
}
