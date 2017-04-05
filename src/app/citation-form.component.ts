import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Citation } from './citation';
import { REFERENCES } from './mock-references';

import { LocdbService } from './locdb.service';
import { BibliographicEntry, BibliographicResource } from './locdb';

@Component({
  moduleId: module.id,
  selector: 'citation-form',
  templateUrl: 'citation-form.component.html',
  providers: [ LocdbService ]
})

export class CitationFormComponent implements OnChanges {
  // @Input() references: Citation[] = REFERENCES;
  // @Input() model: Citation;

  @Input() entry: BibliographicEntry;

  internalSuggestions: BibliographicResource[];
  externalSuggestions: any[];

  reftypes = Citation.REFTYPES;

  submitted = true;
  authorCandidate = '';

  constructor (private locdbService: LocdbService) {}


  fetchInternals(be: BibliographicEntry) {
    console.log("Fetching internal suggestions for", be);
    this.locdbService.suggestions(be, true).subscribe( (sgt) => this.internalSuggestions = sgt );
  }

  // Behaviour for external bibliographic resources modal BEGIN
  selectedExternals: boolean[];

  fetchExternals(be: BibliographicEntry) {
    console.log("Fetching external suggestions for", be);
    this.locdbService.suggestions(be, true).subscribe( (sgt) => this.externalSuggestions = sgt );
  }

  pushSelectedExternals() {
    console.log('Pushing selected externals');
    return;
  }
  // Behaviour for external bibliographic resources modal END
  

  addAuthorToModel() {
    this.entry.authors.push(this.authorCandidate);
      // this.model.add_author(this.authorCandidate);
    this.authorCandidate = '';
  }


  ngOnChanges() {
    this.fetchInternals(this.entry);
    this.fetchExternals(this.entry);
    this.submitted = false;
  }

  ngOnInit() {
    // retrieve suggestions from locdb
    // (auto-select the first suggestion)
    // this.fetchInternals(this.entry);
    // this.fetchExternals(this.entry);
  }

  onSelect (resource: BibliographicResource)
  {
    if (!this.entry)
    { 
     // make sure we always have some entry to edit
     this.entry = new BibliographicResource();
    }
    if (!resource) return;
    this.entry.title = resource.title;

    let authors: string[] = []
    for (let agent of resource.contributors) {
      // if (agent.roleType === "author")
      this.entry.authors.push(agent.heldBy.nameString);
    }
    this.submitted = false;
  }

  // onSelect(reference: Citation) {
  //   if (reference == null) {
  //     this.model = new Citation(100, 'LOCDB', null, []);
  //   } else {
  //     // this.model = reference.deepcopy();
  //     this.model = reference;
  //   }
  //   this.submitted = false;
  // }

  onSubmit() {
    // this.locdbService.putBibliographicEntry(this.entry._id, this.entry);
    this.submitted = true;
  }

  removeAuthorAt(position:number) {
    this.entry.authors.splice(position, 1);
  }


  //  TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.entry); }
}
