import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit {
  flag = true;
  searchForm!: FormGroup;

  @Input() containerRef!: HTMLElement;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();

  offcanvasOptions: NgbOffcanvasOptions = {};

  constructor(private offcanvasService: NgbOffcanvas, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  open(flag: boolean) {
    this.addNewItem(flag);

    this.flag = !flag;

    this.offcanvasOptions.container = this.containerRef;
    this.offcanvasOptions.backdrop = false;
    this.offcanvasOptions.animation = true;
    this.offcanvasOptions.panelClass = 'details-panel';

    if(!flag) {
      this.offcanvasService.dismiss('Cross click');
    }
    else if(flag) {
      const offcanvasRef = this.offcanvasService.open(SideBarComponent, this.offcanvasOptions);
    
	  	offcanvasRef.componentInstance.name = 'World';
    }
  }
  
  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  searchItem(value: string) {
    this.searchEvent.emit(value);
  }

  search() {
    this.searchForm.get('search')?.value;
    this.searchItem(this.searchForm.get('search')?.value);
  }

}
