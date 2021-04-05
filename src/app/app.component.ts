import {Component} from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    const satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    this.sourceList  = [];
    this.displayList = [];

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        const fetchedSatellites = data.satellites;

        for (const satellite of fetchedSatellites) {
          this.sourceList.push(new Satellite(satellite.name, satellite.type,
            satellite.launchDate, satellite.orbitType, satellite.operational));
        }

        this.displayList = this.sourceList.slice(0);

      }.bind(this));
    }.bind(this));
  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();

    for (let source of this.sourceList) {
      let name = source.name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(source);
      }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }
}

