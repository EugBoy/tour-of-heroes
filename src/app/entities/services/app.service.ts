import {OnInit, DestroyRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import { HeroApi } from "../../components/form-hero/entities/interfaces/hero.interface";
import { ItemApi } from "../../components/form-hero/entities/interfaces/item.interface";
import { LItem } from "../../components/form-hero/entities/enums/item.enum";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService{

  private _heroes$$: BehaviorSubject<HeroApi[]> = new BehaviorSubject<HeroApi[]>([]);
  public heroes$: Observable<HeroApi[]> = this._heroes$$.asObservable();

  private _skills$$: BehaviorSubject<ItemApi[]> = new BehaviorSubject<ItemApi[]>([{id: 1,name:'speed'}]);
  public skills$: Observable<ItemApi[]> = this._skills$$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly _destroyRef: DestroyRef) {
  }

  /**
   * Метод получения данных с сервера.
   */
  public getHeroes(): any {
      this.http.get<HeroApi[]>('http://127.0.0.1:3000/items')
        .pipe(tap( (heroes: HeroApi[]) => {
          this._heroes$$.next(heroes)
        }))
        .subscribe()
  }

  /**
   * Метод отправки данных о герое на сервер и получения новых данных героев с сервера.
   *
   *@param {HeroApi} hero - данные о герое.
   */
   public addHero (hero: HeroApi){
     this.http.post<HeroApi>('http://127.0.0.1:3000/items', hero)
      .subscribe();
    this.getHeroes()
  }

  /**
   * Метод изменения данных о герое и получения новых данных о героях.
   *
   * @param {HeroApi} changedHero - данные изменившегося героя
   */
  public changeHero(changedHero: HeroApi){
    this.http.put('http://127.0.0.1:3000/items/'+changedHero[LItem.ID], changedHero)
      .subscribe();
    this.getHeroes()

  }

  /**
   *
   * @param {[ItemApi.NAME]} skill - имя нового навыка
   */
  public addSkill(skill: ItemApi): void{
    const skills: ItemApi[] = this._skills$$.value;
    const skillsLen: number = skills.length;
    const skillID: number = skills[skillsLen-1][LItem.ID]!+1;
    const newSkill: ItemApi = {
      ...skill,
      [LItem.ID]: skillID
    }
    this._skills$$.next([...skills, newSkill])
  }
}
