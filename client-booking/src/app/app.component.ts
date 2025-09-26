import { Component, computed, effect, signal } from '@angular/core';
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
  message = signal('');
  printmessage = computed(() => `Booking says: ${this.message()}`)

  constructor(private bookingService: BookingService) { 
        effect(() => {
      console.log('printmessage changed:', this.printmessage());
    })
  }

  ngOnInit() {
    this.bookingService.getMessage().subscribe((data: any) => {
      this.message.set(data.msg)
    })


  }


}
