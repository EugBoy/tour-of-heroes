import {LItem} from "../labels/item.label";

/**
 * Интерфейс данных об объекте
 *
 * @param {number} ID - идентификатор объекта
 * @param {string} NAME - название объекта
 */
export interface IItem {
  [LItem.ID]? : number;
  [LItem.NAME] : string;
}
