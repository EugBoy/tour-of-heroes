import {OnInit, DestroyRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { HeroApi } from "../../components/form-hero/entities/interfaces/hero.interface";
import { ItemApi } from "../../components/form-hero/entities/interfaces/item.interface";
import { LItem } from "../../components/form-hero/entities/enums/item.enum";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService{

  private heroes$: BehaviorSubject<HeroApi[]> = new BehaviorSubject<HeroApi[]>([]);
  public _heroes$$: Observable<HeroApi[]> = this.heroes$.asObservable();

  private skills$: BehaviorSubject<ItemApi[]> = new BehaviorSubject<ItemApi[]>([{id: 1,name:'speed'}]);
  public _skills$$: Observable<ItemApi[]> = this.skills$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly _destroyRef: DestroyRef) {
  }

  /**
   * Метод получения данных с сервера.
   */
  public getHeroes(): any {
      this.http.get<HeroApi[]>('http://127.0.0.1:3000/items')
        .subscribe( (heroes$: HeroApi[]) => {
          this.heroes$.next(heroes$)
        })
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
    const skills: ItemApi[] = this.skills$.value;
    const skillsLen: number = skills.length;
    const skillID: number = skills[skillsLen-1][LItem.ID]!+1;
    const newSkill: ItemApi = {
      ...skill,
      [LItem.ID]: skillID
    }
    this.skills$.next([...skills, newSkill])
  }
}
