import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { from } from 'rxjs';

declare var $ 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  myData: any = [] ;
  constructor(_DataService:DataService) {

    let foundData = [] ;
    foundData = _DataService.GetData()

      for (let i of foundData )
      {
        i.subscribe(data => {
        
          for (let j of data.recipes)
          {
            this.myData.push(j)
          }
        }

          )
      }

   }

  ngOnInit(): void {

    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    const textArray = [ "Soups", "tomato" , "chili" , "pizza" , "salad" , "and more ..."];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }
    
    function erase() {
      if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
      }
    }
    
    document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
      if(textArray.length) setTimeout(type, newTextDelay + 250);
    });
  }

}