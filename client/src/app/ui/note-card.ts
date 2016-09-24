import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'note-card',
  styles: [`
.note-card {
  padding: 15px;
  border-radius: 2px;
  width: 100%;
  position: relative;
  word-wrap: break-word;
  margin-bottom: 20px;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  border-bottom: 1px dashed #090909;
  color: rgba(0,0,0,0.8);
}
.value {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 200;

}
.icon {
  position: absolute;
  color: black;
  border: 1px solid lightgrey;
  background-color: white;
  font-size: 30px;
  top: -10px;
  left: -10px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;
}
.footer {
  margin-top: 10px;
  font-size: 90%;
}
    `
  ],
  template:`
    <div
      [ngStyle]="{'background-color': note.color}"
      class="note-card row shadow-1"
      (mouseenter)="toggle()"
      (mouseleave)="toggle()"
    >
      <div class="icon" *ngIf="showCheck"(click)="onChecked()">
        <i class="material-icons">check</i>
      </div>
      <div class="col-xs-12 title">
        {{note.title}}
      </div>
      <div class="col-xs-12 value">
        {{note.value}}
      </div>
      <div class="col-xs-12 footer">
        {{note.created | date:'fullDate' | uppercase}}
      </div>
    </div>
  `
})

export class NoteCard {
  @Output() checked = new EventEmitter();
  @Input('note') note = {}
  showCheck: boolean = false;

  toggle() {
    this.showCheck = !this.showCheck;
  }
  onChecked() {
    console.log('note clicked')
    this.checked.emit(this.note);
  }
}
