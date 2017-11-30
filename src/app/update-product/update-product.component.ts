import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id:number;
  data:object = {};
  products = [];
  productObj:object = {};
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }
 
  updateProduct(product){
    this.productObj = {
      "name": product.name,
      "color": product.color,
      "price": product.price      
    }
    const url = `${"http://localhost:5000/products"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
        .toPromise()
        .then(()=> {
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log(error);
          this.router.navigate(['/']);
        })
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id =+params['id'];
    });
    //console.log("asss");
    this.http.get("http://localhost:5000/products/"+this.id).subscribe(
      (res:Response) => {
        console.log(res);
        this.data = res.json();
    },
    error => {
      this.router.navigate(['/']);
    })
    ;
  }

}
