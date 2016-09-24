import { Component, OnDestroy } from '@angular/core';
import { NoteCard, NoteCreator } from '../ui';
import { NoteService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';

@Component({
  selector: 'notes-container',
  directives: [
    NoteCard,
    NoteCreator
  ],
  styles:[`
    .notes {
      padding-top: 30px;
    }
    .creator {
      margin-bottom: 10px;
    }
  `],
  template: `
    <div class="row center-xs notes">
      <div class="col-xs-10 col-sm-8 col-md-9 creator">
        <note-creator (createNote)="onCreateNote($event)"></note-creator>
      </div>
      <div class="notes col-xs-10">
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

export class Notes implements OnDestroy {
  notes = [];

  ngOnDestroy() {
    console.log('destroyed');
  }
  constructor(private noteService: NoteService, private store: Store) {

    this.store.changes.pluck('notes')
    .subscribe((notes: any) => this.notes = notes);

    this.noteService.getNotes()
    .subscribe();
  }

  onNoteChecked(note) {
    this.noteService.completeNote(note)
    .subscribe()
  }

  onCreateNote(note) {
    this.noteService.createNote(note)
    .subscribe();
  }


}
