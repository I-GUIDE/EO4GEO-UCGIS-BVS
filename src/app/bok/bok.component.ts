import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as bok from '@eo4geo/find-in-bok-dataviz';
// const bok = require('@eo4geo/find-in-bok-dataviz');

@Component({
  selector: 'app-bok',
  templateUrl: './bok.component.html',
  styleUrls: ['./bok.component.css']
})
export class BokComponent implements AfterViewInit {
  title = 'bvs';
  searchText = '';
  resultNodes = [];
  isSearchCode = false;
  isSearchName = true;
  isSearchDes = false;
  isSearchSkills = false;
  isSearchSourceDocs = false;
  resultsPageIndex = 0;
  resultsPageSize = 10;
  isConceptInfo = false;
  currentConceptCode = '';

  constructor(private route: ActivatedRoute) { }

  async ngAfterViewInit(): Promise<void> {

    const result = await bok.visualizeBOKData('https://ucgis-bok-default-rtdb.firebaseio.com/', 'current');
    // bok.visualizeBOKData('https://ucgis-bok-backup-default-rtdb.firebaseio.com/')
    //  bok.visualizeBOKData('https://ucgis-bok-backup-default-rtdb.firebaseio.com/', '#graph', '#textInfo')
    // bok.visualizeBOKData('#graph', 'https://ucgis-bok-default-rtdb.firebaseio.com/', '#textInfo')

    let id = this.route.snapshot.paramMap.get('conceptId');
    bok.browseToConcept(id);

  }

  onChangeSearchText() {
    this.resultNodes = bok.searchInBoK(this.searchText, this.isSearchCode, this.isSearchName, this.isSearchDes, this.isSearchSkills, this.isSearchSourceDocs);
    this.isConceptInfo = false;
    this.getCurrSelCode();
  }

  handlePageEvent(e: PageEvent) {
    this.resultsPageSize = e.pageSize;
    this.resultsPageIndex = e.pageIndex;
  }

  cleanSearch() {
    this.resultNodes = [];
    this.searchText = '';
    bok.searchInBoK(this.searchText, this.isSearchCode, this.isSearchName, this.isSearchDes, this.isSearchSkills, this.isSearchSourceDocs);
  }

  browseToConcept(node: string) {
    bok.browseToConcept(node);
    this.isConceptInfo = true;
  }

  cleanConceptInfo() {
    bok.cleanTextInfo();
    bok.zoomToCode(this.currentConceptCode);
    this.isConceptInfo = false;
  }

  getCurrSelCode() {
    this.currentConceptCode = bok.getCurrSelCode();
  }

}
