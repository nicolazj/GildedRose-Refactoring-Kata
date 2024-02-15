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

  updateSulfuras(item: Item) {
    // “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
    // so does nothing
  }
  updateAgedBrie(item: Item) {
    // “Aged Brie” actually increases in Quality the older it gets
    if (item.sellIn > 0) {
      item.quality += 1;
    } else {
      // Once the sell by date has passed, Quality degrades twice as fast
      item.quality += 2;
    }
  }
  updateBackstagePasses(item: Item) {
    if (item.sellIn > 10) {
      item.quality += 1;
    } else if (item.sellIn > 5) {
      // Quality increases by 2 when there are 10 days or less
      item.quality += 2;
    } else if (item.sellIn > 0) {
      //and by 3 when there are 5 days or less but
      item.quality += 3;
    } else {
      // Quality drops to 0 after the concert
      item.quality = 0;
    }
  }
  updateConjuredItem(item: Item) {
    //“Conjured” items degrade in Quality twice as fast as normal items
    if (item.sellIn > 0) {
      item.quality -= 2;
    } else {
      // Once the sell by date has passed, Quality degrades twice as fast
      item.quality -= 4;
    }
  }

  updateNormalItem(item: Item) {
    // Once the sell by date has passed, Quality degrades twice as fast
    if (item.sellIn > 0) {
      item.quality -= 1;
    } else item.quality -= 2;
  }

  updateSellIn(item: Item) {
    item.sellIn += -1;
  }
  clampQuality(item: Item) {
    if (item.quality > MAX_QUALITY) item.quality = MAX_QUALITY;
    if (item.quality < MIN_QUALITY) item.quality = MIN_QUALITY;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
      // early return;
      if (item.name === ITEM_SULFURAS) continue;

      switch (item.name) {
        case ITEM_AGED_BRIE:
          this.updateAgedBrie(item);
          break;
        case ITEM_BACKSTAGE_PASSES:
          this.updateBackstagePasses(item);
          break;
        case ITEM_CONJURED:
          this.updateConjuredItem(item);
          break;
        default:
          this.updateNormalItem(item);
          break;
      }
      this.clampQuality(item);
      this.updateSellIn(item);
    }

    return this.items;
  }
}
