import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { NgFor, NgIf } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [NgFor, NgIf, NgxSpinnerComponent],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css'
})
export class InfiniteScrollComponent implements OnInit {

  private itemService = inject(ItemService)
  private spinner = inject(NgxSpinnerService)
  items: string[] = [];
  page = 1;
  pageSize = 10;
  isLoading = false;
  endOfData = false;

  ngOnInit(): void {    
    this.loadItems();
  }

  loadItems() {
    if (this.endOfData || this.isLoading) return;
    this.spinner.show();
    this.itemService.getItems(this.page, this.pageSize).subscribe(data => {
      if (data.length === 0) {
        this.endOfData = true;
      }
      else {
        this.items.push(...data);
        this.page++;
      }
      this.spinner.hide();
    })
  }


  onScroll(event: any): void {
    const target = event.target;
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 50;

    if (atBottom) {
      this.loadItems();
    }
  }

}
