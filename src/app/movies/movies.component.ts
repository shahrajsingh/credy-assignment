import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  Movies: Movie[];
  MoviesSub: Subscription;
  isLoading;
  previous: boolean;
  next: boolean;
  is_success: boolean;
  cols: number;
  index: number = 1;
  constructor(private moviesService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.moviesService.getMovies();
    this.cols = Math.floor(window.innerWidth / 300);
    if (this.cols > 3) {
      this.cols--;
    }
    if (this.cols > 5) {
      this.cols = 5;
    } else if (this.cols == 0) {
      this.cols++;
    }

    this.MoviesSub = this.moviesService
      .MoviesUpdtedListener()
      .subscribe((result) => {
        this.Movies = result.movies;
        this.previous = result.previous;
        this.next = result.next;
        this.index = result.index;
        this.isLoading = false;
        this.is_success = result.is_success;
      });
  }
  onResize(e: Event) {
    this.cols = Math.floor(window.innerWidth / 300);
    if (this.cols > 3) {
      this.cols--;
    }
    if (this.cols > 5) {
      this.cols = 5;
    } else if (this.cols == 0) {
      this.cols++;
    }
  }
  showMore(movie: Movie) {
    this.dialog.open(MovieCardComponent, {
      width: '300px',
      data: movie,
    });
  }
  refresh() {
    this.moviesService.getMovies();
  }
  Load() {
    this.isLoading = true;
  }
  ngOnDestroy() {
    this.MoviesSub.unsubscribe();
  }
}
