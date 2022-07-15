import { Component } from '@angular/core';
import { components } from './component-route.definition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentVersion = '2.0.0-alpha.11';
  components = components;
}
