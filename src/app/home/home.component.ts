import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/toPromise";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private http: Http ) { }

  id: number;
  private headers = new Headers({'Content-Type': 'application/json'});
  deleteProduct = function (id){
    if(confirm("Are you sure ?")){
      const url = `${"http://localhost:5000/products"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
        .then(() => {
          this.fetchData();
        })
    }
  }

  products = [];
  fetchData = function() {
    this.http.get("http://localhost:5000/products").subscribe(
      (res: Response) => {
        this.products = res.json();
      }
    )
  }
  ngOnInit() {
    this.fetchData();
  }

}
