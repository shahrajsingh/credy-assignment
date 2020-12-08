import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from './movie.model';
let BackenUrl = environment.apiUrl + 'maya/movies/';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  Movies: Movie[] = [];
  nextPage: string;
  count: number;
  is_success: boolean;
  previousPave: string;
  index: number = 1;
  MoviesUpdated = new Subject<{
    movies: Movie[];
    is_success: boolean;
    next: boolean;
    previous: boolean;
    index: number;
  }>();

  constructor(private http: HttpClient, private SnackBar: MatSnackBar) {}
  getMovies() {
    ('in movies');
    this.http
      .get<{
        count: number;
        next: string;
        previous: string;
        results: Movie[];
      }>(BackenUrl)
      .subscribe(
        (res) => {
          res;
          this.nextPage = res.next;

          this.previousPave = res.previous;

          this.Movies = res.results;
          this.count = res.count;
          this.is_success = true;
          this.MoviesUpdated.next({
            movies: [...this.Movies],
            is_success: this.is_success,
            next: this.nextPage ? true : false,
            previous: this.previousPave ? true : false,
            index: this.index,
          });
        },
        (error) => {
          this.is_success = false;
          this.SnackBar.open(error.error.error.message + ' Try Refresh', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.MoviesUpdated.next({
            movies: null,
            is_success: this.is_success,
            next: this.nextPage ? true : false,
            previous: this.previousPave ? true : false,
            index: this.index,
          });
        }
      );
  }
  getNext() {
    this.index++;
    this.previousPave = BackenUrl;
    BackenUrl = this.nextPage;
    this.getMovies();
  }
  getPrevious() {
    this.index--;
    this.nextPage = BackenUrl;
    BackenUrl = this.previousPave;
    this.getMovies();
  }
  MoviesUpdtedListener() {
    return this.MoviesUpdated.asObservable();
  }
}
