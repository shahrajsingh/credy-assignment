import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../movies/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  genre = [];
  maxHeight: string = '';
  background: string = 'https://ui-avatars.com/api/?size=128&&name=';
  constructor(
    public dialogRef: MatDialogRef<MovieCardComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie
  ) {}

  ngOnInit(): void {
    this.maxHeight += Math.round(window.innerHeight * 0.4);
    this.maxHeight;
    this.genre = this.movie.genres.split(',');
    const temp = this.movie.title.split(' ');
    for (let i = 0; i < temp.length; i++) {
      if (i > 1) {
        break;
      }
      this.background += temp[i].charAt(0);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
