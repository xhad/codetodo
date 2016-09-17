import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { ColorPicker } from './color-picker';

@Component({
  selector: 'note-creator',
  directives: [ColorPicker],
  styles: [`
  .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  `],
  template: `
  <div
    class="note-creator shadow-2"
    [ngStyle]="{'background-color': newNote.color}"
  >
    <form class="row" (submit)="onCreateNote()">
      <input
        type="text"
        [(ngModel)]="newNote.title"
        name="newNoteTitle"
        placeholder="Title"
        class="col-xs-10 title"
        *ngIf="fullForm"
      >
      <input
        type="text"
        (focus)="toggle(true)"
        [(ngModel)]="newNote.value"
        name="newNoteValue"
        placeholder="description of code todo..."
        class="col-xs-10"

      >
      <div class="actions col-xs-12 row between-xs"
      *ngIf="fullForm"
      >
      <div class="col-xs-3">
      <color-picker
        (selected)="onColorSelect($event)"
        [colors]="colors"
      ></color-picker>
      </div>
        <button
          type="submit"
          class="btn-light"
         >
          Done
        </button>
      </div>
    </form>
  </div>
  `
})

export class NoteCreator {
  @Output() createNote = new EventEmitter();

  colors: Array<string> = [
    '#B3E5FC',
    '#B2EBF2',
    '#B2DFDB',
    '#C8E6C9',
    '#DCEDC8',
    '#F0F4C3'
  ];

  newNote = {
    title: '',
    value: '',
    color: 'white'
  };

  fullForm: boolean = false;

  onColorSelect(color: string) {
    this.newNote.color = color;
  }

  onCreateNote() {
    console.log('submitted')
    const { title, value , color} = this.newNote;

    if (title && value) {
      this.createNote.emit({title, value, color});
      this.reset();
    }
  }

  reset() {
    this.newNote = {
      title: '',
      value: '',
      color: 'white'
    }
    this.fullForm = false;
  }

  toggle(value: boolean) {
    this.fullForm = value;
  }
}
