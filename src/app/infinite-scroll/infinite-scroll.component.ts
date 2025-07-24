import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css'
})
export class InfiniteScrollComponent implements OnInit {
  
  private itemService = inject(ItemService)
  items: string[] = [];
  page = 1;
  pageSize = 10;
  isLoading = false;
  endOfData = false;
  
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    if(this.endOfData || this.isLoading) return;
    this.isLoading = true;

    this.itemService.getItems(this.page, this.pageSize).subscribe(data => {
      if(data.length === 0){
        this.endOfData = true;
      }
      else {
        this.items.push(...data);
        this.page++;
      }
      this.isLoading = false;
    })
  }


  onScroll(event: any): void{
    const target = event.target;
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 50;

    if(atBottom){
      this.loadItems();
    }
  }

}
