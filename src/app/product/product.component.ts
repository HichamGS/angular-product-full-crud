import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: Http) { }
  
  confirmationMessage:string = "New product has been added";
  isAdded:boolean = false;
  productObj:object = {};
  
  addNewProduct = function(product) {
    this.productObj = {
      "name": product.name,
      "color": product.color,
      "price": product.price      
    }
    this.http.post("http://localhost:5000/products", this.productObj).subscribe((res:Response) => {
      this.isAdded = true;
    })
  }
  ngOnInit() {
  }

}
