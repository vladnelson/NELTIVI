import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowService } from '../_services/api/show.service';
import { Show, ImagesShow } from '../_models';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }

}
