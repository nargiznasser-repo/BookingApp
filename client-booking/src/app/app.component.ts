import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingService } from './services/booking.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '';

  constructor(private bookingService: BookingService) {}

 ngOnInit() {
    this.bookingService.getMessage().subscribe((data: any) => {
 this.title = data.msg;
  })
 }


}
