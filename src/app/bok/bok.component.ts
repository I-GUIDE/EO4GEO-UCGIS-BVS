import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import * as bok from '@ucgis/find-in-bok-dataviz';
import { MatAccordion } from '@angular/material/expansion';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

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
  isSearchKey = false;
  isSearchDes = false;
  isSearchSkills = false;
  isSearchSourceDocs = false;
  resultsPageIndex = 0;
  resultsPageSize = 10;
  isConceptInfo = false;
  currentConceptCode = '';

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private scroller: ViewportScroller) { }

  async ngAfterViewInit(): Promise<void> {

    //  const result = await bok.visualizeBOKData('https://ucgis-bok-dev-default-rtdb.firebaseio.com/', 'current');
    const result = await bok.visualizeBOKData('https://ucgis-bok-default-rtdb.firebaseio.com/', 'current');
    // bok.visualizeBOKData('https://ucgis-bok-backup-default-rtdb.firebaseio.com/')
    //  bok.visualizeBOKData('https://ucgis-bok-backup-default-rtdb.firebaseio.com/', '#graph', '#textInfo')
    // bok.visualizeBOKData('#graph', 'https://ucgis-bok-default-rtdb.firebaseio.com/', '#textInfo')

    let id = this.route.snapshot.paramMap.get('conceptId');
    bok.browseToConcept(id);

    this.router.events.subscribe(() => {
      let id = this.route.snapshot.paramMap.get('conceptId');
      bok.browseToConcept(id);
    });

  }

  searchInBoK(sText = '', isSCode = false, isSName = false, isSKey = false, isSDes = false, isSSkills = false, isSSourceDocs = false) {
    sText ? this.searchText = sText : null;
    isSCode ? this.isSearchCode = isSCode : null;
    isSName ? this.isSearchName = isSName : null;
    isSKey ? this.isSearchKey = isSKey : null;
    isSDes ? this.isSearchDes = isSDes : null;
    isSSkills ? this.isSearchSkills = isSSkills : null;
    isSSourceDocs ? this.isSearchSourceDocs = isSSourceDocs : null;
    this.resultNodes = bok.searchInBoK(this.searchText, this.isSearchCode, this.isSearchName, this.isSearchKey, this.isSearchDes, this.isSearchSkills, this.isSearchSourceDocs);
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
    bok.searchInBoK(this.searchText, this.isSearchCode, this.isSearchName, this.isSearchKey, this.isSearchDes, this.isSearchSkills, this.isSearchSourceDocs);
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
