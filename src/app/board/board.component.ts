import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boxes: any[] = [];
  toggle?: boolean;
  winner?: string | null;
  isClicked?: boolean = false;
  filledvals?: number = 0;
  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.boxes = Array(9).fill(null);
    this.winner = null;
    this.toggle = true;
  }

  get player() {
    return this.toggle ? 'X' : 'O';
  }

  makeMove(idx: number) {
    this.isClicked = true;
    setTimeout(() => {
      this.isClicked = false;
    }, 200);
    if (!this.boxes[idx]) {
      this.boxes.splice(idx, 1, this.player);
      this.toggle = !this.toggle;
      this.filledvals = this.boxes.filter(value => value !== null).length;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.boxes[a] &&
        this.boxes[a] === this.boxes[b] &&
        this.boxes[a] === this.boxes[c]
      ) {
        this.setFilled();
        return this.boxes[a];
      }
    }
    return null;
  }
  setFilled(){
    this.filledvals = 0;
  }
}