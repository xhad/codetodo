import { Component } from '@angular/core';
import { NoteCard, NoteCreator } from '../ui';

@Component({
  selector: 'notes-container',
  directives: [
    NoteCard,
    NoteCreator
  ],
  styles:[`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px;
    }
  `],
  template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        <note-creator (createNote)="onCreateNote($event)"></note-creator>
      </div>
      <div class="notes col-xs-8">
        <div class="row pull-left">
          <note-card
          class="col-xs-12 col-sm-6 col-md-4"
          [note]="note"
          *ngFor="let note of notes; let i = index;"
          (checked)="onNoteChecked($event, i)"
        >
        </note-card>
        </div>
        </div>
      </div>
  `
})

export class Notes {
  notes = [
    {
      title: 'Change the World',
    value: 'Open laptop and commence changing world.',
    color: '#B3E5FC'
  },
  {
    title: 'Buy wife gift',
    value: 'Perhaps something that is realated to "coding"',
    color: '#80D8FF'
  },
    {
      title: 'Study Math',
      value: 'Start with that Physics MOOK, then maybe a touch of Linear Algebra.',
      color: '#B2EBF2'}
  ]

  onNoteChecked(note, i) {
    this.notes.splice(i, 1);
  }

  onCreateNote(note) {
    this.notes.push(note);
  }


}
