import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class PopupComponent implements OnInit, OnChanges {

  @Input() public currentHero: any;
  @Input() public isPopupVisible: boolean = false;

  @Output()
  public isPopupVisibleChange: EventEmitter<false> = new EventEmitter<false>();


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

  public ngOnChanges(changes: SimpleChanges) {
    console.log('current hero', this.currentHero);
    console.log('vis', this.isPopupVisible);
  }

  public changeHero(id: number){
    this._popupService.changeHero(this.changeHeroForm, id);
    this.isPopupVisible = !this.isPopupVisible;

  }

  public close(): void {
    this.isPopupVisibleChange.emit(false);
  }

  protected readonly LItem = LItem;
  protected readonly LHero = LHero;
}
