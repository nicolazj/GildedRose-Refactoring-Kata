const ITEM_AGED_BRIE = "Aged Brie";
const ITEM_BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const ITEM_SULFURAS = "Sulfuras, Hand of Ragnaros";
const ITEM_CONJURED = "Conjured Mana Cake";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      switch (item.name) {
        case ITEM_SULFURAS:
          // “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
          break;
        case ITEM_AGED_BRIE:
          // “Aged Brie” actually increases in Quality the older it gets
          item.quality += 1;
          // Once the sell by date has passed, Quality degrades twice as fast
          if (item.sellIn <= 0) {
            item.quality += 1;
          }
          item.quality = Math.min(item.quality, MAX_QUALITY);
          item.sellIn += -1;
          break;

        case ITEM_BACKSTAGE_PASSES:
          // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
          // Quality drops to 0 after the concert
          if (item.sellIn > 10) {
            item.quality += 1;
          } else if (item.sellIn > 5) {
            item.quality += 2;
          } else if (item.sellIn > 0) {
            item.quality += 3;
          } else {
            item.quality = 0;
          }
          item.quality = Math.min(item.quality, MAX_QUALITY);
          item.sellIn += -1;
          break;

        case ITEM_CONJURED:
          //“Conjured” items degrade in Quality twice as fast as normal items
          item.quality -= 2;
          // Once the sell by date has passed, Quality degrades twice as fast
          if (item.sellIn <=0) item.quality -= 2;
          item.quality = Math.max(item.quality, MIN_QUALITY);
          item.sellIn += -1;
          break;

        default:
          // Once the sell by date has passed, Quality degrades twice as fast
          if (item.sellIn <= 0) item.quality -= 1 * 2;
          else item.quality -= 1;
          item.quality = Math.max(item.quality, MIN_QUALITY);
          item.sellIn += -1;
          break;
      }
    }

    return this.items;
  }
}
