import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { ColorPicker } from './color-picker';
import { Autosize } from '../directives/autosize'

@Component({
  selector: 'note-creator',
  directives: [ColorPicker, Autosize],
  styles: [`
  .note-creator {
    margin-left: -15px;
    margin-top: 10px;
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      background: transparent;
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  .textarea {
    background: transparent;
    width: 100%;
    border: none;
    overflow: hidden;
    outline: none;
    width: 100%;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
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
      <textarea
      autosize
        class="textarea"
        (focus)="toggle(true)"
        [(ngModel)]="newNote.value"
        name="newNoteValue"
        placeholder="description of code todo..."


      ></textarea>
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
    '#EF9A9A',
    '#B39DDB',
    '#81D4FA',
    '#A5D6A7',
    '#FFF59D',
    '#FFAB91',
    '#B0BEC5',
    '#BCAAA4'
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
