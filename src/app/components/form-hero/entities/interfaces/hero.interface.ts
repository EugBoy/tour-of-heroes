import { LHero } from "../enums/hero.enum";
import { ItemApi } from "./item.interface";

/**
 * Интерфейс данных о герое
 *
 * @param {number} POWER - сила героя
 * @param {string[]} SKILLS - навыки героя
 * @param {number} LEVEL - уровень героя
 * @implements ItemApi
 */
export interface HeroApi extends ItemApi{
  [LHero.POWER] : number;
  [LHero.SKILLS] : string[];
  [LHero.LEVEL] : number;

}

