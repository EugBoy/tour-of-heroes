import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {IItem} from "../../../../form-hero/entities/interfaces/item.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {AppService} from "../../../../../entities/services/app.service";
import {PopupHeroFormService} from "./entities/services/popup-hero-form.service";
import {IHero} from "../../../../form-hero/entities/interfaces/hero.interface";
import {LItem} from "../../../../form-hero/entities/labels/item.label";
import {LHero} from "../../../../form-hero/entities/labels/hero.label";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input()
  public currentHero: IHero = <IHero>{};

  @Input()
  public isPopupVisible: boolean = false;

  @Output()
  public isPopupVisibleChange: EventEmitter<false> = new EventEmitter<false>();

  public skills$: Observable<IItem[]> = this._appService.skills$;
  public changeHeroForm: FormGroup = this._popupHeroFormService.getChangeHeroForm();

  public LHero: typeof LHero = LHero;
  public LItem: typeof LItem = LItem;

  constructor(
    private readonly _appService : AppService,
    private readonly _popupHeroFormService: PopupHeroFormService) {
  }

  public ngOnInit(): void {
    this.changeHeroForm.patchValue(this.currentHero)
  }

  /**
   * Метод изменения данных о героя
   *
   * @param {FormGroup} changeHeroForm - форма с изменёнными данными героя
   * @param {[LItem.ID]} id - id изменяемого героя
   */
  public changeHero(changeHeroForm: FormGroup, id: number): void{
    let changedHero: IHero = {... changeHeroForm.getRawValue(), [LItem.ID]:id}
    if (changeHeroForm.valid){
      this._appService.changeHero(changedHero);
      this.close();
    } else {
      alert('При заполнении формы допущена ошибка');
    }
  }

  /**
   * Метод закрытия popup.
   */
  public close(): void {
    this.isPopupVisibleChange.emit(false);
  }

  public get nameControl(): FormControl {
    return this.changeHeroForm.get([LItem.NAME]) as FormControl
  }

  public get powerControl(): FormControl {
    return this.changeHeroForm.get([LHero.POWER]) as FormControl
  }

  public get skillsControl(): FormControl {
    return this.changeHeroForm.get([LHero.SKILLS]) as FormControl
  }

  public get levelControl(): FormControl {
    return this.changeHeroForm.get([LHero.LEVEL]) as FormControl
  }
}
