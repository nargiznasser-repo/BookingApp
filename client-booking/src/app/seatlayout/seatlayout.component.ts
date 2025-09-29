import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { forkJoin, map, tap } from 'rxjs';


interface Seat {
  row: string;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

@Component({
  selector: 'app-seatlayout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seatlayout.component.html',
  styleUrl: './seatlayout.component.scss'
})
export class SeatlayoutComponent {
  rows = [];
  cols = 0; 
  seats = signal<Seat[][]>([]);

  constructor(private bookingService: BookingService) {
    
  }
  ngOnInit() {
    this.bookingService.getRows().subscribe((data : any) => {
      this.rows = data.rows;
      this.generateSeats();
    })

    // forkJoin({
    //   rows : this.bookingService.getRows().pipe(
    //     tap((data: any) => {console.log(data.rows)}),
    //     map((data: any) => data.rows)
    //   ),
    //   cols : new Promise<number>((resolve) => resolve(10))
    // }).subscribe((result)=>{
    //   this.cols = result.cols
    //   this.rows = result.rows
    //   console.log(this.rows, this.cols)
    // })
  }

  generateSeats() {
    const layout: Seat[][] = [];
    for (let r = 0; r < this.rows.length; r++) {
      const row: Seat[] = [];
      for (let c = 0; c < this.cols; c++) {
        row.push({
          row: this.rows[r],
          number: c,
          status: 'available'
        });
      }
      layout.push(row);
    }
    this.seats.set(layout);
  }

  toggleSeat(seat: Seat) {
    if (seat.status === 'booked') return;
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
    this.seats.update((s: any) => [...s]);
  }

  get selectedSeats() {
    return this.seats()
      .flat()
      .filter((seat: any) => seat.status === 'selected');
  }

  bookSelectedSeats() {
    const seatsToBook = this.selectedSeats;
    seatsToBook.forEach((seat: any) => (seat.status = 'booked'));
    this.seats.update((s: any) => [...s]);
  }
}
