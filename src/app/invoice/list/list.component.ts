import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {



  ngOnInit(): void {
  }
rows = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'Id', summaryFunc: () => null },
    { name: 'Invoice Number', summaryFunc: (cells:any) => this.summaryForGender(cells) },
    { name: 'Date', summaryFunc: () => null },
    { name: 'Total', summaryFunc: () => null }
  ];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch((data:any) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  fetch(cb:any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }
}
