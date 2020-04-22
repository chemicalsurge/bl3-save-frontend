import { Component, Input, OnInit } from '@angular/core';
import { CURRENCIES, getExpForLevel, getLevelForExp } from '../const';
import { CharacterWrapper } from '../model';

@Component({
  selector: 'bls-character-form',
  template: `
    <form>
      <mat-form-field>
        <input matInput
               name="level"
               #lvl="ngModel"
               [(ngModel)]="level"
               type="number"
               max="57"
               min="1"/>
        <mat-label>Level</mat-label>
      </mat-form-field>
      <div fxLayout="row" fxLayoutAlign="space-between" fxLayoutGap="10px">
        <mat-card fxFlex="1 0">
          <mat-card-title>Inventory Slots</mat-card-title>
          <mat-card-content fxLayout="column">
            <mat-slide-toggle
              [checked]="isSlotEnabled('Weapon1')"
              (change)="toggleSlot('Weapon1', $event.checked)"
            >Weapon 1</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('Weapon2')"
              (change)="toggleSlot('Weapon2', $event.checked)"
            >Weapon 2</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('Weapon3')"
              (change)="toggleSlot('Weapon3', $event.checked)"
            >Weapon 3</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('Weapon4')"
              (change)="toggleSlot('Weapon4', $event.checked)"
            >Weapon 4</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('Shield')"
              (change)="toggleSlot('Shield', $event.checked)"
            >Shield</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('Grenade')"
              (change)="toggleSlot('GrenadeMod', $event.checked)"
            >Grenade</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('ClassMod')"
              (change)="toggleSlot('ClassMod', $event.checked)"
            >Class Mod</mat-slide-toggle>
            <mat-slide-toggle
              [checked]="isSlotEnabled('Artifact')"
              (change)="toggleSlot('Artifact', $event.checked)"
            >Artifact</mat-slide-toggle>
          </mat-card-content>
        </mat-card>
        <mat-card fxFlex="1 0">
          <mat-card-title>SDUs</mat-card-title>
          <mat-card-content fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="space-between">
            <div fxLayout="column">
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_backpack"
                       [value]="getSDULevel('Backpack')"
                       (change)="setSDULevel('Backpack', +$event)" />
                <mat-label>Backpack</mat-label>
              </mat-form-field>
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_smg"
                       [value]="getSDULevel('SMG')"
                       (change)="setSDULevel('SMG', +$event)" />
                <mat-label>SMG</mat-label>
              </mat-form-field>
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_assault"
                       [value]="getSDULevel('Assault')"
                       (change)="setSDULevel('Assault', +$event)" />
                <mat-label>Assault Rifle</mat-label>
              </mat-form-field>
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_shotgun"
                       [value]="getSDULevel('Shotgun')"
                       (change)="setSDULevel('Shotgun', +$event)" />
                <mat-label>Shotgun</mat-label>
              </mat-form-field>
            </div>
            <div fxLayout="column">
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_pistol"
                       [value]="getSDULevel('Pistol')"
                       (change)="setSDULevel('Pistol', +$event)" />
                <mat-label>Pistol</mat-label>
              </mat-form-field>
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_sniper"
                       [value]="getSDULevel('Sniper')"
                       (change)="setSDULevel('Sniper', +$event)" />
                <mat-label>Sniper Rifle</mat-label>
              </mat-form-field>
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_heavy"
                       [value]="getSDULevel('Heavy')"
                       (change)="setSDULevel('Heavy', +$event)" />
                <mat-label>Heavy</mat-label>
              </mat-form-field>
              <mat-form-field>
                <input matInput type="number"
                       name="sdu_grenade"
                       [value]="getSDULevel('Grenade')"
                       (change)="setSDULevel('Grenade', +$event)" />
                <mat-label>Grenade</mat-label>
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card fxFlex="1 0">
          <mat-card-title>Currencies</mat-card-title>
          <mat-card-content fxLayout="column">
            <mat-form-field>
              <input matInput
                     name="money"
                     [(ngModel)]="money"
                     type="number"/>
              <mat-label>Money</mat-label>
            </mat-form-field>
            <mat-form-field>
              <input matInput
                     name="eridium"
                     [(ngModel)]="eridium"
                     type="number"/>
              <mat-label>Eridium</mat-label>
            </mat-form-field>
          </mat-card-content>
        </mat-card>
      </div>
    </form>
  `,
  styles: []
})
export class CharacterFormComponent implements OnInit {

  @Input()
  data: CharacterWrapper;

  get level(): number {
    return getLevelForExp(this.data.character.experience_points);
  }
  set level(l: number) {
    this.data.character.experience_points = getExpForLevel(l);
  }

  get eridium(): number {
    if (this.data.character.inventory_category_list.filter(l => l.base_category_definition_hash === CURRENCIES.eridium).length === 0) {
      this.data.character.inventory_category_list.push({
        base_category_definition_hash: CURRENCIES.eridium,
        quantity: 0
      });
    }
    return this.data.character.inventory_category_list.filter(l => l.base_category_definition_hash === CURRENCIES.eridium)[0].quantity;
  }
  set eridium(e: number) {
    if (this.data.character.inventory_category_list.filter(l => l.base_category_definition_hash === CURRENCIES.eridium).length === 0) {
      this.data.character.inventory_category_list.push({
        base_category_definition_hash: CURRENCIES.eridium,
        quantity: 0
      });
    }
    this.data.character.inventory_category_list.filter(l => l.base_category_definition_hash === CURRENCIES.eridium)[0].quantity = e;
  }
  get money(): number {
    return this.data.character.inventory_category_list.filter(l => l.base_category_definition_hash === CURRENCIES.money)[0].quantity;
  }
  set money(m: number) {
    this.data.character.inventory_category_list.filter(l => l.base_category_definition_hash === CURRENCIES.money)[0].quantity = m;
  }

  constructor() { }

  ngOnInit(): void {
  }

  isSlotEnabled(key: string) {
    return this.data.character.equipped_inventory_list.some(i => i.slot_data_path.includes(key) && i.enabled);
  }

  toggleSlot(key: string, enabled: boolean) {
    this.data.character.equipped_inventory_list.filter(i => i.slot_data_path.includes(key)).forEach(i => i.enabled = enabled);
  }

  getSDULevel(key: string): number {
    const [sdu] = this.data.character.sdu_list.filter(s => s.sdu_data_path.includes(key));
    return sdu ? sdu.sdu_level : 0;
  }

  setSDULevel(key: string, value: number) {
    const [sdu] = this.data.character.sdu_list.filter(s => s.sdu_data_path.includes(key));
    if (sdu) sdu.sdu_level = value;
    else {
      console.log('error: no sdu by that key found. report this to the developer.');
    }
  }
}
