import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../movies/movie.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() left: boolean;
  @Input() right: boolean;
  @Input() index: number;
  @Input() isLoading: boolean;
  @Output() changeEvent = new EventEmitter<boolean>();
  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {}
  next() {
    this.changeEvent.emit(true);
    this.moviesService.getNext();
  }
  previous() {
    this.changeEvent.emit(true);
    this.moviesService.getPrevious();
  }
}
