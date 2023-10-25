import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<div style="display: flex; justify-content:center; margin-top: 40px">
    <img src="" alt="">
    <iframe src="https://giphy.com/embed/SsOLnh6OTU3RR4IXuq" width="480" height="426" frameBorder="0" class="giphy-embed" allowFullScreen>
    </iframe>
  </div>`,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor() { }


}
