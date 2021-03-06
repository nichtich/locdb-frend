import { Component } from '@angular/core';
import { Citation } from './citation';

import { ToDo, ToDoParts, ToDoScans, BibliographicEntry, BibliographicResource } from './locdb';
import { LocdbService } from './locdb.service';

import { environment } from 'environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ LocdbService ]
})

/** Main App Component for whole LOCDB Frontend */
export class AppComponent {
    title = 'LOC-DB Extrapolite';
    source: BibliographicResource;
    todo: ToDoScans | BibliographicResource = null;
    entries: BibliographicEntry[];
    entry: BibliographicEntry;
    target: BibliographicResource;
    entryForSuggestion: BibliographicEntry;
    environment = environment;
    visualState = 0;

    /*
     *    updatedEntry : BibliographicEntry = {
     *      _id: this.entry._id,
     *      scanId: this.entry.scanId,
     *      status: this.entry.status,
     *      coordinates: this.entry.coordinates,
     *      marker: this.entry.marker,
     *      bibliographicEntryText: this.entry.bibliographicEntryText,
     *      title: title,
     *      date: date,
     *      authors: authors,
     *      references: references
    };
    this.entry = updatedEntry;
    */
    constructor ( private locdbService: LocdbService ) {}

    updateTodo(todo: ToDoScans | BibliographicResource) {
        this.visualState = 0;
        this.todo = todo;
    }


    updateSource (br: BibliographicResource) {
        // this.enableCitation();
        this.visualState = 2;
        console.log('Updating source', br);
        this.target = br;
    }

    updateEntry (entry: BibliographicEntry) {
        // this.showCitation()
        if (entry) {
            this.visualState = 1;
        } else {
            this.visualState = 0;
        }
        console.log('Updating with new entry', entry);
        this.entry = entry;
        // reset resource, since we selected a different entry
        this.target = null;
    }

    updateTarget (br: BibliographicResource) {
        // this.enableCitation();
        this.visualState = 2;
        console.log('Updating target', br);
        this.target = br;
    }


    /* Are the functions below used? */

    // roundUp(num, precision) {
    //     return Math.ceil(num * precision) / precision;
    // }

    // pathStart() {
    //     console.log('pathStart');
    // }

    // pathSelectResource() {
    //     console.log('pathSelectResource');
    // }

    // pathEditAndSubmit() {
    //     console.log('pathEditAndSubmit');
    // }
}

