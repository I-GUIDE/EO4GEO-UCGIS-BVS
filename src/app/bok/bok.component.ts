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
  resultsPageIndex = 0;
  resultsPageSize = 10;

  constructor(private route: ActivatedRoute) { }

  async ngAfterViewInit(): Promise<void> {

    const result = await bok.visualizeBOKData('https://ucgis-bok-default-rtdb.firebaseio.com/');
    // bok.visualizeBOKData('https://ucgis-bok-backup-default-rtdb.firebaseio.com/')
    //  bok.visualizeBOKData('https://ucgis-bok-backup-default-rtdb.firebaseio.com/', '#graph', '#textInfo')
    // bok.visualizeBOKData('#graph', 'https://ucgis-bok-default-rtdb.firebaseio.com/', '#textInfo')

    console.log(result);

    let id = this.route.snapshot.paramMap.get('conceptId');
    console.log("ID: ", id);
    if (id != null) {
      bok.browseToConcept(id);
    }

  }


  onChangeSearchText() {

    /*     this.currentConcept = '';
        this.isCopied = false;
        this.conceptBase = window.location.pathname.split('/')[1];

         */

    this.resultNodes = bok.searchInBoK(this.searchText, this.isSearchCode, this.isSearchName, this.isSearchDes, this.isSearchSkills);

    // console.log(this.resultNodes);
  }

  handlePageEvent(e: PageEvent) {
    this.resultsPageSize = e.pageSize;
    this.resultsPageIndex = e.pageIndex;
  }

  cleanSearch() {
    this.resultNodes = [];
    this.searchText = '';
    bok.searchInBoK(this.searchText, this.isSearchCode, this.isSearchName, this.isSearchDes, this.isSearchSkills);
  }

  browseToConcept(node: string) {
    bok.browseToConcept(node);
  }

}
