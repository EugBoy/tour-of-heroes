import { HeroLabels } from "../enums/hero.enum";

/**
 * Интерфейс данных о герое с учётом текущих компонентов
 *
 * @param {number} ID - личный идентификатор героя
 * @param {string} NAME - имя героя
 * @param {string} POWER - сила героя
 * @param {string[]} SKILLS - навыки героя
 * @param {number} LEVEL - уровень героя
 */
export interface HeroApi {
  [HeroLabels.ID] : number;
  [HeroLabels.NAME] : string;
  [HeroLabels.POWER] : string;
  [HeroLabels.SKILLS] : string[];
  [HeroLabels.LEVEL] : number;


}

