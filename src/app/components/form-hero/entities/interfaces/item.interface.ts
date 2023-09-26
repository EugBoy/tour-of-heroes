import { LItem } from "../enums/item.enum";

/**
 * Интерфейс данных о объекта
 *
 * @param {number} ID - идентификатор объекта
 * @param {string} NAME - название объекта
 */
export interface ItemApi {
  [LItem.ID]? : number;
  [LItem.NAME] : string;
}
