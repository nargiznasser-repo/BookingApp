import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';


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
  cols = 10; 
  seats = signal<Seat[][]>([]);

  constructor(private bookingService: BookingService) {
    
  }
  ngOnInit() {
    this.bookingService.getRows().subscribe((data : any) => {
      this.rows = data.rows;
      this.generateSeats();
    })
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
