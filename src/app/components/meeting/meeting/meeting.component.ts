import { Component } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
})
export class MeetingComponent {
  inputTopic: string = '';
  meetings: any[] = []
  displayedColumns: string[] = ['topic', 'join'];
}
