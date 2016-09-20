import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';

@Injectable()
export class NoteService {

  constructor(
    private apiService: ApiService,
    private storeHelper: StoreHelper
  ) {}

  createNote(note) {
    let path = '/notes/create';
    return this.apiService.post(path, note)
    .do(savedNote => this.storeHelper.add('notes', savedNote))
  }

  getNotes() {
    let path = '/notes/';
    return this.apiService.get(path)
    .do(res => this.storeHelper.update('notes', res.data))
  }

  completeNote(note) {
    let path = '/notes/complete';
    return this.apiService.delete(`${path}/${note._id}`)
    .do(res => this.storeHelper.findAndDelete('notes', res._id))

  }
}
